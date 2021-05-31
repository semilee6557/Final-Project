import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default class EmailSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: false,
      name: '',
      dob: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  // searchId() {

  //   if (!result) {
  //     alert('There is no matching data. Please creat new account.');
  //   }
  // }

  onChange(event) {
    const name = event.target.name;
    const value = name === 'name' ? event.target.value.toLowerCase() : event.target.value;
    this.setState({ [name]: value });
    // console.log(name, value);
  }

  onSubmit(event) {
    event.preventDefault();
    const { result, ...data } = this.state;
    // console.log('data', data);
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'appication/json'
      },
      body: JSON.stringify(data)
    };

    fetch('/search/email', req)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(result => {
        // console.log(result);
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
        <button type="submit" className="btn btn-primary col ">Submit</button>
        </div>
      </form>
            : <div>
         <h4> Search email </h4>
         <div className='Search_id_result'>
           <p> Found your email</p>
           <div className='Search_id_result_div'>
             <div>
               <h5> Email </h5>
               {result[0].id}
             </div>
             <div>
               <h5> Join Ddate </h5>
               {result[0].signup_date.slice(0, 10)}
             </div>
           </div>
           <div>
             <input type='button' value='back' name='search_id_back'
                    onClick={() => this._resetBack()}
             />
           </div>
         </div>
       </div>
          }
          </Modal.Body>
      </Modal>
    );
  }
}
