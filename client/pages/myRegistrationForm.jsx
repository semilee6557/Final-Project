import React from 'react';
import Table from 'react-bootstrap/Table';

export default class MyRegistrationForm extends React.Component {
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
    let address = result[0].address + ', ' + result[0].city + ', ' + result[0].state + ' ' + result[0].zip;
    address = address.toUpperCase();
    let pastMedicalHistory = result[0].pastMedicalHistory;
    if (!pastMedicalHistory) {
      pastMedicalHistory = 'None';
    } else {
      pastMedicalHistory = pastMedicalHistory.toUpperCase();
    }
    let familyHistory = result[0].familyHistory;
    if (!familyHistory) {
      familyHistory = 'None';
    } else {
      familyHistory = familyHistory.toUpperCase();
    }
    let chiefComplain = result[0].chiefComplain;
    if (!chiefComplain) {
      chiefComplain = 'None';
    } else {
      chiefComplain = chiefComplain.toUpperCase();
    }
    const table =
      <>
            <tr>
              <td>Name</td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{address}</td>
            </tr>
            <tr>
              <td>Date of Birth</td>
              <td>{result[0].dateOfBirth}</td>
            </tr>
            <tr>
              <td>Past Medical History</td>
              <td>{pastMedicalHistory}</td>
            </tr>
            <tr>
              <td>Family History</td>
              <td>{familyHistory}</td>
            </tr>
            <tr>
              <td>Chief Complain</td>
              <td>{chiefComplain}</td>
            </tr>
      </>;

    this.setState({ table });
  }

  render() {
    const table = this.state.table;
    return (
    <>
      <div className="d-flex justify-content-center text-center">
        <Table borderless>
          <tbody>
            <tr>
              <td><a href={'#myRegistrationForm'} >My Registration Form</a></td>
              <td><a href={'#myfiles'}>Upload New Medical Record</a></td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div className="d-flex flex-column align-items-center">
        <div className='text-center p-5'>
          <h1>My Registration Form</h1>
        </div>
        <div className='p-5'>
          <Table borderless>
            <tbody>
              {table}
            </tbody>
          </Table>
        </div>
    </div>
    </>
    );
  }
}
