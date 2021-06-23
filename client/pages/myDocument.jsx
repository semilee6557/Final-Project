import React from 'react';
import Table from 'react-bootstrap/Table';

export default function MyDocument(props) {
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
      </>
  );
}
