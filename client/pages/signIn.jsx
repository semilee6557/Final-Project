import React from 'react';

export default function SignIn(props) {
  return (
    <>
          <form className="container border p-5">
        <h4 className="text-center mb-5">Sign In</h4>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="inputEmail3"></input>
          </div>
          </div>
        <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="inputPassword3"></input>
          </div>
            </div>
        <div className="row mb-3">
          <a href="#">forget ID or PW?</a>
        </div>
        <div className="row">
        <button type="submit" className="btn btn-primary col-3 offset-5">Sign In</button>
        </div>
                <div className="row mb-3">
          <a href="#" className="col-4 offset-5">Create new account</a>
        </div>

      </form>
    </>
  );
}
