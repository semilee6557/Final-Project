import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default class AppointmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.state.userData,
      appts: this.props.state.table,
      selectedTime: null,
      confirmModal: false,
      finalConfirmModal: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openConfirmModal = this.openConfirmModal.bind(this);
    this.closeConfirmModal = this.closeConfirmModal.bind(this);
    this.closeFinalConfirmModal = this.closeFinalConfirmModal.bind(this);
  }

  handleClick() {
    this.props.closeModal();
  }

  closeConfirmModal() {
    this.setState({ confirmModal: false });
    this.handleClick();
  }

  closeFinalConfirmModal() {
    this.setState({ finalConfirmModal: false });
    window.location.hash = '#myAppointment';

  }

  onClick(event) {

    this.setState({ selectedTime: event.target.name });
    this.setState({ confirmModal: true });
    this.props.closeModal();
  }

  handleSubmit() {
    const data = {
      time: this.state.selectedTime,
      userId: this.state.userData.userId,
      year: 2021,
      month: this.props.state.monthIndex + 1,
      date: this.props.state.selectedDate
    };
    fetch('/api/appointment/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .catch(error => {
        console.error('Error', error);
      });
    this.setState({ confirmModal: false, finalConfirmModal: true });

  }

  openConfirmModal() {
    this.setState({ confirmModal: true });

  }

  render() {
    const state = this.props.state;
    const bookedtimes = state.selectDayAttps;
    const table = [];
    const allTimes = ['9am', '11am', '3pm'];
    let availableTimes = [];
    if (bookedtimes) {

      availableTimes = allTimes.filter(x => bookedtimes.indexOf(x) === -1);
      if (bookedtimes.length === 3) {
        table.push(
            <div className="row align-items-center mb-2" key="header">
              <div className="col justify-content-center text-center">No available time. Please choose other date</div>
            </div>
        );

      }
    }
    if (availableTimes) {
      for (let i = 0; i < availableTimes.length; i++) {
        table.push(
          <div key={'time' + i}>
            <div className="row align-items-center mb-2" key={availableTimes[i]}>
             <div className="col justify-content-center text-center">{availableTimes[i]}</div>
             <button onClick={this.onClick} name={availableTimes[i]} className="col btn btn-primary col-4">Select</button>
            </div>
          </div>
        );
      }
    }

    return (
    <>
      <Modal show={this.props.openModal} target="modal">
        <Modal.Header>
          <Modal.Title>{state.monthIndex + 1}/{state.selectedDate}/21 {state.selectedDay}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <div className="row align-items-center mb-2" key="header">
              <div className="col justify-content-center text-center">Available Times</div>
            </div>

            {table}

          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClick}>
             Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={this.state.confirmModal} target="confirm">
        <Modal.Header>
          <Modal.Title>{state.monthIndex + 1}/{state.selectedDate}/21 {state.selectedDay}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <div className="row align-items-center mb-4" key="header">
              <div className="col justify-content-center text-center">Confirm to make appointment</div>
            </div>
            <div className="row align-items-center mb-2" key="date" >
              <div className="col justify-content-center text-center">Appointment Date : {state.monthIndex + 1}/{state.selectedDate}/21 {state.selectedDay}</div>
            </div>
            <div className="row align-items-center mb-4" key="time">
              <div className="col justify-content-center text-center">Appointment Time : {this.state.selectedTime}</div>
            </div>
            <div className="row justify-content-center mb-2" key="btn" >
              <button onClick={this.handleSubmit} name="3pm" className="col btn btn-primary col-4 ">Submit</button>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeConfirmModal}>
             Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={this.state.finalConfirmModal} target="confirm">
        <Modal.Header>
          <Modal.Title>{state.monthIndex + 1}/{state.selectedDate}/21 {state.selectedDay}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <div className="row align-items-center mb-4" key="header">
              <div className="col justify-content-center text-center">Your Appointment is set on {state.monthIndex + 1}/{state.selectedDate}/21 {state.selectedDay} at {this.state.selectedTime}</div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeFinalConfirmModal}>
             Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
  }
}
