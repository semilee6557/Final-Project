import React from 'react';
import Table from 'react-bootstrap/Table';

export default class MyAppointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      table: null
    };
  }

  render() {
    const table = this.state.table;
    return (
    <>
      <h1>My Appointment</h1>
      <Table className="calendar" id="calendar">
        <thead>
          <tr key="month">
            <th colSpan="6" className="text-center">
              <h1>
                {this.state.monthIndex + 1}
                </h1>
            </th>
          </tr>
          <tr key="day">
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thur</th>
            <th>Fri</th>
            <th>Sat</th>
            <th>Sun</th>
          </tr>
        </thead>
        <tbody>
                {table}
        </tbody>
      </Table>
    </>
    );
  }
}
