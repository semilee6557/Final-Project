import React from 'react';
import Table from 'react-bootstrap/Table';

export default function MyAccount(props) {
  const userData = props.userData;
  return (
    <AccountInfo userData={userData} />
  );
}

function AccountInfo(props) {
  const userData = props.userData;
  return (
      <>
      <div className="mt-5 d-flex flex-column align-items-center">
        <div className='text-center p-5'>
          <h1>My Account</h1>
        </div>
        <Table borderless>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{userData.name}</td>
            </tr>
            <tr>
              <td>Date of Birth</td>
              <td>{userData.dob}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{userData.email}</td>
            </tr>
            <tr>
              <td>Password</td>
              <td>****</td>
              <td><button type='button'>CHANGE MY PASSWORD</button></td>
            </tr>
          </tbody>
        </Table>
      </div>
      </>
  );
}
