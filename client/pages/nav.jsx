import React from 'react';

export default function Nav(props) {
  const isLogedIn = props.isLogedIn;
  const finishedRegistrationForm = props.finishedRegistrationForm;

  if (!isLogedIn) {
    return <LogedOutNav />;
  }
  return <LogedInNav finishedRegistrationForm={finishedRegistrationForm}/>;
}

function LogedInNav(props) {
  const finishedRegistrationForm = props.finishedRegistrationForm;
  let menu = '';
  if (finishedRegistrationForm) {
    menu = <RegisteredNavMenu />;
  } else {
    menu = (
       <li className="nav-item me-5">
         <a className="nav-link text-danger" href="#welcomePage">Registration Form</a>
       </li>

    );
  }
  return (
    <nav className="navbar navbar-expand-sm navbar-light me-5 ms-1">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img className="logo" src="images/logo.png" alt="logo"></img>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="nav justify-content-md-center">
            <li className="nav-item me-5">
            <a className="nav-link active text-danger" aria-current="page" href="#">Home</a>
            </li>
            {menu}
          <li className="nav-item me-2">
            <a className="nav-link text-danger" href="#signOut" onClick={() => logout()}>Sign Out</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function RegisteredNavMenu(props) {
  return (
    <>
        <li className="nav-item me-5">
          <a className="nav-link text-danger" href="#appointmentTable">Appointment</a>
        </li>
        <li className="nav-item dropdown me-5">
          <a className="nav-link dropdown-toggle text-danger" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">My Profile</a>
            <ul className="dropdown-menu ">
             <li><a className="dropdown-item text-danger" href="#myAccount">MY ACCOUNT</a></li>
             <li><a className="dropdown-item text-danger" href="#myAppointment">MY APPOINTMENT</a></li>
             <li><a className="dropdown-item text-danger" href="#myDocument">MY DOCUMENT</a></li>
             <li><a className="dropdown-item text-danger" href="#">MY PAYMENT</a></li>
            </ul>
          </li>
      </>
  );
}

function LogedOutNav(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-light me-5 ms-1">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img className="logo" src="images/logo.png" alt="logo"></img>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="nav justify-content-md-center">
          <li className="nav-item me-2">
            <a className="nav-link text-danger" href="#signIn">Sign In</a>
              </li>
        </ul>
      </div>
    </nav>
  );
}

function logout() {
  localStorage.clear();
  window.location.href = '/';
}
