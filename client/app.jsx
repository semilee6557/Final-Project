import React from 'react';
import Home from './pages/home';
import Nav from './pages/nav';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import WelcomePage from './pages/welcomePage';
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      isLogedIn: false
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () =>
      this.setState({ route: parseRoute(window.location.hash) })
    , false);
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home isLogedIn={this.state.isLogedIn}/>;
    }
    if (route.path === 'signIn') {
      return <SignIn />;
    }
    if (route.path === 'signUp') {
      return <SignUp />;
    }
    if (route.path === 'welcomePage') {
      return <WelcomePage />;
    }
  }

  render() {
    return (
    <>
     <Nav />
     <div className="container mt-5">
       <div className="row justify-content-md-center">
        { this.renderPage() }
       </div>
     </div>
    </>
    );
  }
}
