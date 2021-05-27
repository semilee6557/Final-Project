require('dotenv/config');
const pg = require('pg');
const argon2 = require('argon2'); // eslint-disable-line
const express = require('express');
const jwt = require('jsonwebtoken'); // eslint-disable-line
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');

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
    select "userId",
           "hashedPassword"
      from "users"
     where "email" = $1
  `;

  db.query(sql, [email])
    .then(result => {
      const user = result.rows[0];
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, email };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);

          const obj = {
            user: payload,
            token: token
          };
          res.status(201).json(obj);
        })
        .catch(err => next(err));
    })
    .catch(err => next(err));

});

app.post('/api/intakeForms', (req, res, next) => {
  const {
    userId,
    firstName,
    lastName,
    address,
    city,
    state,
    zip,
    dateOfBirth,
    pastMedicalHistory,
    familyHistory,
    chiefComplain,
    comment
  } = req.body;

  const sql = `
        insert into "intakeForm" ("userId", "firstName", "lastName", "address", "city", "state", "zip", "dateOfBirth", "pastMedicalHistory", "familyHistory", "chiefComplain", "comment")
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        returning *;
  `;
  const params = [
    userId,
    firstName,
    lastName,
    address,
    city,
    state,
    zip,
    dateOfBirth,
    pastMedicalHistory,
    familyHistory,
    chiefComplain,
    comment
  ];

  db.query(sql, params)
    .then(result => {
      const [obj] = result.rows;
      res.status(201).json(obj);
    })
    .catch(err => next(err));
});

app.post('/api/uploads/insuranceCard', uploadsMiddleware, (req, res, next) => {
  const { userId } = req.body;
  const url = `/images/insurance/ ${req.file.filename}`;
  const originalName = req.file.originalname;
  const sql = `
    insert into "insurunceCard" ("url", "originalName", "userId")
    values ($1, $2, $3)
    returning *;
  `;
  const params = [url, originalName, userId];
  db.query(sql, params)
    .then(result => {
      const [data] = result.rows;
      if (!data) {
        throw new ClientError(401, 'data is missing');
      }
      res.json(data);
    })
    .catch(err => next(err));
});

app.get('/api/images/insurance', (req, res, next) => {
  const sql = `
    select *
      from "insurunceCard"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/uploads/medicalRecord', uploadsMiddleware, (req, res, next) => {
  const { userId } = req.body;
  const url = `/images/medicalRecord/ ${req.file.filename}`;
  const originalName = req.file.originalname;
  const sql = `
    insert into "medicalRecord" ("url", "originalName", "userId")
    values ($1, $2, $3)
    returning *;
  `;
  const params = [url, originalName, userId];
  db.query(sql, params)
    .then(result => {
      const [data] = result.rows;
      if (!data) {
        throw new ClientError(401, 'data is missing');
      }
      res.json(data);
    })
    .catch(err => next(err));
});

app.get('/api/images/medicalRecord', (req, res, next) => {
  const sql = `
    select *
      from "medicalRecord"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
