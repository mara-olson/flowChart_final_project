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
          showModal={props.showModal}
          setShowModal={props.setShowModal}
          setModalTitle={props.setModalTitle}
          modalContent={props.modalContent}
          setModalContent={props.setModalContent}
          modalError={props.modalError}
          setModalError={props.setModalError}
          activities={props.activities}
          setActivities={props.setActivities}
          calPeriods={calPeriods}
          setCalPeriods={setCalPeriods}
        />
        {/* <CalendarActivities today={today} userId={props.userId} /> */}
      </div>
    </div>
  );
}

function CalendarDays(props) {
  console.log(props.calPeriods);
  console.log(props.calActivities);

  let firstDayOfMonth = new Date(
    props.today.getFullYear(),
    props.today.getMonth(),
    1
  );
  let weekdayOfFirstDay = firstDayOfMonth.getDay();
  // const realTodayMonth = props.realToday.getMonth();
  // const finalTodayMonth = new Date(firstDayOfMonth).toDateString();
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
        if (currentDay.date === calActivity.date) {
          currentDay["activityId"] = calActivity.id;
          currentDay["activityName"] = calActivity.name;
          currentDay["activityType"] = calActivity.type;
          currentDay["distance"] = calActivity.distance;
        }
      }
      for (const calPeriod of props.calPeriods) {
        const symptoms = [];
        if (calPeriod.mood) {
          symptoms.push("Moodiness");
        }
        if (calPeriod.cramps) {
          symptoms.push("Cramps");
        }
        if (calPeriod.bloating) {
          symptoms.push("Bloating");
        }
        if (calPeriod.fatigue) {
          symptoms.push("Fatigue");
        }

        if (currentDay.date === calPeriod.date) {
          currentDay["periodId"] = calPeriod.id;
          currentDay["volume"] = calPeriod.flow;
          currentDay["symptoms"] = symptoms;
        }
      }
    }
  }

  const handleClick = (day, evt) => {
    // evt.preventDefault();
    // props.setSelectedDay(evt.);
    if (day.activityName && day.volume) {
      const content = (
        <div>
          <h2>Activity</h2>
          <ActivityCard
            name={day.activityName}
            date={day.date}
            type={day.activityType}
            distance={day.distance}
          />
          <h2>Period</h2>
          <PeriodCard
            volume={day.volume}
            date={day.date}
            symptoms={day.symptoms}
          />
        </div>
      );
      props.setShowModal(true);
      props.setModalContent(content);
    } else if (day.activityName) {
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
    } else if (day.volume) {
      const content = (
        <PeriodCard
          volume={day.volume}
          date={day.date}
          symptoms={day.symptoms}
        />
      );
      props.setShowModal(true);
      props.setModalContent(content);
    } else {
      const goToAddActivity = () => {
        props.setModalContent(
          <AddActivityForm
            userId={props.userId}
            activities={props.actitivies}
            setActivities={props.setActivities}
            setShowActivityForm={props.setShowActivityForm}
            modalError={props.modalError}
            setModalError={props.setModalError}
            modalContent={props.modalContent}
            setModalContent={props.setModalContent}
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            selectedDate={day.displayDate}
          />
        );
      };
      const goToAddPeriod = () => {
        console.log(day.selected);
        props.setModalContent(
          <PeriodForm
            userId={props.userId}
            modalError={props.modalError}
            setModalError={props.setModalError}
            modalContent={props.modalContent}
            setModalContent={props.setModalContent}
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            selectedDate={day.displayDate}
          />
        );
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
            onClick={(evt) => handleClick(day, evt)}
          >
            <p>{day.number}</p>
            <div>{day.activityName}</div>
            {day.volume && <div>{day.volume} flow</div>}

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
