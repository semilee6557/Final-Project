import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default class ChangePw extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      current: '',
      password: '',
      confirmPassword: '',
      regexMessage: '',
      message: '',
      errorMessage: '',
      result: false,
      visible: false,
      idModalOpen: false

    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.closeModal = this.closeModal.bind(this);

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
    if (!this.state.current) {
      message = 'Current password is required';
      this.setState({ message: message });
    } else if (this.state.password === this.state.current) {
      message = 'New password is same as current password.';
      this.setState({ message: message });
    } else if (!this.state.password && !this.state.regexMessage) {
      message = 'A password is reqired.';
      this.setState({ message: message });

    } else if (!this.state.password) {
      message = this.state.regexMessage;
      this.setState({ message: message });

    } else if (this.state.password.length < 7) {
      message = 'Your password is too short.';
      this.setState({ message: message });

    } else if (this.state.password !== this.state.confirmPassword) {
      message = 'Your password is not matching. Try again.';
      this.setState({ message: message });

    } else {
      this.updatePassword();
    }
    // window.location.hash = '';

  }

  updatePassword() {
    let message = '';

    const currentData = {
      email: this.state.userData.email,
      password: this.state.current
    };

    const newData = {
      email: this.state.userData.email,
      password: this.state.password
    };

    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentData)
    };

    fetch('/api/auth/sign-in', req)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          message = 'Your current password is not correct.';
          this.setState({ message: message });
        }

      })
      .then(result => {

        fetch('/api/user/pw', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newData)
        })
          .then(response => {
            this.setState({ result: true });
            this.setState({ visible: true });
          })
          .catch(error => {
            console.error('Error', error);
          });
      })
      .catch(err => {
        console.error(err);
      });
  }

  closeModal(target) {
    window.location.hash = '';

  }

  render() {

    const value = this.state;
    const message = this.state.message;
    const errorMessage = this.state.errorMessage;
    return (
    <>
      <form className="container border p-5" onSubmit={this.handleSubmit}>
        <h4 className="text-center mb-5">Change Password</h4>
        <div className="row mb-3">
          <label htmlFor="current" className="col-md-4 col-form-label">Current Password</label>
          <div className="col-md">
            <input type="password" name="current" value={value.current} placeholder="Current Password" className="form-control" id="inputEmail3" onChange={this.handleChange}></input>
          </div>
        </div>
        <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-md-4 col-form-label">New Password</label>
            <div className="col-md">
              <input type="password" name="password" value={value.password} placeholder="Password" className="form-control" id="inputPassword3" onChange={this.handleChange}></input>
            </div>
            <p className="help-block mt-2">* Password should be at least 8 characters include a number, a lowercase, a uppercase, a special characters</p>
        </div>
        <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-md-4 col-form-label">Confirm Password</label>
            <div className="col-md">
              <input type="password" name="confirmPassword" value={value.confirmPassword} placeholder="Confirm Password" className="form-control" id="inputPassword3" onChange={this.handleChange}></input>
            </div>
        </div>
        <div className="row justify-content-center mt-5">
          <button type="submit" className="btn btn-primary col-md-4">Submit</button>
          <div className="help-block mt-2"> {message}</div>
          <div className="help-block mt-2"> {errorMessage}</div>
        </div>
      </form>

      <Modal show={this.state.result} target="alert">
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <div className="row align-items-center">
              <p className="row justify-content-center text-center">Password is changed!</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.closeModal()}>
             Close
          </Button>
        </Modal.Footer>
      </Modal>

</>
    );
  }
}
