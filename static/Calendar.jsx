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
          setCalActivities(data.activities);
        });
    }
  }, [props.userId]);

  React.useEffect(() => {
    if (props.userId) {
      fetch(`/api/${props.userId}/periods`)
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
          editMode={props.editMode}
          setEditMode={props.setEditMode}
          calActivities={calActivities}
          setCalActivities={setCalActivities}
          // showModal={props.showModal}
          // setShowModal={props.setShowModal}
          f={props.showActivityModal}
          setShowActivityModal={props.setShowActivityModal}
          showAddActModal={props.showAddActModal}
          setShowAddActModal={props.setShowAddActModal}
          showDeleteActModal={props.showDeleteActModal}
          setShowDeleteActModal={props.setShowDeleteActModal}
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
          selectedActivityId={props.selectedActivityId}
          setSelectedActivityId={props.setSelectedActivityId}
        />
        {/* <ActivityModal
          userId={props.userId}
          error={props.error}
          setError={props.setError}
          modalError={props.modalError}
          setModalError={props.setModalError}
          showModal={props.showModal}
          setShowModal={props.setShowModal}
          activities={props.activities}
          setActivities={props.setActivities}
          selectedActivityId={props.selectedActivityId}
          setSelectedActivityId={props.setSelectedActivityId}
          onClose={props.closeModal}
        />
        <AddActivityModal
          userId={props.userId}
          error={props.error}
          setError={props.setError}
          modalError={props.modalError}
          setModalError={props.setModalError}
          showModal={props.showModal}
          setShowModal={props.setShowModal}
          activities={props.activities}
          setActivities={props.setActivities}
          selectedActivityId={props.selectedActivityId}
          setSelectedActivityId={props.setSelectedActivityId}
        /> */}
        {/* <CalendarActivities today={today} userId={props.userId} /> */}
      </div>
    </div>
  );
}

function CalendarDays(props) {
  // console.log(props.calPeriods);
  // console.log(props.calActivities);
  // console.log("props.selectedActivityId", props.selectedActivityId);
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
        if (currentDay.activityDate === calActivity.date) {
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

        if (currentDay.activityDate === calPeriod.date) {
          currentDay["periodId"] = calPeriod.id;
          currentDay["volume"] = calPeriod.flow;
          currentDay["symptoms"] = symptoms;
        }
      }
    }
  }

  const updateActivity = (day) => {
    props.setSelectedActivityId(day.activityId);
    console.log(day.activityId);
  };

  const handleClick = (day, evt) => {
    evt.preventDefault();
    updateActivity(day);
    // if (!day.activityName) {
    //   props.setShowModal(true);
    //   return (
    //     <AddActivityModal
    //       userId={props.userId}
    //       error={props.error}
    //       setError={props.setError}
    //       modalError={props.modalError}
    //       setModalError={props.setModalError}
    //       showModal={props.showModal}
    //       setShowModal={props.setShowModal}
    //       activities={props.activities}
    //       setActivities={props.setActivities}
    //       selectedDate={day.date}
    //     />
    //   );
    // }
    localStorage.setItem("selectedActivity", day.activityId);
  };
  // updateActivity(day);
  const viewActivity = (day, evt) => {
    evt.preventDefault();
    props.setShowActivityModal(true);
    // console.log(props.selectedActivityId);
    // if (day.activityName) {
    //   return (
    //     <ActivityModal
    //       userId={props.userId}
    //       error={props.error}
    //       setError={props.setError}
    //       modalError={props.modalError}
    //       setModalError={props.setModalError}
    //       showActivityModal={props.showActivityModal}
    //       setShowActivityModal={props.setShowActivityModal}
    //       activities={props.activiies}
    //       setActivities={props.setActivities}
    //       selectedActivityId={props.selectedActivityId}
    //       setSelectedActivityId={props.setSelectedActivityId}
    //       selectedDate={day.date}
    //     />
    //   );
    // }
  };

  // if (day.activityName && day.volume) {
  //   const content = (
  //     <div>
  //       <h2>Activity</h2>
  //       <ActivityCard
  //         userId={props.userId}
  //         editMode={props.editMode}
  //         setEditMode={props.setEditMode}
  //         key={day.activityId}
  //         activityId={day.activityId}
  //         activityName={day.activityName}
  //         activityDate={day.activityDate}
  //         activityType={day.activityType}
  //         duration={day.duration}
  //         distance={day.distance}
  //         sufferScore={day.sufferScore}
  //         activityNotes={day.activityNotes}
  //         modalContent={props.modalContent}
  //         setModalContent={props.setModalContent}
  //         setShowModal={props.setShowModal}
  //       />
  //       <h2>Period</h2>
  //       <PeriodCard
  //         userId={props.userId}
  //         editMode={props.editMode}
  //         setEditMode={props.setEditMode}
  //         key={day.periodId}
  //         periodId={day.periodId}
  //         volume={day.volume}
  //         date={day.date}
  //         symptoms={day.symptoms}
  //         setShowModal={props.setShowModal}
  //       />
  //     </div>
  //   );
  //   // props.setShowModal(true);
  //   props.setEditMode(true);
  //   props.setModalContent(content);
  // } else if (day.activityName) {
  //   props.setEditMode(true);

  //   const content = (
  //     <SelectedActivityContainer
  //       userId={props.userId}
  //       selectedActivityId={props.selectedActivityId}
  //     />
  // <ActivityCard
  //   userId={props.userId}
  //   // editMode={props.editMode}
  //   // setEditMode={props.setEditMode}
  //   key={selectedActivity.activityId}
  //   activityId={selectedActivity.activityId}
  //   activityName={selectedActivity.activityName}
  //   activityDate={selectedActivity.activityDate}
  //   activityType={selectedActivity.activityType}
  //   duration={selectedActivity.duration}
  //   distance={selectedActivity.distance}
  //   sufferScore={selectedActivity.sufferScore}
  //   activityNotes={selectedActivity.activityNotes}
  //   modalContent={props.setModalContent}
  //   setModalContent={props.setModalContent}
  //   setShowModal={props.setShowModal}
  //   activities={props.actitivies}
  //   setActivities={props.setActivities}
  // />
  //   );
  //   if (props.selectedActivityId) {
  //     props.setModalContent(content);
  //     props.setShowModal(true);
  //   }
  // } else if (day.volume) {
  //   const content = (
  //     <PeriodCard
  //       userId={props.userId}
  //       editMode={props.editMode}
  //       setEditMode={props.setEditMode}
  //       volume={day.volume}
  //       date={day.date}
  //       symptoms={day.symptoms}
  //       setShowModal={props.setShowModal}
  //     />
  //   );
  //   props.setModalContent(content);
  //   props.setShowModal(true);
  // } else {
  //   props.setEditMode(false);
  //   const goToAddActivity = (evt) => {
  //     evt.preventDefault();

  //     props.setModalContent(
  //       <AddActivityForm
  //         userId={props.userId}
  //         editMode={props.editMode}
  //         setEditMode={props.setEditMode}
  //         activities={props.actitivies}
  //         setActivities={props.setActivities}
  //         setShowActivityForm={props.setShowActivityForm}
  //         activityDate={day.activityDate}
  //         modalError={props.modalError}
  //         setModalError={props.setModalError}
  //         modalContent={props.modalContent}
  //         setModalContent={props.setModalContent}
  //         showModal={props.showModal}
  //         setShowModal={props.setShowModal}
  //         selectedDate={day.date}
  //         activityFormTitle="Edit Activity"
  //         activityFormButtonName="Save"
  //       />
  //     );
  //   };
  //     const goToAddPeriod = (evt) => {
  //       evt.preventDefault();
  //       // console.log(day.selected);
  //       props.setModalContent(
  //         <PeriodForm
  //           userId={props.userId}
  //           editMode={props.editMode}
  //           setEditMode={props.setEditMode}
  //           modalError={props.modalError}
  //           setModalError={props.setModalError}
  //           modalContent={props.modalContent}
  //           setModalContent={props.setModalContent}
  //           showModal={props.showModal}
  //           setShowModal={props.setShowModal}
  //           periods={props.periods}
  //           setPeriods={props.setPeriods}
  //           selectedDate={day.date}
  //         />
  //       );
  //     };

  //     const content = (
  //       <div>
  //         <button onClick={goToAddActivity}>Add Activity</button>
  //         <button onClick={goToAddPeriod}>Add Period</button>
  //         <button onClick={props.setModalContent(content)}>Back</button>
  //       </div>
  //     );
  //     props.setModalContent(content);
  //     props.setShowModal(true);
  //   }
  // };

  return (
    <div className="table-content">
      <div className="calendar-nav">
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
            {day.activityName && (
              <div onClick={(evt) => viewActivity(day, evt)}>
                {day.activityName}
              </div>
            )}
            {day.volume && <div>{day.volume} flow</div>}
          </button>
        );
      })}
    </div>
  );
}
