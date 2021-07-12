import React from 'react';

export default function WelcomePage(props) {
  return (
      <>
      <div className="mt-5 d-flex flex-column align-items-center">
      <div className='text-center p-5'>
          <h1>Welcome</h1>
          <h1>Please fill out registration form to finish your registration.</h1>
        </div>
        <button type="button" className="btn btn-lg btn-danger"><a className="homeBtn" href='#registrationForm' > REGISTRATION FORM</a></button>
</div>
      </>
  );
}
