import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InsuranceCardUpload from './insuranceCardUpload';
import MedicalRecordUpload from './medicalRecordUpload';

export default class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentForm: 1,
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      dateOfBirth: '',
      pastMedicalHistory: '',
      familyHistory: '',
      chiefComplain: '',
      comment: '',
      agreed: false,
      fullName: '',
      userId: 0,
      errorMessage: '',
      insuranceCardUpdate: false,
      medicalRecordUpdate: false,
      insuranceCardOriginalName: [],
      medicalRecordOriginalName: []
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.submitForm1 = this.submitForm1.bind(this);
    this.submitForm2 = this.submitForm2.bind(this);
    this.updateInsuranceCardOriginalName = this.updateInsuranceCardOriginalName.bind(this);
    this.updateMedicalRecordOriginalName = this.updateMedicalRecordOriginalName.bind(this);
  }

  onChange(event) {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? !this.state[name] : event.target.value.toLowerCase();
    this.setState({
      [name]: value
    });
  }

  submitForm1(event) {
    event.preventDefault();
    this.setState({
      currentForm: 2
    });
  }

  onClick(event) {
    const name = event.target.name;
    if (name === 'previousBtn') {
      this.setState({
        currentForm: 1
      });
    } else if (name === 'cancelBtn') {
      window.location.hash = '#welcomePage';
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

  submitForm2(event) {
    event.preventDefault();
    const userData = this.props.userData;

    const name = event.target.name;
    const patientName = this.state.firstName + ' ' + this.state.lastName;
    const { currentForm, agreed, fullName, errorMessage, insuranceCardUpdate, ...data } = this.state;
    const formData = data;
    formData.userId = userData.userId;

    if (name === 'previousBtn') {
      this.setState({
        currentForm: 1
      });
    } else if (this.state.fullName !== patientName) {
      return;
    }

    if (!insuranceCardUpdate) {
      this.setState({ errorMessage: 'Insurance card is required' });
      return;
    }

    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };

    fetch('/api/intakeForms', req)
      .then(res => res.json())
      .then(result => {
        this.props.registrationformStatus();
        this.setState({ isCompletedForm: true });
        event.target.reset();
      })
      .catch(error => {
        console.error('Error', error);
      });
    window.location.hash = '#completeIntakeForm';
  }

  render() {
    const { currentForm, firstName, lastName, address, city, state, zip, dateOfBirth, pastMedicalHistory, familyHistory, chiefComplain, comment, agreed, fullName, errorMessage, insuranceCardOriginalName, medicalRecordOriginalName } = this.state;

    if (currentForm === 1) {
      return (
        <FirstPage
          firstName={firstName}
          lastName={lastName}
          address={address}
          city={city}
          state={state}
          zip={zip}
          dateOfBirth={dateOfBirth}
          pastMedicalHistory={pastMedicalHistory}
          familyHistory={familyHistory}
          chiefComplain={chiefComplain}
          onChange={this.onChange}
          onSubmit={this.submitForm1}
          onClick={this.onClick}
        />
      );
    }
    if (currentForm === 2) {
      return (
        <SecondPage
          comment={comment}
          agreed={agreed}
          fullName = {fullName}
          onChange={this.onChange}
          onSubmit={this.submitForm2}
          onClick={this.onClick}
          firstName = {firstName}
          lastName = {lastName}
          errorMessage = {errorMessage}
          userId = {this.props.userData.userId}
          updateInsuranceCardOriginalName = {this.updateInsuranceCardOriginalName}
          updateMedicalRecordOriginalName = {this.updateMedicalRecordOriginalName}
          insuranceCardOriginalName = {insuranceCardOriginalName}
          medicalRecordOriginalName = {medicalRecordOriginalName}
        />
      );
    }

    return (
      <div>
        No form to display
      </div>
    );
  }
}

function FirstPage(props) {
  const { firstName, lastName, address, city, state, zip, dateOfBirth, pastMedicalHistory, familyHistory, chiefComplain, onChange, onSubmit, onClick } = props;

  return (
    <>
      <form className="border p-5 m-5 needs-validation" onSubmit={ onSubmit } >
        <div className="row mb-3">
          <div className="col-6">
            <div className="row mb-3">
            <label htmlFor="firstName" className="col-sm-4 col-form-label">First name</label>
            <div className="col-9">
            <input type="text" value={firstName} onChange={onChange} name="firstName" className="form-control" id="firstName" placeholder="First name" required/>
            <div className="invalid-feedback">
               Please provide your first name.
           </div>
            </div>
            </div>
          </div>
          <div className="col-6">
            <div className="row mb-3">
            <label htmlFor="lastName" className="col-sm-4 col-form-label">Last name</label>
            <div className="col-9">
            <input type="text" className="form-control" id="lastName" name="lastName" onChange={onChange} value={lastName} placeholder="Last name" required />
              <div className="invalid-feedback">
                Please provide your last name.
             </div>
            </div>
            </div>
          </div>
          </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="address" className="col col-form-label" >Address</label>
            <input type="text" className="form-control" id="address" name="address" onChange={onChange} value={address} placeholder="Street address or P.O. Box include Apt, suite, unit etc" required/>
            <div className="invalid-feedback">
              Please provide your address.
             </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="firstName" className="form-label">City</label>
            <input type="text" className="form-control" id="firstName" name="city" onChange={onChange} value={city} placeholder="City" required />
              <div className="invalid-feedback">
               Please provide a vaild city.
             </div>

          </div>
          <div className="col">
            <label htmlFor="lastName" className="form-label">State</label>
            <input type="text" className="form-control" id="lastName" name="state" onChange={onChange} value={state} placeholder="State" required />
              <div className="invalid-feedback">
               Please provide a vaild state.
             </div>

          </div>
          <div className="col">
            <label htmlFor="lastName" className="form-label">Zip</label>
            <input type="text" className="form-control" id="lastName" name="zip" onChange={onChange} value={zip} placeholder="Zip" required />
              <div className="invalid-feedback">
               Please provide a vaild zip code.
             </div>

          </div>
        </div>
      <div className="row mb-3">
        <label htmlFor="date" className="col-sm-2 col-form-label">Date of Birth</label>
        <div className="col-3">
          <input type="date" className="form-control" id="dateOfBirth" name="dateOfBirth" onChange={onChange} value={dateOfBirth} required />
              <div className="invalid-feedback">
               Please provide your date of birth.
             </div>

        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="floatingTextarea" className="form-label">Past Medical History</label>
        <textarea className="form-control" id="floatingTextarea" name="pastMedicalHistory" onChange={onChange} value={pastMedicalHistory} placeholder="Past Medical History" ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="floatingTextarea" className="form-label">Family History</label>
        <textarea className="form-control" id="floatingTextarea" name="familyHistory" onChange={onChange} value={familyHistory} placeholder="Family History" ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="floatingTextarea" className="form-label">Chief Complain</label>
        <textarea className="form-control" id="floatingTextarea" name="chiefComplain" onChange={onChange} value={chiefComplain} placeholder="Chief Complain" required ></textarea>
      </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-between">
          <button className="btn btn-primary me-md-2" type="button" name="cancelBtn" onClick={onClick}>Cancel</button>
          <button type="submit" className="btn btn-primary">Next</button>
        </div>
      </form>
    </>
  );
}

function SecondPage(props) {
  const { comment, agreed, fullName, onChange, onSubmit, onClick, firstName, lastName, errorMessage, userId, insuranceCardOriginalName, medicalRecordOriginalName } = props;
  const name = firstName + ' ' + lastName;
  let row = null;
  if (name !== fullName) {
    row = <ErrorMessage />;
  }
  const [insuranceShow, setInsuranceShow] = useState(false);
  const [medicalRecordShow, setMedicalRecordShow] = useState(false);

  const handleInsuranceClose = () => setInsuranceShow(false);
  const handleInsuranceShow = () => setInsuranceShow(true);
  const handleMedicalRecordClose = () => setMedicalRecordShow(false);
  const handleMedicalRecordShow = () => setMedicalRecordShow(true);

  return (
    <>
       <form className="border p-5 m-5" onSubmit={ onSubmit }>

          <div className="row">
            <div className="col">
              <div>
              Insurance Card
              </div>
              <button type="button" onClick={() => handleInsuranceShow(true)} name="insuranceCardBtn" className="btn btn-secondary btn-sm"> Add File</button>
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

          <div className="row">
            <div className="col">
              <div>
              Medical Record
              </div>
              <button type="button" onClick={() => handleMedicalRecordShow(true)} name="medicalRecordBtn" className="btn btn-secondary btn-sm"> Add File</button>
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

          <div className="mb-3">
            <label htmlFor="comment" className="form-label">Other comments regarding your health condition</label>
             <textarea className="form-control" id="floatingTextarea" name="comment" onChange={onChange} value={comment} placeholder="Other comments regarding your health condition" ></textarea>
          </div>
          <div className="mb-3 text-center">
            <span>“I certify under perjury the information I provided is true and correct. By checking below, I acknowledge full disclosure if my health condition.”</span>
           </div>

          <div className="mb-3 row">
             <div className="col-6">
               <label className="list-group-item">
               <input className="form-check-input me-1" type="checkbox" name = "agreed" checked={agreed} onChange={onChange} required />
               <div className="invalid-feedback">
                  You must agree before submitting.
               </div>

                I agree
               </label>
            <div className="col">
               <label htmlFor="address" className="col col-form-label" >Name</label>
               <input type="text" className="form-control" id="Name" name = "fullName" onChange={onChange} value={fullName} placeholder="Print Name" required />
                {row}
            </div>
          </div>
        </div>
         <div className="help-block mt-2 ps-5"> {errorMessage}</div>

        <div className="d-grid gap-2 d-md-flex justify-content-md-between mb-3">
            <button type="button" name="previousBtn" className="btn btn-primary" onClick={onClick}>Previous</button>
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
        </form>

      <Modal
        show={insuranceShow}
        onHide={handleInsuranceClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Insurance Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InsuranceCardUpload userId={userId} updateInsuranceCardOriginalName={props.updateInsuranceCardOriginalName} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleInsuranceClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={medicalRecordShow}
        onHide={handleMedicalRecordClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Medical Record</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MedicalRecordUpload userId={userId} updateMedicalRecordOriginalName={props.updateMedicalRecordOriginalName} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleMedicalRecordClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  );
}

function ErrorMessage(props) {
  return (
       <div className="help-block">
         *You must enter correct name.
       </div>
  );
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
