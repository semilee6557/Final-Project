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
        <ul className="navbar-nav justify-content-md-center">
            <li className="nav-item me-5">
            <a className="nav-link active text-danger" aria-current="page" href="#welcomePage">Home</a>
            </li>
            <li className="nav-item me-5">
              <a className="nav-link text-danger" href="#registrationForm">Registration Form</a>
            </li>
            <li className="nav-item me-2">
              <a className="nav-link text-danger" href="#signOut" onClick={() => logout()}>Sign Out</a>
            </li>
        </ul>

    );
  }
  return (
    <nav className="navbar navbar-expand-sm navbar-light me-5 ms-1">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsingNavbarXs">
          <span className="navbar-toggler-icon"></span>
        </button>
      <div className="navbar-collapse collapse" id="collapsingNavbarXs">
            {menu}
      </div>
    </nav>
  );
}

function RegisteredNavMenu(props) {
  return (
    <>
        <ul className="navbar-nav justify-content-md-center">
            <li className="nav-item me-5">
            <a className="nav-link active text-danger" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item me-5">
              <a className="nav-link text-danger" href="#appointmentTable">Appointment</a>
            </li>
            <li className="nav-item dropdown me-5">
              <a className="nav-link dropdown-toggle text-danger" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">My Profile</a>
                <ul className="dropdown-menu ">
                 <li><a className="dropdown-item text-danger" href="#myAccount">MY ACCOUNT</a></li>
                 <li><a className="dropdown-item text-danger" href="#myAppointment">MY APPOINTMENT</a></li>
                 <li><a className="dropdown-item text-danger" href="#myDocument">MY DOCUMENT</a></li>
                </ul>
              </li>
              <li className="nav-item me-2">
                <a className="nav-link text-danger" href="#signOut" onClick={() => logout()}>Sign Out</a>
              </li>
        </ul>

      </>
  );
}

function LogedOutNav(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-light me-5 ms-1">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsingNavbarXs">
          <span className="navbar-toggler-icon"></span>
        </button>
      <div className="navbar-collapse collapse" id="collapsingNavbarXs">
        <ul className="navbar-nav justify-content-md-center">
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
