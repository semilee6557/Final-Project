import React from 'react';
import Table from 'react-bootstrap/Table';
import DeleteAppt from './deleteAppt';

export default class MyAppointment extends React.Component {
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
      openModal: false,
      result: null,
      table: null,
      selectDayAttps: null
    };
    this.dayCallBack = this.dayCallBack.bind(this);
    this.weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    this.closeModal = this.closeModal.bind(this);
    this.findDay = this.findDay.bind(this);
    this.createTable = this.createTable.bind(this);
    this.data = this.data.bind(this);
  }

  data(obj) {

    const req = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };

    fetch('/api/appointment/myAppt', req)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(result => {
        const bookedAppt = [];
        let apptObj = {};
        let time = [];
        for (let i = 0; i < this.state.lastDate; i++) {
          time = [];
          apptObj = {};
          for (let r = 0; r < result.length; r++) {
            if (result[r].date === i + 1) {
              time.push(result[r].time);
            }

          }
          apptObj.date = i + 1;
          apptObj.time = time;
          bookedAppt.push(apptObj);
        }
        this.setState({ result: bookedAppt });
        this.createTable();
      })
      .catch(err => {
        console.error(err);
      });

  }

  dayCallBack(event) {
    const selectedDate = parseInt(event.target.textContent);
    const selectedDay = this.findDay(selectedDate);

    const selectDayAttps = this.state.result[selectedDate - 1].time;

    fetch('/api/appointment')
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch(err => {
        console.error(err);
      });

    this.setState({ selectedDate, selectedDay, openModal: true, selectDayAttps });
  }

  findDay(date) {
    const selectedDayIndex = new Date(2021, this.state.monthIndex, date).getDay();
    const selectedDay = this.weekday[selectedDayIndex];
    return selectedDay;
  }

  closeModal(target) {
    this.setState({ openModal: false });
  }

  componentDidMount() {

    const today = new Date();
    const curMonth = today.getMonth();
    this.setState({ monthIndex: curMonth });

    const obj = {
      userId: this.state.userData.userId,
      month: curMonth + 1
    };

    this.data(obj);

    const firstDayIndex = new Date(2021, today.getMonth(), 1).getDay();
    const firstDay = this.weekday[firstDayIndex];
    const lastDate = new Date(2021, today.getMonth() + 1, 0).getDate();

    const startDateofWeek = [];
    if (firstDayIndex !== 1) {
      startDateofWeek.push(0);
    } else {
      startDateofWeek.push(1);
    }

    this.setState({ firstDayIndex, lastDate, firstDay });

  }

  createTable() {

    const weeks = [];
    let days = [];
    const bookedAppts = this.state.result;
    let bookedAppt = null;
    let message = '';
    let day = null;

    let selectedDayIndex = null;

    if (this.state.firstDay !== 'Monday') {
      for (let i = 1; i < this.state.firstDayIndex; i++) {
        message = '';
        days.push(<td key={'blank' + i}><div></div><div className="availableAppt mt-1">{message}</div></td>);
      }
    }

    for (let i = 0; i < this.state.lastDate; i++) {
      for (let r = 0; r < bookedAppts.length; r++) {
        if (bookedAppts[r].date === i + 1) {
          bookedAppt = bookedAppts[r].time;
        }
      }

      selectedDayIndex = new Date(2021, this.state.monthIndex, i + 1).getDay();
      day = this.weekday[selectedDayIndex];
      if (day === 'Sunday' || day === 'Saturday') {
        message = '';
      } else if (!bookedAppt) {
        message = '';
      } else {
        message = bookedAppt.length;
      }

      if (day === 'Monday') {
        weeks.push(<tr key={weeks.length + 'Monday'}>{days}</tr>);
        days = [];
      }

      if (day === 'Sunday' || day === 'Saturday') {
        days.push(<td key={days.length + 'blank' + i}><div>{i + 1}</div><div className="availableAppt mt-1">{message}</div></td>);
      } else if (!bookedAppt) {
        days.push(<td key={days.length + 'blank' + i}><div>{i + 1}</div><div className="availableAppt mt-1">{message}</div></td>);
      } else {
        days.push(<td key={days.length + 'blank' + i}><div onClick={this.dayCallBack}>{i + 1}</div><div className="availableAppt mt-1">{message}</div></td>);
      }
    }
    if (days) {
      weeks.push(<tr key={weeks.length}>{days}</tr>);
    }
    this.setState({ table: weeks });
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
      <DeleteAppt state={this.state} openModal={this.state.openModal} closeModal = {this.closeModal} />
    </>
    );
  }
}
