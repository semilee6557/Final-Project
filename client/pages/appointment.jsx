import React from 'react';

export default class Appointment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: this.props.userData,
      month: '',
      firstDayIndex: 0,
      firstDay: null,
      lastDate: null
    };
  }

  componentDidMount() {
    const today = new Date();
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const curMonth = month[today.getMonth()];
    this.setState({ month: curMonth });

    const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const firstDayIndex = new Date(2021, today.getMonth(), 1).getDay();
    const firstDay = weekday[firstDayIndex];
    const lastDate = new Date(2021, today.getMonth() + 1, 0).getDate();

    this.setState({ firstDayIndex, lastDate, firstDay });

  }

  render() {

    const days = [];

    for (let i = 0; i <= this.state.firstDayIndex; i++) {
      days.push(<div className="day blank"></div>);
    }

    for (let i = 0; i < this.state.lastDate; i++) {
      days.push(<div className="day">{i + 1}</div>);
    }

    return (
    <>
      <div className="calendar" id="calendar">
          <h1 className="text-center">{this.state.month}</h1>
          <div className="calendar-dates">
              <div className="days">
                <div className="day label">Mo</div>
                <div className="day label">Tu</div>
                <div className="day label">We</div>
                <div className="day label">Th</div>
                <div className="day label">Fr</div>
                <div className="day label">Sa</div>
                <div className="day label">Su</div>
                {days}
          </div>
          </div>
      </div>
    </>
    );
  }
}
