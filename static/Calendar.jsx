function Calendar(props) {
  const [calActivities, setCalActivities] = React.useState([]);
  const [calPeriods, setCalPeriods] = React.useState([]);
  const [today, setToday] = React.useState(new Date());
  const realToday = new Date();

  React.useEffect(() => {
    if (props.userId) {
      fetch(`/api/users/${props.userId}/activities`)
        .then((response) => response.json())
        .then((data) => {
          setCalActivities(data.activities);
        });
    }
  }, [props.userId]);

  React.useEffect(() => {
    if (props.userId) {
      fetch(`/api/users/${props.userId}/periods`)
        .then((response) => response.json())
        .then((data) => {
          setCalPeriods(data.periods);
        });
    }
  }, [props.userId]);

  // console.log(calPeriods);

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

  const nextMonth = () => {
    setToday(new Date(today.setMonth(today.getMonth() + 1)));
  };

  const prevMonth = () => {
    setToday(new Date(today.setMonth(today.getMonth() - 1)));
    // console.log()
  };

  // console.log(today);
  return (
    <div className="calendar">
      <div className="calendar-header">
        <h2>
          {currentMonth}, {currentYear}
        </h2>
        <div className="calendar-nav">
          <button type="link" onClick={prevMonth}>
            Previous Month
          </button>
          <button type="link" onClick={nextMonth}>
            Next Month
          </button>
        </div>
      </div>
      <div className="calendar-body">
        <div className="weekdays-header">
          {weekdays.map((weekday) => {
            return (
              <div key={weekday} className="weekday">
                <p>{weekday}</p>
              </div>
            );
          })}
        </div>
        <CalendarDays
          realToday={realToday}
          today={today}
          setToday={setToday}
          userId={props.userId}
          calActivities={calActivities}
          setCalActivities={setCalActivities}
          setShowModal={props.setShowModal}
          setModalTitle={props.setModalTitle}
          setModalContent={props.setModalContent}
          activityDate={props.activityDate}
          setActivityDate={props.setActivityDate}
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
  const realTodayMonth = props.realToday.getMonth();
  const finalTodayMonth = new Date(firstDayOfMonth).toDateString();
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

    const calendarDay = {
      currentMonth: firstDayOfMonth.getMonth() === props.today.getMonth(),
      date: new Date(firstDayOfMonth).toDateString(),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected:
        firstDayOfMonth.toDateString() === props.realToday.toDateString(),
      year: firstDayOfMonth.getFullYear(),
    };
    currentDays.push(calendarDay);

    for (const currentDay of currentDays) {
      for (const calActivity of props.calActivities) {
        if (currentDay.date == calActivity.date) {
          currentDay.id == calActivity.id;
          currentDay["activityName"] = calActivity.name;
          currentDay["activityType"] = calActivity.type;
          currentDay["distance"] = calActivity.distance;
        }
      }
    }
  }

  const handleClick = (day) => {
    // evt.preventDefault();
    // props.setSelectedDay(evt.);
    if (day.activityName) {
      const content = (
        <ActivityCard
          name={day.activityName}
          date={day.date}
          type={day.activityType}
          distance={day.distance}
        />
      );
      props.setShowModal(true);
      props.setModalContent(content);
    } else {
      const goToAddActivity = () => {
        props.setActivityDate(day.date);
        props.setModalContent(
          <AddActivityForm activityDate={props.activityDate} />
        );
      };
      const goToAddPeriod = () => {
        props.setModalContent(<PeriodForm />);
      };

      const content = (
        <div>
          <button onClick={goToAddActivity}>Add Activity</button>
          <button onClick={goToAddPeriod}>Add Period</button>
          <button onClick={props.setModalContent(content)}>Back</button>
        </div>
      );
      props.setModalContent(content);
      props.setShowModal(true);
    }
  };

  // const nextMonth = () => {
  //   props.setToday(new Date(props.today.setMonth(props.today.getMonth() + 1)));
  // };

  // const prevMonth = () => {
  //   props.setToday(new Date(props.today.setMonth(props.today.getMonth() - 1)));
  //   // console.log()
  // };

  return (
    <div className="table-content">
      <div className="calendar-nav">
        {/* <button type="link" onClick={prevMonth}>
          Previous Month
        </button>
        <button type="link" onClick={nextMonth}>
          Next Month
        </button> */}
        <br></br>
      </div>
      {currentDays.map((day) => {
        return (
          <button
            className={
              "calendar-day" +
              (day.currentMonth ? " current" : "") +
              (day.selected ? " selected" : "")
            }
            key={day.id}
            onClick={() => handleClick(day)}
          >
            <p>{day.number}</p>
            <div>{day.activityName}</div>

            {/* <Modal
              onClose={() => setShowModal(false)}
              showModal={props.showModal}
              modalTitle={day.activityName}
              modalDate={day.activityDate}
              modalType={day.activityType}
            /> */}
          </button>
        );
      })}
    </div>
  );
}
