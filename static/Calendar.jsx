function Calendar(props) {
  const [today, setToday] = React.useState(new Date());

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentMonth = months[today.getMonth()];

  const currentYear = today.getFullYear();

  console.log(today);
  return (
    <div className="calendar">
      <div className="calendar-header">
        <h2>
          {currentMonth}, {currentYear}
        </h2>
      </div>
      <div className="calendar-body">
        <div className="weekdays-header">
          {weekdays.map((weekday) => {
            return (
              <div className="weekday">
                <p>{weekday}</p>
              </div>
            );
          })}
        </div>
        <CalendarDays
          today={today}
          userId={props.userId}
          activities={props.activities}
          setActivities={props.setActivities}
        />
      </div>
    </div>
  );
}

function CalendarDays(props) {
  let firstDayOfMonth = new Date(
    props.today.getFullYear(),
    props.today.getMonth(),
    1
  );
  let weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(
        firstDayOfMonth.getDate() + (day - weekdayOfFirstDay)
      );
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }

    const calendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === props.today.getMonth(),
      date: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === props.today.toDateString(),
      year: firstDayOfMonth.getFullYear(),
    };

    currentDays.push(calendarDay);
    console.log(currentDays);
  }

  return (
    <div className="table-content">
      {currentDays.map((day) => {
        return (
          <div
            className={
              "calendar-day" +
              (day.currentMonth ? " current" : "") +
              (day.selected ? " selected" : "")
            }
          >
            <p>{day.number}</p>
            <CalendarActivities />
          </div>
        );
      })}
    </div>
  );
}

function CalendarActivities(props) {
  const [calActs, setCalActs] = React.useState([]);

  React.useEffect(() => {
    if (props.userId) {
      fetch(`/api/users/${props.userId}/activities`)
        .then((response) => response.json())
        .then((data) => setCalActs(data.activities));
      console.log(calActs);
    }
  }, [props.userId]);

  return <p>{calActs}</p>;
}
