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
    <div className="calendar-container">
      <div className="calendar">
        {/* <div className="row"> */}
        <div>
          <div className="calendar-header">
            <div className="calendar-title">
              {currentMonth}, {currentYear}
            </div>
          </div>
          <button
            className="btn cal-nav-button-previous"
            // type="link"
            onClick={prevMonth}
          >
            <i className="bi bi-caret-left-fill caret-icon-previous"></i>
            Previous
          </button>
          <button
            className="btn cal-nav-button-next"
            // type="link"
            onClick={nextMonth}
          >
            Next
            <i className="bi bi-caret-right-fill caret-icon-next"></i>
          </button>
          {/* </div> */}
        </div>
        <div className="calendar-body">
          <div className="weekdays-header">
            {weekdays.map((weekday) => {
              return (
                <div key={weekday} className="weekday">
                  {weekday}
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
            showActivityModal={props.showActivityModal}
            setShowActivityModal={props.setShowActivityModal}
            showAddActModal={props.showAddActModal}
            setShowAddActModal={props.setShowAddActModal}
            showDeleteActModal={props.showDeleteActModal}
            setShowDeleteActModal={props.setShowDeleteActModal}
            showPeriodModal={props.showPeriodModal}
            setShowPeriodModal={props.setShowPeriodModal}
            showAddPeriodModal={props.showAddPeriodModal}
            setShowAddPeriodModal={props.setShowAddPeriodModal}
            showDeletePeriodModal={props.showDeletePeriodModal}
            setShowDeletePeriodModal={props.setShowDeletePeriodModal}
            setModalTitle={props.setModalTitle}
            showEntryChoiceModal={props.showEntryChoiceModal}
            setShowEntryChoiceModal={props.setShowEntryChoiceModal}
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
            selectedPeriodId={props.selectedPeriodId}
            setSelectedPeriodId={props.setSelectedPeriodId}
            selectedDate={props.selectedDate}
            setSelectedDate={props.setSelectedDate}
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

        if (currentDay.activityDate === calPeriod.mense_date) {
          currentDay["periodId"] = calPeriod.mense_id;
          currentDay["flowVolume"] = calPeriod.flow_volume;
          currentDay["symptoms"] = symptoms;
          currentDay["periodNotes"] = calPeriod.mense_notes;
        }
      }
    }
  }

  const updateActivity = (day) => {
    if (day.activityId) {
      props.setSelectedActivityId(day.activityId);
      localStorage.setItem("selectedActivity", day.activityId);
    } else if (day.periodId) {
      console.log(day.flowVolume);
      props.setSelectedPeriodId(day.periodId);
      localStorage.setItem("selectedPeriod", day.periodId);
    }
  };

  const handleClick = (day, evt) => {
    evt.preventDefault();
    updateActivity(day);
    props.setSelectedDate(day.activityDate);

    if (!day.activityName && !day.flowVolume) {
      props.setShowEntryChoiceModal(true);
    } else if (day.activityName) {
      props.setShowActivityModal(true);
    } else if (day.flowVolume) {
      props.setShowPeriodModal(true);
      props.setShowAddPeriodModal(false);
    }
  };
  // updateActivity(day);
  const viewActivity = (day, evt) => {
    evt.preventDefault();
    props.setShowActivityModal(true);
  };

  const viewPeriod = (day, evt) => {
    evt.preventDefault();
    console.log("BLAH");
    console.log(props.showPeriodModal);
    props.setShowPeriodModal(true);
  };
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
  //
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
      <div className="calendar-nav"></div>
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
            <p className={day.flowVolume ? "with-flow" : ""}>{day.number}</p>
            {day.activityName && (
              <div
                className="calendar-activity"
                onClick={(evt) => viewActivity(day, evt)}
              >
                {day.activityName}
                <div className="cal-mileage">
                  {day.distance && day.distance + " miles"}
                </div>
              </div>
            )}
            {/* {day.symptoms == false && day.flowVolume === "No Flow" && (
              <div onClick={(evt) => viewPeriod(day, evt)}> */}
            {/* <i className="bi bi-record-circle-fill icon-red-heavy"></i> */}
            {/* </div>
            )}
            {day.symptoms != false && day.flowVolume === "No Flow" && (
              <div onClick={(evt) => viewPeriod(day, evt)}>
                <i className="bi bi-record-fill icon-red-heavy"></i>
              </div>
            )} */}
            {/* {day.symptoms == false && day.flowVolume === "Heavy" && (
              <div onClick={(evt) => viewPeriod(day, evt)}>
                <i className="bi bi-record-circle-fill icon-red-heavy"></i>
              </div>
            )}
            {day.symptoms != false && day.flowVolume === "Heavy" && (
              <div onClick={(evt) => viewPeriod(day, evt)}>
                <i className="bi bi-record-fill icon-red-heavy"></i>
              </div>
            )}
            {day.symptoms == false && day.flowVolume === "Light" && ( */}
            {/* <div onClick={(evt) => viewPeriod(day, evt)}> */}
            {/* <i className="bi bi-record-circle-fill icon-red-light"></i> */}
            {/* </div> */}
            {/* )} */}
            {/* {day.symptoms != false && day.flowVolume === "Light" && ( */}
            {/* <div onClick={(evt) => viewPeriod(day, evt)}> */}
            {/* <i className="bi bi-record-fill icon-red-light"></i> */}
            {/* </div> */}
            {/* )} */}
          </button>
        );
      })}
    </div>
  );
}
