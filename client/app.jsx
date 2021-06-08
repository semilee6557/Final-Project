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
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      isLogedIn: false,
      finishedRegistrationForm: false,
      userData: null
    };
    this.userInfo = this.userInfo.bind(this);
    this.registrationformStatus = this.registrationformStatus.bind(this);
  }

  userInfo(userData) {
    this.setState({ userData, isLogedIn: true });
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
  }

  render() {
    return (
    <>
     <Nav isLogedIn={this.state.isLogedIn} finishedRegistrationForm ={this.state.finishedRegistrationForm}/>
     <div className="container mt-5">
       <div className="row justify-content-md-center">
        { this.renderPage() }
       </div>
     </div>
    </>
    );
  }
}
