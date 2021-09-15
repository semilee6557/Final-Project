import React from 'react';
import Table from 'react-bootstrap/Table';

export default class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      result: null,
      table: null
    };
    this.data = this.data.bind(this);
    this.createTable = this.createTable.bind(this);
  }

  data(userId) {
    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    };

    fetch('/api/myDoc/registrationFrom', req)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(result => {
        this.setState({ result });
        this.createTable();
      }
      )
      .catch(err => {
        console.error(err);
      });

  }

  componentDidMount() {
    const userId = this.state.userData.userId;
    this.data(userId);
  }

  createTable() {

    const result = this.state.result;
    let name = result[0].firstName + ' ' + result[0].lastName;
    name = name.toUpperCase();
    const table =
      <>
        <Table borderless>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>Date of Birth</td>
              <td>{result[0].dateOfBirth}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{this.state.userData.email}</td>
            </tr>
            <tr>
              <td>Password</td>
              <td><a href={'#changePw'} className="changePw">CHANGE MY PASSWORD</a></td>
            </tr>
          </tbody>
        </Table>
      </>;

    this.setState({ table });
  }

  render() {
    const table = this.state.table;
    return (
    <>
      <div className="d-flex flex-column align-items-center">
        <div className='text-center p-5'>
          <h1>My Account</h1>
        </div>
        {table}
      </div>
    </>
    );
  }
}
