function AddActivityForm(props) {
  const [activityId, setActivityId] = React.useState(props.activityId);
  const [activityName, setActivityName] = React.useState(props.activityName);
  const [activityDate, setActivityDate] = React.useState(props.selectedDate);
  const [activityType, setActivityType] = React.useState(props.activityType);
  const [duration, setDuration] = React.useState(props.duration);
  const [distance, setDistance] = React.useState(props.distance);
  const [sufferScore, setSufferScore] = React.useState(props.sufferScore);
  const [activityNotes, setActivityNotes] = React.useState(props.activityNotes);

  const closeModal = () => {
    props.setShowAddActModal(false);
    props.setModalError(null);
  };

  // const handleEditActivity = () => {
  //   // evt.preventDefault();
  //   console.log("editActivity");

  //   fetch(`/api/${props.userId}/activities/${activityId}`, {
  //     method: "PUT",
  //     credentials: "include",
  //     body: JSON.stringify({
  //       user_id: props.userId,
  //       activity_id: activityId,
  //       activity_date: activityDate,
  //       activity_type: activityType,
  //       activity_name: activityName,
  //       duration: duration,
  //       distance: distance,
  //       suffer_score: sufferScore,
  //       activity_notes: activityNotes,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.success) {
  //         setActivityName(data.activityName);
  //         setActivityDate(data.activityDate);
  //         setActivityType(data.activityType);
  //         setDuration(data.duration);
  //         setDistance(data.distance);
  //         setSufferScore(data.sufferScore);
  //         setActivityNotes(data.activityNotes);
  //         console.log("successful edit", activityName);
  //         props.setShowModal(false);

  //         fetch(`/api/${props.userId}/activities`)
  //           .then((response) => response.json())
  //           .then((data) => {
  //             props.setActivities(data.activities);
  //           });
  //       } else {
  //         console.log("boo", data.error);
  //         props.setModalError(data.error);
  //       }
  //     });
  // };

  const handleAddActivity = (evt) => {
    evt.preventDefault();
    console.log("addActivity");
    // setActivityDate(props.selected);
    fetch(`/api/${props.userId}/activities`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        user_id: props.userId,
        activity_id: activityId,
        activity_date: activityDate,
        activity_type: activityType,
        activity_name: activityName,
        duration: duration,
        distance: distance,
        suffer_score: sufferScore,
        activity_notes: activityNotes,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(activityDate, activityName, activityType);
        if (data.success) {
          setActivityId(data.activityId);
          setActivityName(data.activityName);
          setActivityDate(data.activityDate);
          setActivityType(data.activityType);
          setDuration(data.duration);
          setDistance(data.distance);
          setSufferScore(data.sufferScore);
          setActivityNotes(data.activityNotes);
          // props.setSelectedDate(data.activityDate);

          props.setModalError(null);
          props.setShowAddActModal(false);
        } else {
          console.log("error");
          props.setModalError(data.error);
        }
      });
  };

  return (
    <div>
      <form className="add-form" onSubmit={handleAddActivity}>
        <label className="add-field" htmlFor="date">
          Activity Date
        </label>
        <input
          type="date"
          name="date"
          className="add-input"
          value={activityDate}
          onChange={(evt) => {
            props.setActivityDate(evt.currentTarget.value);
          }}
        />
        <label className="add-field" htmlFor="activity-types">
          Activity Type
        </label>
        <select
          name="activity-types"
          value={activityType}
          className="add-input"
          onChange={(evt) => setActivityType(evt.currentTarget.value)}
        >
          <option value="Null"></option>
          <option value="Run">Run</option>
          <option value="Bike">Bike</option>
          <option value="Swim">Swim</option>
          <option value="Climb">Climb</option>
          <option value="Elliptical">Elliptical</option>
          <option value="Other">Other</option>
        </select>
        <label className="add-field" htmlFor="name">
          Activity Name
        </label>
        <input
          type="text"
          name="name"
          value={activityName}
          className="add-input"
          onChange={(evt) => {
            if ({ activityName }) {
              setActivityName(evt.currentTarget.value);
            }
          }}
        />
        <label className="add-field" htmlFor="duration">
          Duration
        </label>
        <input
          type="text"
          name="duration"
          value={duration}
          placeholder="minutes"
          className="add-input"
          onChange={(evt) => {
            if ({ duration }) {
              setDuration(evt.currentTarget.value);
            }
          }}
        />
        <label className="add-field" htmlFor="distance">
          Distance
        </label>
        <input
          type="text"
          name="distance"
          value={distance}
          placeholder="miles"
          className="add-input"
          onChange={(evt) => {
            if ({ distance }) {
              setDistance(evt.currentTarget.value);
            }
          }}
        />
        <label className="add-field" htmlFor="suffer-score">
          Suffer Score
        </label>
        <select
          name="suffer-score"
          value={sufferScore}
          className="add-input"
          onChange={(evt) => setSufferScore(evt.currentTarget.value)}
        >
          <option value="NA">NA</option>
          <option value="1">1: Minimal discomfort</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5: Maximum discomfort</option>
        </select>
        <label className="add-field" htmlFor="notes">
          Notes
        </label>
        <input
          type="text"
          name="notes"
          value={activityNotes}
          className="add-period-input notes"
          onChange={(evt) => {
            if ({ activityNotes }) {
              setActivityNotes(evt.currentTarget.value);
            }
          }}
        />
        <button className="btn add-period-button" type="submit">
          Add Activity
        </button>
        <button
          className="btn inconspicuous close-add-period"
          onClick={closeModal}
        >
          Close
        </button>
      </form>
    </div>
  );
}

// function Activities(props) {
//   return (
//     <div>
//       {/* <AddActivityButton
//         editMode={props.editMode}
//         setEditMode={props.setEditMode}
//         activities={props.activities}
//         setActivities={props.setActivities}
//         modalError={props.modalError}
//         setModalError={props.setModalError}
//         userId={props.userId}
//         modalContent={props.modalContent}
//         setModalContent={props.setModalContent}
//         showModal={props.showModal}
//         setShowModal={props.setShowModal}
//         activityDate={props.activityDate}
//         setActivityDate={props.setActivityDate}
//       /> */}
//       <AllActivitiesContainer
//         editMode={props.editMode}
//         setEditMode={props.setEditMode}
//         activities={props.activities}
//         setActivities={props.setActivities}
//         userId={props.userId}
//         showModal={props.showModal}
//         setShowModal={props.setShowModal}
//         modalContent={props.modalContent}
//         setModalContent={props.setModalContent}
//         modalError={props.modalError}
//         setModalError={props.setModalError}
//       />
//     </div>
//   );
// }

function SelectedActivityContainer(props) {
  // const [activityId, setActivityId] = React.useState(null);
  const [activityName, setActivityName] = React.useState(null);
  const [activityDate, setActivityDate] = React.useState(null);
  const [activityType, setActivityType] = React.useState(null);
  const [distance, setDistance] = React.useState(null);
  const [duration, setDuration] = React.useState(null);
  const [sufferScore, setSufferScore] = React.useState(null);
  const [activityNotes, setActivityNotes] = React.useState(null);

  React.useEffect(() => {
    fetch(
      `/api/${props.userId}/activities/${localStorage.getItem(
        "selectedActivity"
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        // setActivityId(data.activityId);
        setActivityName(data.activityName);
        setActivityDate(data.activityDate);
        setActivityType(data.activityType);
        setDuration(data.duration);
        setDistance(data.distance);
        setSufferScore(data.sufferScore);
        setActivityNotes(data.activityNotes);

        console.log(props.selectedActivityId);
      });
  }, [props.selectedActivityId]);

  if (!activityName) {
    return null;
  }

  return (
    <ActivityCard
      userId={props.userId}
      key={props.selectedActivityId}
      activityId={props.selectedActivityId}
      activityName={activityName}
      setActivityName={setActivityName}
      activityDate={activityDate}
      setActivityDate={setActivityDate}
      activityType={activityType}
      setActivityType={setActivityType}
      distance={distance}
      setDistance={setDistance}
      duration={duration}
      setDuration={setDuration}
      sufferScore={sufferScore}
      setSufferScore={setSufferScore}
      activityNotes={activityNotes}
      setActivityNotes={setActivityNotes}
      showActivityModal={props.showActivityModal}
      setShowActivityModal={props.setShowActivityModal}
      modalError={props.modalError}
      setModalError={props.setModalError}
      showDeleteActModal={props.showDeleteActModal}
      setShowDeleteActModal={props.setShowDeleteActModal}
      activities={props.activities}
      setActivities={props.setActivities}
    />
  );
}

function AllActivitiesContainer(props) {
  const [pageNumber, setPageNumber] = React.useState(1);
  const [pagedActivities, setPagedActivities] = React.useState([]);

  const queryString = new URLSearchParams({ page: pageNumber }).toString();
  console.log(queryString);
  // console.log(props.userId);
  console.log(`/api/${props.userId}/activities?${queryString}`);
  React.useEffect(() => {
    fetch(`/api/${props.userId}/activities?${queryString}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.activities);
        setPagedActivities(data.activities);
      });
  }, [pageNumber]);
  // props.userId

  //   return (
  //     <ActivityModal
  //       userId={props.userId}
  //       error={props.error}
  //       setError={props.setError}
  //       modalError={props.modalError}
  //       setModalError={props.setModalError}
  //       showModal={props.showModal}
  //       setShowModal={props.setShowModal}
  //       activities={props.activiies}
  //       setActivities={props.setActivities}
  //       selectedActivityId={props.selectedActivityId}
  //       setSelectedActivityId={props.setSelectedActivityId}
  //       selectedDate={props.selectedDate}
  //     />
  //   );
  // };
  const activityDetails = [];

  for (const activity of pagedActivities) {
    const handleClick = () => {
      // evt.preventDefault();
      props.setSelectedActivityId(activity.activity_id);
      localStorage.setItem("selectedActivity", activity.activity_id);
      props.setShowActivityModal(true);
    };
    console.log(activity);
    if (activity.name) {
      activityDetails.push(
        <ActivityCard
          userId={props.userId}
          key={activity.activity_id}
          activityId={activity.activity_id}
          activityName={activity.name}
          activityDate={activity.date}
          activityType={activity.type}
          distance={activity.distance}
          duration={activity.duration}
          sufferScore={activity.suffer_score}
          activityNotes={activity.notes}
          showActivityModal={props.showActivityModal}
          setShowActivityModal={props.setShowActivityModal}
          showDeleteActModal={props.showDeleteActModal}
          setShowDeleteActModal={props.setShowDeleteActModal}
          modalError={props.modalError}
          setModalError={props.setModalError}
          activities={props.activities}
          setActivities={props.setActivities}
          handleClick={handleClick}
        />
      );
    }
  }

  return (
    <div>
      <div>{activityDetails}</div>
    </div>
  );
}

function ActivityCard(props) {
  const [activityEdit, setActivityEdit] = React.useState("non-edit");

  const handleSubmit = (evt) => {
    evt.preventDefault();

    fetch(
      `/api/${props.userId}/activities/${localStorage.getItem(
        "selectedActivity"
      )}`,
      {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({
          activity_id: localStorage.getItem("selectedActivity"),
          activity_date: props.activityDate,
          activity_name: props.activityName,
          activity_type: props.activityType,
          distance: props.distance,
          duration: props.duration,
          suffer_score: props.sufferScore,
          activity_notes: props.activityNotes,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.success);
        // console.log(data);
        if (data.success) {
          console.log("edited activity:", data);
          props.setActivityDate(data.activityDate);
          props.setActivityName(data.activityName);
          props.setActivityType(data.activityType);
          props.setDistance(data.distance);
          props.setDuration(data.duration);
          props.setSufferScore(data.sufferScore);
          props.setActivityNotes(data.activityNotes);

          // props.setActivities(data.activities);
          props.setModalError(null);
          props.setShowActivityModal(false);
          setActivityEdit("non-edit");
        } else {
          console.log(data.error);
          props.setModalError(data.error);
        }
      });
  };

  const handleDelete = (evt) => {
    evt.preventDefault();
    setActivityEdit("delete");

    const activityId = localStorage.getItem("selectedActivity");

    fetch(`/api/${props.userId}/activities/${activityId}`, {
      method: "DELETE",
      credentials: "include",
      body: JSON.stringify({
        activity_id: activityId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data.reponse);
          localStorage.setItem("selectedActivity", null);
          props.setSelectedActivityId(null);
          props.setShowDeleteActModal(false);
          props.setShowActivityModal(false);
          setActivityEdit("non-edit");
          props.setModalError(null);
        }
      });
  };

  return (
    <div>
      {activityEdit === "delete" && (
        <DeleteActivity
          handleDelete={handleDelete}
          setActivityEdit={setActivityEdit}
          showDeleteActModal={props.showDeleteActModal}
          setShowDeleteActModal={props.setShowDeleteActModal}
        />
      )}
      {activityEdit === "edit" && (
        <EditActivity
          handleSubmit={handleSubmit}
          setActivityEdit={setActivityEdit}
          userId={props.userId}
        >
          <ActivityDate
            setActivityDate={props.setActivityDate}
            activityDate={props.activityDate}
          />
          <ActivityType
            setActivityType={props.setActivityType}
            activityType={props.activityType}
          />
          <ActivityName
            setActivityName={props.setActivityName}
            activityName={props.activityName}
          />
          <ActivityDuration
            setDuration={props.setDuration}
            duration={props.duration}
          />
          <ActivityDistance
            setDistance={props.setDistance}
            distance={props.distance}
          />
          <SufferScore
            setSufferScore={props.setSufferScore}
            sufferScore={props.sufferScore}
          />
          <ActivityNotes
            setActivityNotes={props.setActivityNotes}
            activityNotes={props.activityNotes}
          />
        </EditActivity>
      )}
      {activityEdit === "non-edit" && (
        <ActivityForm
          userId={props.userId}
          error={props.error}
          setError={props.setError}
          modalError={props.modalError}
          setModalError={props.setModalError}
          showActivityModal={props.showActivityModal}
          setShowActivityModal={props.setShowActivityModal}
          showDeleteActModal={props.showDeleteActModal}
          setShowDeleteActModal={props.setShowDeleteActModal}
          activities={props.activities}
          setActivities={props.setActivities}
          selectedActivityId={props.selectedActivityId}
          setSelectedActivityId={props.setSelectedActivityId}
          // activityId={localStorage.getItem("selectedActivity")}
          activityName={props.activityName}
          activityDate={props.activityDate}
          activityType={props.activityType}
          duration={props.duration}
          distance={props.distance}
          sufferScore={props.sufferScore}
          activityNotes={props.activityNotes}
          onClose={props.closeModal}
          activityEdit={activityEdit}
          setActivityEdit={setActivityEdit}
          selectedDate={props.selectedDate}
          setSelectedDate={props.setSelectedDate}
          handleClick={props.handleClick}
        />
      )}
    </div>
  );
}

function ActivityType(props) {
  return (
    <div className="field">
      Activity Type
      <select
        id="act-type"
        value={props.activityType}
        onChange={(evt) => props.setActivityType(evt.currentTarget.value)}
      >
        <option value="Null"></option>
        <option value="Run">Run</option>
        <option value="Bike">Bike</option>
        <option value="Swim">Swim</option>
        <option value="Climb">Climb</option>
        <option value="Elliptical">Elliptical</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
}

function ActivityDate(props) {
  return (
    <div className="field">
      <label htmlFor="act-date">Date: </label>
      <input
        id="act-date"
        type="date"
        value={props.activityDate}
        onChange={(evt) => props.setActivityDate(evt.currentTarget.value)}
      />
    </div>
  );
}

function ActivityName(props) {
  return (
    <div className="field">
      <label htmlFor="act-name">Activity Name: </label>
      <input
        id="act-name"
        type="text"
        onChange={(evt) => props.setActivityName(evt.currentTarget.value)}
        value={props.activityName}
        placeholder="Enter a name for your activity"
      />
    </div>
  );
}

function ActivityDistance(props) {
  return (
    <div className="field">
      <label htmlFor="distance">Distance: </label>
      <input
        id="distance"
        type="text"
        onChange={(evt) => props.setDistance(evt.currentTarget.value)}
        value={props.distance}
      />
    </div>
  );
}

function ActivityDuration(props) {
  return (
    <div className="field">
      <label htmlFor="duration">Duration: </label>
      <input
        id="duration"
        type="text"
        onChange={(evt) => props.setDuration(evt.currentTarget.value)}
        value={props.duration}
        placeholder="Enter activity duration"
      />
    </div>
  );
}

function SufferScore(props) {
  return (
    <div className="field">
      <label htmlFor="suffer-score">Suffer Score:</label>
      <select
        id="suffer-score"
        onChange={(evt) => props.setSufferScore(evt.currentTarget.value)}
        value={props.sufferScore}
      >
        <option value="NA">NA</option>
        <option value="1">1 (Minimal discomfort)</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5 (Maximum discomfort)</option>
      </select>
    </div>
  );
}

function ActivityNotes(props) {
  return (
    <div className="field">
      <label htmlFor="act-notes">Notes: </label>
      <textarea
        id="act-notes"
        type="text"
        onChange={(evt) => props.setActivityNotes(evt.currentTarget.value)}
        value={props.activityNotes}
        placeholder="Write notes here"
      ></textarea>
    </div>
  );
}

function EditActivity(props) {
  const closeEdit = (evt) => {
    evt.preventDefault();
    props.setActivityEdit("non-edit");
  };

  return (
    <div className="card">
      <form onSubmit={props.handleSubmit}>
        <h2>Activity</h2>
        {props.children}
        <button type="submit">Save</button>
        <button onClick={closeEdit}>Cancel</button>
      </form>
    </div>
  );
}

function DeleteActivity(props) {
  const closeEdit = (evt) => {
    evt.preventDefault();
    props.setActivityEdit("non-edit");
  };

  if (!props.showDeleteActModal) {
    return null;
  }

  return (
    <div className="card">
      <form onSubmit={props.handleDelete}>
        <h2>Are you sure you'd like to delete?</h2>
        <button type="submit">Yes</button>
        <button onClick={closeEdit}>No</button>
      </form>
    </div>
  );
}

function ActivityForm(props) {
  const handleEditClick = (evt) => {
    evt.preventDefault();

    if (props.setShowActivityModal) {
      const formEdit = props.activityEdit === "edit" ? "non-edit" : "edit";
      props.setActivityEdit(formEdit);
    } else {
      props.setShowActivityModal(true);
    }
    // return <SelectedActivityContainer />;
  };

  const handleDeleteClick = (evt) => {
    evt.preventDefault();
    const formDelete = props.activityEdit === "delete" ? "non-edit" : "delete";
    props.setActivityEdit(formDelete);
    props.setShowDeleteActModal(true);
    // return <SelectedActivityContainer />;
  };

  const closeEdit = (evt) => {
    evt.preventDefault();
    props.setShowActivityModal(false);
  };

  return (
    <div className="card">
      <button onClick={props.handleClick}>
        <p>Name: {props.activityName}</p>
        <p>Date: {props.activityDate} </p>
        <p>Type: {props.activityType}</p>
        {props.duration ? (
          <p>Duration: {props.duration} minutes</p>
        ) : (
          <p>Duration: -- </p>
        )}
        {props.distance ? (
          <p>Distance: {props.distance} miles</p>
        ) : (
          <p>Distance: -- </p>
        )}
        {props.sufferScore ? (
          <p>Suffer Score: {props.sufferScore}</p>
        ) : (
          <p>Suffer Score: -- </p>
        )}
        {props.activityNotes ? (
          <p>Notes: {props.activityNotes}</p>
        ) : (
          <p>Notes: -- </p>
        )}
        <div></div>
        {props.showActivityModal && (
          <div>
            <button className="edit" onClick={handleEditClick}>
              Edit Activity
            </button>
            <button className="delete" onClick={handleDeleteClick}>
              Delete Activity
            </button>
          </div>
        )}
        {/* <button onClick={closeEdit}>Cancel</button> */}
      </button>
    </div>
  );
}
