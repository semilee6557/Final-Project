import React from 'react';

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

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
      .then(res => res.json())
      .then(result => {
        this.props.userInfo(result.user);
        event.target.reset();
      })
      .catch(err => console.error(err));
    window.location.hash = '#welcomePage';

  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  render() {
    const value = this.state;

    return (
    <>
      <form className="container border p-5" onSubmit={this.handleSubmit}>
        <h4 className="text-center mb-5">Sign In</h4>
        <div className="row mb-3">
          <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-10">
            <input type="email" className="form-control" id="inputEmail3" name="email" value={value.email} placeholder="Email" onChange={this.handleChange}></input>
          </div>
          </div>
        <div className="row mb-3">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
            <div className="col-sm-10">
              <input type="password" className="form-control" id="inputPassword3" name="password" value={value.password} placeholder="Password" onChange={this.handleChange}></input>
          </div>
            </div>
        <div className="row mb-3">
          <a href="#">forget ID or PW?</a>
        </div>
        <div className="row">
        <button type="submit" className="btn btn-primary col-3 offset-5">Sign In</button>
        </div>
                <div className="row mb-3">
          <a href="#" className="col-4 offset-5">Create new account</a>
        </div>

      </form>
    </>
    );
  }
}
