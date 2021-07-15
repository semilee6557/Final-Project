import React from 'react';

export default function SignUpSuccess(props) {
  return (
      <>
     <div className="mt-5 d-flex flex-column align-items-center">
        <div className='text-center p-5'>
          <h1>Welcome!</h1>
          <h1>Please click sign in button to first login!</h1>
        </div>
        <a href='#signIn' type="button" className="btn btn-danger homeBtn">Sign In</a>
      </div>
      </>
  );
}
