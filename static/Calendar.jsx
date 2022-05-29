function Calendar(props) {
  const [calActivities, setCalActivities] = React.useState([]);

  React.useEffect(() => {
    if (props.userId) {
      fetch(`/api/users/${props.userId}/activities`)
        .then((response) => response.json())
        .then((data) => {
          setCalActivities(data.activities);
          console.log(calActivities);
        });
    }
  }, [props.userId]);

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

  // console.log(today);
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
          calActivities={props.calActivities}
          setCalActivities={props.setCalActivities}
        />
        {/* <CalendarActivities today={today} userId={props.userId} /> */}
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

  const currentDays = [];

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

    const findActivityForDate = (calActivities, date) => {
      for (const calActivity of calActivities) {
        return calActivity.date === date;
      }
    };

    const calendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === props.today.getMonth(),
      calDate: new Date(firstDayOfMonth),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: firstDayOfMonth.toDateString() === props.today.toDateString(),
      year: firstDayOfMonth.getFullYear(),
      activities: findActivityForDate(props.calActivities, calDate),
    };
    currentDays.push(calendarDay);
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
            <div>{day.activities}</div>
          </div>
        );
      })}
    </div>
  );
}

function CalendarActivities(props) {
  const [calActivities, setCalActivities] = React.useState([]);

  React.useEffect(() => {
    if (props.userId) {
      fetch(`/api/users/${props.userId}/activities`)
        .then((response) => response.json())
        .then((data) => {
          setCalActivities(data.activities);
          console.log(calActivities);
        });
    }
  }, [props.userId]);

  return (
    <div>
      <CalActivitiesContainer
        calActivities={calActivities}
        setCalActivities={setCalActivities}
        setError={props.setError}
        userId={props.userId}
      />
      {/* <AddActivityButton
        activities={activities}
        setActivities={setActivities}
        setError={props.setError}
        userId={props.userId}
        setShowActivityForm={setShowActivityForm}
        showActivityForm={showActivityForm}
      /> */}
    </div>
  );
}

function CalActivitiesContainer(props) {
  const { calActivities, setCalActivities } = props;

  const calActivityDetails = [];

  for (const calActivity of calActivities) {
    calActivityDetails.push(
      <ActivityCard
        key={calActivity.id}
        name={calActivity.name}
        date={calActivity.date}
        distance={calActivity.distance}
        type={calActivity.type}
      />
    );
    console.log(calActivities.date);
  }

  return (
    <div>
      <div>{calActivityDetails}</div>
    </div>
  );
}
