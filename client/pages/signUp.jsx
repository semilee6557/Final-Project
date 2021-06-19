import React from 'react';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dob: null,
      email: '',
      password: '',
      confirmPassword: '',
      regexMessage: '',
      message: '',
      errorMessage: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.name === 'name' ? event.target.value.toLowerCase() : event.target.value;

    this.setState({
      [name]: value
    });
    const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-zA-Z]).+$/gm;
    const result = this.state.password.match(regex);
    if (!result) {
      this.setState({ regexMessage: 'Password require to include a digit, a capital letter and a special caracter.' });
    } else {
      this.setState({ regexMessage: '' });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    let message = '';
    if (!this.state.name) {
      message = 'Name is reqired.';
      this.setState({ message: message });
      return;
    } else if (!this.state.dob) {
      message = 'Date of birth is required';
      this.setState({ message: message });
      return;
    } else if (!this.state.password && !this.state.regexMessage) {
      message = 'A password is reqired.';
      this.setState({ message: message });
      return;
    } else if (!this.state.password) {
      message = this.state.regexMessage;
      this.setState({ message: message });
      return;
    } else if (this.state.password.length < 7) {
      message = 'Your password is too short.';
      this.setState({ message: message });
      return;
    } else if (this.state.password !== this.state.confirmPassword) {
      message = 'Your password is not matching. Try again.';
      this.setState({ message: message });
      return;
    } else {
      const newAccount = {
        name: this.state.name,
        dob: this.state.dob,
        email: this.state.email,
        password: this.state.password
      };
      this.createAccount(newAccount);
      this.setState({ name: '', dob: null, email: '', password: '', confirmPassword: '', message: '' });
    }
    window.location.hash = '#signIn';

  }

  createAccount(newAccount) {
    fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newAccount)
    })
      .then(response => {
        if (!response.ok) {
          this.setState({ errorMessage: 'Email is already registered. Please log-in.' });
        } else {
          this.setState({ errorMessage: '' });
          response.json();
        }
      })
      .catch(error => {
        console.error('Error', error);
      });
  }

  render() {
    const value = this.state;
    const message = this.state.message;
    const errorMessage = this.state.errorMessage;

    return (
      <>
      <form className="container border p-5" onSubmit={this.handleSubmit}>
        <h4 className="text-center mb-5">Sign Up</h4>
        <div className="row mb-3">
          <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
          <div className="col-sm-10">
            <input type="name" name="name" value={value.name} placeholder="Name" className="form-control" id="inputEmail3" onChange={this.handleChange}></input>
          </div>
          </div>
        <div className="row mb-3">
          <label htmlFor="dob" className="col-sm-2 col-form-label">Date of Birth</label>
          <div className="col-sm-10">
            <input type="date" name="dob" value={value.dob} placeholder="Date of Birth" className="form-control" id="inputEmail3" onChange={this.handleChange}></input>
          </div>
          </div>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="email" name="email" value={value.email} placeholder="Email" className="form-control" id="inputEmail3" onChange={this.handleChange}></input>
          </div>
          </div>
        <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input type="password" name="password" value={value.password} placeholder="Password" className="form-control" id="inputPassword3" onChange={this.handleChange}></input>
          </div>
            <p className="help-block mt-2 ps-5">* Password should be at least 8 characters include a number, a lowercase, a uppercase, a special characters</p>
            </div>
        <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Confirm Password</label>
            <div className="col-sm-10">
              <input type="password" name="confirmPassword" value={value.confirmPassword} placeholder="Confirm Password" className="form-control" id="inputPassword3" onChange={this.handleChange}></input>
          </div>
            </div>
        <div className="row">
        <button type="submit" className="btn btn-primary col-2 offset-5">Submit</button>
        <div className="help-block mt-2 ps-5"> {message}</div>
        <div className="help-block mt-2 ps-5"> {errorMessage}</div>
        </div>
      </form>
    </>
    );
  }
}
