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
        <ul className="navbar-nav">
            <li className="nav-item me-5">
            <a className="nav-link active text-light" aria-current="page" href="#welcomePage">Home</a>
            </li>
            <li className="nav-item me-5">
              <a className="nav-link text-light" href="#registrationForm">Registration Form</a>
            </li>
            <li className="nav-item me-2">
              <a className="nav-link text-light" href="#signOut" onClick={() => logout()}>Sign Out</a>
            </li>
        </ul>

    );
  }
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary ps-3">
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
        <ul className="navbar-nav">
            <li className="nav-item me-5">
            <a className="nav-link active text-light" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item me-5">
              <a className="nav-link text-light" href="#appointmentTable">Appointment</a>
            </li>
            <li className="nav-item dropdown me-5">
              <a className="nav-link dropdown-toggle text-light" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">My Profile</a>
                <ul className="dropdown-menu dropdown-menu-dark bg-primary">
                 <li><a className="dropdown-item text-light" href="#myAccount">MY ACCOUNT</a></li>
                 <li><a className="dropdown-item text-light" href="#myAppointment">MY APPOINTMENT</a></li>
                 <li><a className="dropdown-item text-light" href="#myDocument">MY DOCUMENT</a></li>
                </ul>
              </li>
              <li className="nav-item me-2">
                <a className="nav-link text-light" href="#signOut" onClick={() => logout()}>Sign Out</a>
              </li>
        </ul>

      </>
  );
}

function LogedOutNav(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-primary ps-3">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsingNavbarXs">
          <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse collapse " id="collapsingNavbarXs">
        <ul className="navbar-nav">
          <li className="nav-item me-5">
            <a className="nav-link active text-light" aria-current="page" href="#">Home</a>
          </li>
          <li className="nav-item me-2">
            <a className="nav-link text-light" href="#signIn">Sign In</a>
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
