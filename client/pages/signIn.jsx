import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import EmailSearch from './email-search';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      visible: false,
      idModalOpen: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = this.state;
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch('/api/auth/sign-in', req)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          this.openModal('error');
        }

      })
      .then(result => {
        this.props.userInfo(result.user);
        this.props.registrationformStatus();
        event.target.reset();
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  openModal(target) {
    if (target === 'error') {
      this.setState({
        visible: true
      });
    } else if (target === 'id') {
      this.setState({
        idModalOpen: true
      });
    }
  }

  closeModal(target) {
    if (target === 'error') {
      this.setState({
        visible: false
      });
    } else if (target === 'id') {
      this.setState({
        idModalOpen: false
      });
    }
  }

  componentDidMount() {
    if (this.props.demoInfo) {
      this.setState({
        email: this.props.demoInfo.email,
        password: this.props.demoInfo.password
      });
    }

  }

  render() {
    const value = this.state;
    return (
          <>
       <form className="container border p-5" onSubmit={this.handleSubmit}>
        <h4 className="text-center mb-5">Sign In</h4>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-md-3 col-form-label">Email</label>
          <div className="col-md">
            <input type="email" className="form-control" id="inputEmail3" name="email" value={value.email} placeholder="Email" onChange={this.handleChange}></input>
          </div>
          </div>
        <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-md-3 col-form-label">Password</label>
            <div className="col-md">
              <input type="password" className="form-control" id="inputPassword3" name="password" value={value.password} placeholder="Password" onChange={this.handleChange}></input>
          </div>
            </div>
        <div className="row mb-3">
          <p className="help-block" onClick={() => this.openModal('id')}>forgot your email?</p>
        </div>
        <div className="row justify-content-center">
          <button type="submit" className="btn btn-primary col-md-4">Sign In</button>
          <a href="#signUp" className="text-center">Create new account</a>
        </div>
        {/* <div className="row mb-3">
        </div> */}

      </form>
      <Modal show={this.state.visible} target = "error">
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <div className="row align-items-center">
              <p className="row justify-content-center text-center">Email and passwod is not matching Please try again</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.closeModal('error')}>
             Close
          </Button>
        </Modal.Footer>
      </Modal>

      <EmailSearch idModalOpen={this.state.idModalOpen} closeModal={this.closeModal} target = "id" openModal={this.openModal} />
      </>
    );
  }
}
