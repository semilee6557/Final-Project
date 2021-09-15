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
      medicalRecordOriginalName: [],
      result: false
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
    const value = event.target.type === 'checkbox' ? !this.state[name] : event.target.value;
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
        this.setState({ result: true });
        event.target.reset();
      })
      .catch(error => {
        console.error('Error', error);
      });
  }

  componentDidMount() {
    const userData = this.props.userData;
    this.setState({
      firstName: userData.firstName,
      lastName: userData.lastName,
      dateOfBirth: userData.birthday
    });
  }

  render() {
    const { currentForm, firstName, lastName, address, city, state, zip, dateOfBirth, pastMedicalHistory, familyHistory, chiefComplain, comment, agreed, fullName, errorMessage, insuranceCardOriginalName, medicalRecordOriginalName, result } = this.state;

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
          result = {result}
          registrationformStatus = {this.props.registrationformStatus}
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
      <h3 className="text-center mb-3 mb-md-5">Registration Form</h3>
      <form className="border p-3 p-md-5 needs-validation" onSubmit={ onSubmit } >
        <div className="row mb-3">
          <div className="col-md-6">
              <div className="row mb-3">
                <label htmlFor="firstName" className="col-form-label">First name</label>
                <div className="col-md-12">
                   <input type="text" value={firstName} onChange={onChange} name="firstName" className="form-control" id="firstName" placeholder="First name" required/>
                   <div className="invalid-feedback">
                    Please provide your first name.
                   </div>
               </div>
              </div>
          </div>
          <div className="col-md-6">
             <div className="row mb-3">
                 <label htmlFor="lastName" className="col-form-label">Last name</label>
                 <div className="col-md-12">
                   <input type="text" className="form-control" id="lastName" name="lastName" onChange={onChange} value={lastName} placeholder="Last name" required />
                   <div className="invalid-feedback">
                     Please provide your last name.
                   </div>
                </div>
             </div>
          </div>
          </div>
        <div className="row mb-3">
          <div className="col-md mb-3">
            <label htmlFor="address" className="col col-form-label" >Address</label>
            <input type="text" className="form-control" id="address" name="address" onChange={onChange} value={address} placeholder="Street address or P.O. Box include Apt, suite, unit etc" required/>
            <div className="invalid-feedback">
              Please provide your address.
             </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md mb-3">
            <label htmlFor="city" className="form-label">City</label>
            <input type="text" className="form-control" id="city" name="city" onChange={onChange} value={city} placeholder="City" required />
              <div className="invalid-feedback">
               Please provide a vaild city.
             </div>

          </div>
          <div className="col-md mb-3">
            <label htmlFor="State" className="form-label">State</label>
            <input type="text" className="form-control" id="State" name="state" onChange={onChange} value={state} placeholder="State" required />
              <div className="invalid-feedback">
               Please provide a vaild state.
             </div>

          </div>
          <div className="col">
            <label htmlFor="zip" className="form-label">Zip</label>
            <input type="number" className="form-control" id="zip" name="zip" onChange={onChange} value={zip} placeholder="Zip" required />
              <div className="invalid-feedback">
               Please provide a vaild zip code.
             </div>

          </div>
        </div>
      <div className="row mb-3">
        <label htmlFor="date" className="col col-form-label">Date of Birth</label>
        <div className="col-md-6">
          <input type="date" className="form-control" id="dateOfBirth" name="dateOfBirth" onChange={onChange} value={dateOfBirth} required />
              <div className="invalid-feedback">
               Please provide your date of birth.
             </div>

        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="floatingTextarea" className="form-label">Past Medical History (Optional)</label>
        <textarea className="form-control" id="floatingTextarea" name="pastMedicalHistory" onChange={onChange} value={pastMedicalHistory} placeholder="Past Medical History" ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="floatingTextarea" className="form-label">Family History (Optional)</label>
        <textarea className="form-control" id="floatingTextarea" name="familyHistory" onChange={onChange} value={familyHistory} placeholder="Family History" ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="floatingTextarea" className="form-label">Chief Complain</label>
        <textarea className="form-control" id="floatingTextarea" name="chiefComplain" onChange={onChange} value={chiefComplain} placeholder="Chief Complain" required ></textarea>
      </div>
        <div className="row m-1 justify-content-between">
          <button className="col col-md-4 btn btn-primary me-md-2" type="button" name="cancelBtn" onClick={onClick}>Cancel</button>
          <button type="submit" className="col col-md-4 ms-5 btn btn-primary">Next</button>
        </div>
      </form>
    </>
  );
}

function SecondPage(props) {
  const { comment, agreed, fullName, onChange, onSubmit, onClick, firstName, lastName, errorMessage, userId, insuranceCardOriginalName, medicalRecordOriginalName, result, registrationformStatus } = props;
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
      <h3 className="text-center mb-3 mb-md-5">Registration Form</h3>
      <form className="border p-3 p-md-5" onSubmit={ onSubmit }>
          <div className="row mb-3">
              <div className="col-6 col-md-auto">
              Insurance Card
              </div>
              <button type="button" onClick={() => handleInsuranceShow(true)} name="insuranceCardBtn" className="btn btn-secondary btn-sm col-4 col-md-auto"> Add File</button>
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

          <div className="row mb-3">
              <div className="col-6 col-md-auto">
              Medical Record (Optional)
              </div>
              <button type="button" onClick={() => handleMedicalRecordShow(true)} name="medicalRecordBtn" className="btn btn-secondary btn-sm col-4 col-md-auto"> Add File</button>
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

          <div className="row mb-3">
            <label htmlFor="comment" className="form-label">Other comments regarding your health condition (Optional)</label>
             <textarea className="form-control" id="floatingTextarea" name="comment" onChange={onChange} value={comment} placeholder="Other comments regarding your health condition" ></textarea>
          </div>
          <div className="row mb-3 text-center">
            <span>“I certify under perjury the information I provided is true and correct. By checking below, I acknowledge full disclosure if my health condition.”</span>
           </div>

          <div className="row mb-3">
             <div className="col">
               <label className="list-group-item">
                <input className="form-check-input me-1" type="checkbox" name = "agreed" checked={agreed} onChange={onChange} required />
                <div className="invalid-feedback">
                  You must agree before submitting.
                </div>
                I agree
               </label>
             </div>
          </div>
            <div className="col mb-3">
               <label htmlFor="address" className="col col-form-label">Name</label>
               <input type="text" className="form-control" id="Name" name = "fullName" onChange={onChange} value={fullName} placeholder="Print Name" required />
                {row}
            </div>
         <div className="help-block mt-2 ps-5"> {errorMessage}</div>

        <div className="row m-1 justify-content-between">
            <button type="button" name="previousBtn" className="col col-md-4 btn btn-primary me-md-2" onClick={onClick}>Previous</button>
            <button type="submit" className="col col-md-4 ms-5 btn btn-primary">Submit</button>
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

      <Modal show={result} target="alert">
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <div className="row align-items-center">
              <p className="row justify-content-center text-center">Form is submitted successfully!</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => registrationformStatus()}>
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
