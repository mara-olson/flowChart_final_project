function Calendar(props) {
  const [calActivities, setCalActivities] = React.useState([]);
  const [calPeriods, setCalPeriods] = React.useState([]);
  const [today, setToday] = React.useState(new Date());
  const realToday = new Date();

  React.useEffect(() => {
    if (props.userId) {
      fetch(`/api/${props.userId}/activities`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.activities);
          setCalActivities(data.activities);
        });
    }
  }, [props.userId]);

  React.useEffect(() => {
    if (props.userId) {
      fetch(`/api/${props.userId}/periods`)
        .then((response) => response.json())
        .then((data) => {
          props.setPeriods(data.periods);
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
          editMode={props.editMode}
          setEditMode={props.setEditMode}
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
          periods={props.periods}
          setPeriods={props.setPeriods}
          calPeriods={calPeriods}
          setCalPeriods={setCalPeriods}
        />
        {/* <CalendarActivities today={today} userId={props.userId} /> */}
      </div>
    </div>
  );
}

function CalendarDays(props) {
  // console.log(props.calPeriods);
  // console.log(props.calActivities);

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
      activityDate: new Date(firstDayOfMonth).toISOString().substring(0, 10),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected:
        firstDayOfMonth.toISOString().substring(0, 10) ===
        props.realToday.toISOString().substring(0, 10),
      year: firstDayOfMonth.getFullYear(),
    };
    currentDays.push(calendarDay);

    for (const currentDay of currentDays) {
      for (const calActivity of props.calActivities) {
        if (currentDay.date === calActivity.date) {
          currentDay["activityId"] = calActivity.activity_id;
          currentDay["activityDate"] = calActivity.date;
          currentDay["activityName"] = calActivity.name;
          currentDay["activityType"] = calActivity.type;
          currentDay["distance"] = calActivity.distance;
          currentDay["duration"] = calActivity.duration;
          currentDay["activityNotes"] = calActivity.activityNotes;
          currentDay["sufferScore"] = calActivity.sufferScore;
        }
      }
      for (const calPeriod of props.periods) {
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
    evt.preventDefault(evt);
    // props.setSelectedDay(evt.);
    console.log(day);
    if (day.activityName && day.volume) {
      console.log(props.editMode);
      const content = (
        <div>
          <h2>Activity</h2>
          <ActivityCard
            userId={props.userId}
            editMode={props.editMode}
            setEditMode={props.setEditMode}
            key={day.activityId}
            activityId={day.activityId}
            activityName={day.activityName}
            activityDate={day.activityDate}
            activityType={day.activityType}
            duration={day.duration}
            distance={day.distance}
            sufferScore={day.sufferScore}
            activityNotes={day.activityNotes}
            modalContent={props.setModalContent}
            setModalContent={props.setModalContent}
            setShowModal={props.setShowModal}
          />
          <h2>Period</h2>
          <PeriodCard
            userId={props.userId}
            key={day.periodId}
            periodId={day.periodId}
            volume={day.volume}
            date={day.date}
            symptoms={day.symptoms}
            setShowModal={props.setShowModal}
          />
        </div>
      );
      props.setShowModal(true);
      props.setEditMode(true);
      props.setModalContent(content);
    } else if (day.activityName) {
      props.setEditMode(true);
      console.log(props.editMode);
      const content = (
        <ActivityCard
          userId={props.userId}
          editMode={props.editMode}
          setEditMode={props.setEditMode}
          key={day.activityId}
          activityId={day.activityId}
          activityName={day.activityName}
          activityDate={day.activityDate}
          activityType={day.activityType}
          duration={day.duration}
          distance={day.distance}
          sufferScore={day.sufferScore}
          activityNotes={day.activityNotes}
          modalContent={props.setModalContent}
          setModalContent={props.setModalContent}
          setShowModal={props.setShowModal}
        />
      );
      props.setShowModal(true);

      props.setModalContent(content);
    } else if (day.volume) {
      const content = (
        <PeriodCard
          userId={props.userId}
          volume={day.volume}
          date={day.date}
          symptoms={day.symptoms}
          setShowModal={props.setShowModal}
        />
      );
      props.setShowModal(true);
      props.setModalContent(content);
    } else {
      props.setEditMode(false);

      const goToAddActivity = (evt) => {
        evt.preventDefault();

        props.setModalContent(
          <AddActivityForm
            userId={props.userId}
            editMode={props.editMode}
            setEditMode={props.setEditMode}
            activities={props.actitivies}
            setActivities={props.setActivities}
            setShowActivityForm={props.setShowActivityForm}
            activityDate={day.activityDate}
            modalError={props.modalError}
            setModalError={props.setModalError}
            modalContent={props.modalContent}
            setModalContent={props.setModalContent}
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            selectedDate={day.date}
          />
        );
      };
      const goToAddPeriod = (evt) => {
        evt.preventDefault();
        // console.log(day.selected);
        props.setModalContent(
          <PeriodForm
            userId={props.userId}
            editMode={props.editMode}
            setEditMode={props.setEditMode}
            modalError={props.modalError}
            setModalError={props.setModalError}
            modalContent={props.modalContent}
            setModalContent={props.setModalContent}
            showModal={props.showModal}
            setShowModal={props.setShowModal}
            periods={props.periods}
            setPeriods={props.setPeriods}
            selectedDate={day.date}
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
