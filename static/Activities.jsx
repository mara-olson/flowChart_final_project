function ActivityCard(props) {
  const handleClick = (evt) => {
    evt.preventDefault();
    // props.setSelectedDay(evt.);

    props.setModalContent(
      <AddActivityForm
        formTitle="Edit Activity"
        buttonTitle="Save Activity"
        // activityDate={props.activityDate}
        // setActivityDate={props.setActivityDate}
      />
    );
    props.setShowModal(true);
  };

  return (
    <div className="card" onClick={handleClick}>
      <p>Name: {props.name}</p>
      <p>Date: {props.date} </p>
      <p>Type: {props.type}</p>
      <p>Distance: {props.distance} miles</p>
    </div>
  );
}

function AddActivityButton(props) {
  const userId = props.userId;

  // if (props.showActivityForm)
  const handleClick = (evt) => {
    evt.preventDefault();
    props.setShowModal(true);
    props.setModalContent(
      <AddActivityForm
        userId={userId}
        activities={props.actitivies}
        setActivities={props.setActivities}
        // setShowActivityForm={props.setShowActivityForm}
        setModalError={props.setModalError}
        setModalContent={props.setModalContent}
        setShowModal={props.setShowModal}
        // activityDate={props.activityDate}
        // setActivityDate={props.setActivityDate}
      />
    );
    return <Modal />;
  };
  return <button onClick={handleClick}>Add Activity</button>;
}

function AddActivityForm(props) {
  // const [activityId, setActivityId] = React.useState(null);
  const [activityName, setActivityName] = React.useState(null);
  const [activityDate, setActivityDate] = React.useState(props.selectedDate);
  const [activityType, setActivityType] = React.useState(null);
  const [duration, setDuration] = React.useState(null);
  const [distance, setDistance] = React.useState(null);
  const [sufferScore, setSufferScore] = React.useState(null);
  const [activityNotes, setActivityNotes] = React.useState(null);

  const handleAddActivity = (evt) => {
    // console.log(evt);
    evt.preventDefault();
    const userId = props.userId;
    fetch("/api/add-activity", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        user_id: userId,
        // activity_id: activityId,
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
        if (data.success) {
          fetch(`/api/users/${props.userId}/activities`)
            .then((response) => response.json())
            .then((data) => {
              props.setActivities(data.activities);
              console.log(data.actitivies);
              props.setShowModal(false);
            });
        } else {
          props.setModalError(data.error);
        }
      });
  };

  return (
    <div>
      <h2>New Activity</h2>
      <form onSubmit={handleAddActivity}>
        <div>
          Activity Date
          <input
            type="date"
            name="date"
            value={activityDate}
            onChange={(evt) => setActivityDate(evt.currentTarget.value)}
          />{" "}
        </div>
        <br></br>
        <div>
          Activity Type
          <select
            name="activity-types"
            onChange={(evt) => setActivityType(evt.currentTarget.value)}
          >
            <option value="Run">Run</option>
            <option value="Bike">Bike</option>
            <option value="Swim">Swim</option>
            <option value="Climb">Climb</option>
            <option value="Elliptical">Elliptical</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <br></br>
        <div>
          Activity Name
          <input
            type="text"
            value={activityName}
            onChange={(evt) => {
              if ({ activityName }) {
                setActivityName(evt.currentTarget.value);
              }
            }}
          />
        </div>
        <br></br>
        <div>
          Duration
          <input
            type="text"
            value={duration}
            onChange={(evt) => {
              if ({ duration }) {
                setDuration(evt.currentTarget.value);
              }
            }}
          />
        </div>
        <br></br>
        <div>
          Distance
          <input
            type="text"
            value={distance}
            onChange={(evt) => {
              if ({ distance }) {
                setDistance(evt.currentTarget.value);
              }
            }}
          />
        </div>
        <div>
          Suffer Score
          <select
            name="suffer-score"
            onChange={(evt) => setSufferScore(evt.currentTarget.value)}
          >
            <option value="NA">NA</option>
            <option value="1">1, minimal discomfort</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5, maximum discomfort</option>
          </select>
        </div>
        <div>
          Notes
          <input
            type="text"
            value={activityNotes}
            onChange={(evt) => {
              if ({ activityNotes }) {
                setActivityNotes(evt.currentTarget.value);
              }
            }}
          />
        </div>
        <button type="submit">Add Activity</button>
      </form>
    </div>
  );
}

function Activities(props) {
  return (
    <div>
      <AddActivityButton
        activities={props.activities}
        setActivities={props.setActivities}
        setModalError={props.setModalError}
        userId={props.userId}
        setModalContent={props.setModalContent}
        setShowModal={props.setShowModal}
        activityDate={props.activityDate}
        setActivityDate={props.setActivityDate}
      />
      <ActivitiesContainer
        activities={props.activities}
        setActivities={props.setActivities}
        setModalError={props.setModalError}
        userId={props.userId}
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        setModalContent={props.setModalContent}
        activityDate={props.activityDate}
        setActivityDate={props.setActivityDate}
      />
    </div>
  );
}

function ActivitiesContainer(props) {
  const { activities, setActivities } = props;

  const activityDetails = [];

  for (const activity of activities) {
    activityDetails.push(
      <ActivityCard
        key={activity.id}
        name={activity.name}
        date={activity.date}
        distance={activity.distance}
        type={activity.type}
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        setModalContent={props.setModalContent}
        activityDate={props.activityDate}
        setActivityDate={props.setActivityDate}
      />
    );
  }

  return (
    <div>
      <div>{activityDetails}</div>
    </div>
  );
}
