import React from 'react';
import Home from './pages/home';
import Nav from './pages/nav';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import WelcomePage from './pages/welcomePage';
import RegistrationForm from './pages/registrationForm';
import CompleteIntakeForm from './pages/completeIntakeForm';
import MyAccount from './pages/myAccount';
import ChangePw from './pages/changePw';
import AppointmentTable from './pages/appointmentTable';
import MyAppointment from './pages/myAppointment';
import MyRegistrationForm from './pages/myRegistrationForm';
import MyDocument from './pages/myDocument';
import Myfiles from './pages/myfiles';
import SignUpSuccess from './pages/signUpSuccess';
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      isLogedIn: false,
      finishedRegistrationForm: false,
      userData: null,
      demoInfo: { email: 'demouser@gmail.com', password: 'Demo1234!!!' }
    };
    this.userInfo = this.userInfo.bind(this);
    this.registrationformStatus = this.registrationformStatus.bind(this);
  }

  userInfo(userData, callback = null) {
    const newState = { userData, isLogedIn: true };

    if (typeof callback === 'function') {
      // If you pass setState a 2nd argument that is a function it will
      // call that function after state has updated. So in sign in we can pass
      // in registrationFormStatus and it won't get called until state has finished updating
      return this.setState(newState, callback);
    }

    this.setState(newState);
  }

  registrationformStatus() {
    const userId = this.state.userData.userId;
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: userId })
    };
    fetch('/api/intakeForm/search', req)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(result => {
        if (result) {
          this.setState({ finishedRegistrationForm: true });
          window.location.hash = '#';
        } else {
          window.location.hash = '#welcomePage';

        }

      })
      .catch(err => {
        console.error(err);
      });

  }

  componentDidMount() {
    window.addEventListener('hashchange', () =>
      this.setState({ route: parseRoute(window.location.hash) })
    , false);
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home isLogedIn={this.state.isLogedIn} finishedRegistrationForm ={this.state.finishedRegistrationForm}/>;
    }
    if (route.path === 'signIn') {
      return <SignIn userInfo={this.userInfo} registrationformStatus={this.registrationformStatus} finishedRegistrationForm={this.finishedRegistrationForm} />;
    }
    if (route.path === 'signInDemo') {
      return <SignIn userInfo={this.userInfo} registrationformStatus={this.registrationformStatus} finishedRegistrationForm={this.finishedRegistrationForm} demoInfo={this.state.demoInfo} />;
    }
    if (route.path === 'signUp') {
      return <SignUp />;
    }
    if (route.path === 'welcomePage') {
      return <WelcomePage />;
    }
    if (route.path === 'registrationForm') {
      return <RegistrationForm registrationformStatus={this.registrationformStatus} userData={this.state.userData} />;
    }
    if (route.path === 'completeIntakeForm') {
      return <CompleteIntakeForm />;
    }
    if (route.path === 'myAccount') {
      return <MyAccount userData={this.state.userData} />;
    }
    if (route.path === 'changePw') {
      return <ChangePw userData={this.state.userData} />;
    }
    if (route.path === 'appointmentTable') {
      return <AppointmentTable userData={this.state.userData} />;
    }
    if (route.path === 'myAppointment') {
      return <MyAppointment userData={this.state.userData} />;
    }
    if (route.path === 'myDocument') {
      return <MyDocument />;
    }
    if (route.path === 'myRegistrationForm') {
      return <MyRegistrationForm userData={this.state.userData} />;
    }
    if (route.path === 'myfiles') {
      return <Myfiles userData={this.state.userData} />;
    }
    if (route.path === 'signUpSuccess') {
      return <SignUpSuccess />;
    }
  }

  render() {
    return (
    <>
     <Nav isLogedIn={this.state.isLogedIn} finishedRegistrationForm ={this.state.finishedRegistrationForm}/>
     <div className="container container-md-fluid mt-3 mt-md-5">
       <div className="row justify-content-center">
        { this.renderPage() }
       </div>
     </div>
    </>
    );
  }
}
