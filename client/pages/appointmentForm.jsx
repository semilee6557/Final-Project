import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default class AppointmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.closeModal();
  }

  render() {

    return (
    <>
      <Modal show={this.props.openModal} target="modal">
        <Modal.Header>
          <Modal.Title>Avaliable Times</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container">
            <div className="row align-items-center">
              <p className="row justify-content-center text-center">times</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClick}>
             Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    );
  }
}
