import React from 'react';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InsuranceCardUpload from './insuranceCardUpload';
import MedicalRecordUpload from './medicalRecordUpload';

export default class MyFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      insuranceShow: false,
      medicalRecordShow: false,
      insuranceCardOriginalName: [],
      medicalRecordOriginalName: []
    };
    this.handleInsuranceShow = this.handleInsuranceShow.bind(this);
    this.handleMedicalRecordShow = this.handleMedicalRecordShow.bind(this);
    this.updateInsuranceCardOriginalName = this.updateInsuranceCardOriginalName.bind(this);
    this.updateMedicalRecordOriginalName = this.updateMedicalRecordOriginalName.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    const name = event.target.name;
    if (name === 'insuranceCardBtn') {
      this.setState({
        insuranceShow: true
      });
    } else if (name === 'medicalRecordBtn') {
      this.setState({
        medicalRecordShow: true
      });
    } else if (name === 'submit') {
      window.location.hash = '#myDocument';

    }
  }

  handleInsuranceShow() {
    if (this.state.insuranceShow) {
      this.setState({ insuranceShow: false });
    } else {
      this.setState({ insuranceShow: true });
    }
  }

  handleMedicalRecordShow() {
    if (this.state.medicalRecordShow) {
      this.setState({ medicalRecordShow: false });
    } else {
      this.setState({ medicalRecordShow: true });
    }
  }

  updateInsuranceCardOriginalName(fileName) {
    const { insuranceCardOriginalName } = this.state;
    insuranceCardOriginalName.push(fileName);
    this.setState({ insuranceCardOriginalName, insuranceCardUpdate: true });
  }

  updateMedicalRecordOriginalName(fileName) {
    const { medicalRecordOriginalName } = this.state;
    medicalRecordOriginalName.push(fileName);
    this.setState({ medicalRecordOriginalName, medicalRecordUpdate: true });
  }

  render() {
    const userId = this.state.userData.userId;
    const insuranceCardOriginalName = this.state.insuranceCardOriginalName;
    const medicalRecordOriginalName = this.state.medicalRecordOriginalName;
    const insuranceShow = this.state.insuranceShow;
    const medicalRecordShow = this.state.medicalRecordShow;
    return (
    <>
      <div className="d-flex justify-content-center text-center">
        <Table borderless>
          <tbody>
            <tr>
              <td><a href={'#myRegistrationForm'} >My Registration Form</a></td>
              <td><a href={'#myfiles'}>My Medical Records</a></td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div className="d-flex flex-column align-items-center">

        <div className='text-center p-5'>
          <h1>Upload New Medical Record</h1>
        </div>

        <div className="container">

          <div className="row text-center p-5">
            <div className="col">
              <div className="d-flex justify-content-around mb-3">

                 <div>Insurance Card</div>
                 <button type="button" onClick={this.handleInsuranceShow} name="insuranceCardBtn" className="btn btn-secondary btn-sm"> Add File</button>
              </div>
              <table className="table">
                <thead className="table-Secondary">
                <tr>
                  <th scope="col">
                    File Name
                  </th>
                  <th scope="col">
                    Delete
                  </th>
                </tr>
                </thead>
              <tbody>
                 { <InsuranceCardTableRow insuranceCardOriginalName={insuranceCardOriginalName} />}
              </tbody>
            </table>
           </div>
        </div>

          <div className="row text-center p-5">
            <div className="col">

              <div className="d-flex justify-content-around mb-3">
                  <div>Medical Record</div>
                  <button type="button" onClick={this.handleMedicalRecordShow} name="medicalRecordBtn" className="btn btn-secondary btn-sm"> Add File</button>
              </div>

              <table className="table">
                <thead className="table-Secondary">
                <tr>
                  <th scope="col">
                    File Name
                  </th>
                  <th scope="col">
                    Delete
                  </th>
                </tr>
                </thead>
              <tbody>
                 { <MedicalRecordTableRow medicalRecordOriginalName={medicalRecordOriginalName} />}
              </tbody>
            </table>
           </div>

        </div>
        </div>
      </div>
        <div className="d-flex justify-content-center">
            <button type="button" onClick={this.onClick} name="submit" className="btn btn-primary">Submit</button>
        </div>

        <Modal
          show={insuranceShow}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Insurance Card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InsuranceCardUpload userId={userId} updateInsuranceCardOriginalName={this.updateInsuranceCardOriginalName} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleInsuranceShow}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={medicalRecordShow}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>Medical Record</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MedicalRecordUpload userId={userId} updateMedicalRecordOriginalName={this.updateMedicalRecordOriginalName} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleMedicalRecordShow}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

    </>
    );
  }
}

function InsuranceCardTableRow(props) {
  const { insuranceCardOriginalName } = props;
  return insuranceCardOriginalName.map((name, index) => {
    return (
      <SingleRow key={index} name={name} />
    );
  });
}

function MedicalRecordTableRow(props) {
  const { medicalRecordOriginalName } = props;
  return medicalRecordOriginalName.map((name, index) => {
    return (
      <SingleRow key={index} name={name} />
    );
  });
}

function SingleRow(props) {
  return (
     <tr>
       <td>{props.name}</td>
       <td>
        <i className="fas fa-times"></i>
       </td>
     </tr>
  );

}
