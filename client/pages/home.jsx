import React from 'react';

export default function Home(props) {
  const isLogedIn = props.isLogedIn;
  const finishedRegistrationForm = props.finishedRegistrationForm;
  if (!isLogedIn) {
    return <LogedOutHome />;
  } else if (isLogedIn && !finishedRegistrationForm) {
    window.location.hash = '#welcomePage';
  } else {
    return <LogedInHome />;
  }
}

function LogedOutHome(props) {
  return (
      <>
      <div className="mt-5 d-flex flex-column align-items-center">
      <div className='text-center p-5'>
          <h1>Manage your wellness</h1>
          <h1>Sign up for appointment</h1>
        </div>
        <a href={'#signUp'} type="button" className="btn btn-danger">SIGN UP</a>
</div>
      </>
  );
}
function LogedInHome(props) {
  return (
      <>
        <div>
          <h1>Manage your wellness</h1>
        </div>
      <button href={'#appointment'} type="button" className="btn btn-lg btn-danger">MAKE APPOINTMENT</button>
      </>
  );
}
