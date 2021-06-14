import React from 'react';
import AppointmentForm from './appointmentForm';
import Table from 'react-bootstrap/Table';

export default class AppointmentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      monthIndex: null,
      selectedDate: null,
      selectedDay: null,
      firstDayIndex: 0,
      firstDay: null,
      lastDate: null,
      openModal: false
    };
    this.dayCallBack = this.dayCallBack.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.findDay = this.findDay.bind(this);
  }

  dayCallBack(event) {
    const selectedDate = parseInt(event.target.textContent);
    const selectedDay = this.findDay(selectedDate);
    this.setState({ selectedDate, selectedDay, openModal: true });

  }

  findDay(date) {
    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const selectedDayIndex = new Date(2021, this.state.monthIndex, date).getDay();
    const selectedDay = weekday[selectedDayIndex];
    return selectedDay;
  }

  closeModal(target) {
    this.setState({ openModal: false });
  }

  componentDidMount() {
    const today = new Date();
    // const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const curMonth = today.getMonth();
    this.setState({ monthIndex: curMonth });

    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const firstDayIndex = new Date(2021, today.getMonth(), 1).getDay();
    const firstDay = weekday[firstDayIndex];
    const lastDate = new Date(2021, today.getMonth() + 1, 0).getDate();

    const startDateofWeek = [];
    if (firstDayIndex !== 1) {
      startDateofWeek.push(0);
    } else {
      startDateofWeek.push(1);
    }

    // weekday.length - firstDayIndex;

    this.setState({ firstDayIndex, lastDate, firstDay });
  }

  render() {
    const weeks = [];
    let days = [];
    const bookedAppts = [1, 6];
    let bookedAppt = null;
    let message = '';

    let day = null;

    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let selectedDayIndex = null;

    if (this.state.firstDay !== 'Monday') {
      for (let i = 1; i < this.state.firstDayIndex; i++) {
        message = '';
        days.push(<td key={'blank' + i}><div></div><div className="availableAppt mt-1">{message}</div></td>);
      }
    }
    for (let i = 0; i < this.state.lastDate; i++) {
      bookedAppt = bookedAppts[i];
      selectedDayIndex = new Date(2021, this.state.monthIndex, i + 1).getDay();
      day = weekday[selectedDayIndex];
      if (day === 'Sunday' || day === 'Saturday') {
        message = '';
      } else if (bookedAppt === 6) {
        message = '';
      } else {
        message = 0 + '/6';
      }

      if (day === 'Monday') {
        weeks.push(<tr>{days}</tr>);
        days = [];
      }
      days.push(<td key={'blank' + i}><div>{i + 1}</div><div className="availableAppt mt-1">{message}</div></td>);
    }
    if (days) {
      weeks.push(<tr>{days}</tr>);
    }

    return (
    <>
      <Table className="calendar" id="calendar">
        <thead>
          <tr>
            <th colSpan="6" className="text-center">
              <h1>
                {this.state.monthIndex + 1}
                </h1>
            </th>
          </tr>
          <tr>
            <th>Mo</th>
            <th>Tu</th>
            <th>We</th>
            <th>Th</th>
            <th>Fr</th>
            <th>Sa</th>
            <th>Su</th>
          </tr>
        </thead>
        <tbody>
                {weeks}
        </tbody>
      </Table>
      <AppointmentForm userData={this.state.userData} openModal={this.state.openModal} closeModal = {this.closeModal}/>
    </>
    );
  }
}
