import React from 'react';

export default function CompleteIntakeForm(props) {
  return (
      <>
      <div className="mt-5 d-flex flex-column align-items-center">
        <div className='text-center p-5'>
          <h2> Thank you for submitting your medical informations. Click appointment to set up your first appointment with us!</h2>
        </div>
        <button type="button" className="btn btn-lg btn-danger"><a href='#appointment' > Appointment</a></button>
      </div>
      </>
  );
}
