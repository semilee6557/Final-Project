require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2'); // eslint-disable-line
const express = require('express');
const jwt = require('jsonwebtoken'); // eslint-disable-line
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');

const db = new pg.Pool({ // eslint-disable-line
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.use(staticMiddleware);

app.post('/api/auth/sign-up', (req, res, next) => {
  const {
    email,
    password
  } = req.body;
  if (!email || !password) {
    throw new ClientError(400, 'Email and password are required fields.');
  }

  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("email", "hashedPassword")
        values ($1, $2)
        returning "userId", "email", "createdAt"
      `;
      const params = [email, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(401, 'invalid login');
  }

  const sql = `
    select *
    from "users"
    where "email" = $1
  `;
  db.query(sql, [email])
    .then(result => {
      const user = result.rows[0];
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      argon2
        .verify(user.hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = {
            userId: result.userId,
            email: result.email
          };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);

          const obj = {
            user: payload,
            token: token
          };
          res.status(201).json(obj);
        })
        .catch(err => next(err));
    });

});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
