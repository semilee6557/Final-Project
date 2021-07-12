import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default class EmailSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: false,
      name: '',
      dob: '',
      email: '',
      joinDate: null
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  }

  onSubmit(event) {
    event.preventDefault();
    const { result, ...data } = this.state;
    data.name = data.name.toLowerCase();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    fetch('/api/search/email', req)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(result => {
        this.setState({ email: result.email, result: true, joinDate: result.createdAt });
        event.target.reset();
      })
      .catch(err => {
        console.error(err);
      });

  }

  render() {
    const value = this.state;
    const { result } = this.state;

    return (
      <Modal
      show={this.props.idModalOpen}
      backdrop="static"
      keyboard={false}
      >
        <Modal.Body>

          {!result
            ? <form className="container border p-5" onSubmit={this.onSubmit}>
        <div className="text-center mb-5 title">Search Email</div>
        <div className="row mb-3">
          <label htmlFor="name" className=" col-form-label">Name</label>
          <div>
            <input type="name" name="name" value={value.name} placeholder="Name" className="form-control" id="inputEmail3" onChange={this.onChange}></input>
          </div>
          <label htmlFor="dob" className=" col-form-label">Date of Birth</label>
          <div>
            <input type="date" name="dob" value={value.dob} placeholder="Date of Birth" className="form-control" id="inputEmail3" onChange={this.onChange}></input>
          </div>
        </div>
        <div className="row">
        <button type="submit" className="btn btn-primary col m-2">Submit</button>
        <button type="button" className="btn btn-primary col m-2" onClick={() => this.props.closeModal('id')}>Cancel</button>
        </div>
      </form>
            : <div>
         <h4> Found your email </h4>
         <div className='Search_id_result'>
           <div className='Search_id_result_div'>
             <div>
               <h5> Email: {this.state.email} </h5>
             </div>
             <div>
               <h5> Join Date: {this.state.joinDate} </h5>
             </div>
           </div>
           <div>
          <button type="button" className="btn btn-primary col m-2" onClick={() => this.props.closeModal('id')}>Close</button>
           </div>
         </div>
       </div>
          }
          </Modal.Body>
      </Modal>
    );
  }
}
