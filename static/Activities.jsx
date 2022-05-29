function ActivityCard(props) {
  return (
    <div className="card">
      <p>Name: {props.name}</p>
      <p>Date: {props.date} </p>
      <p>Type: {props.type}</p>
      <p>Distance: {props.distance} miles</p>
    </div>
  );
}

function AddActivityButton(props) {
  const userId = props.userId;

  if (props.showActivityForm) {
    return (
      <AddActivityForm
        userId={userId}
        activities={props.actitivies}
        setActivities={props.setActivities}
        setShowActivityForm={props.setShowActivityForm}
        setError={props.setError}
      />
    );
  }
  // const handleClick = (evt) => {
  //   evt.preventDefault();
  //   props.setShowActivityForm(true);
  // if (props.showActivityForm === false) {
  //   props.setShowActivityForm(true);
  // } else {
  //   props.setShowActivityForm(false);
  // }
  // };
  return (
    <button onClick={props.setShowActivityForm(true)}>Add Activity</button>
  );
}

function AddActivityForm(props) {
  const [activityName, setActivityName] = React.useState(null);
  const [activityDate, setActivityDate] = React.useState(null);
  const [activityType, setActivityType] = React.useState(null);
  const [duration, setDuration] = React.useState(null);
  const [distance, setDistance] = React.useState(null);
  const [sufferScore, setSufferScore] = React.useState(null);
  const [activityNotes, setActivityNotes] = React.useState(null);
  const [fromStrava, setFromStrava] = React.useState(null);

  const history = ReactRouterDOM.useHistory();

  const handleAddActivity = (evt) => {
    // console.log(evt);
    evt.preventDefault();
    const userId = props.userId;
    fetch("/api/add-activity", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        user_id: userId,
        activity_date: activityDate,
        activity_type: activityType,
        activity_name: activityName,
        duration: duration,
        distance: distance,
        suffer_score: sufferScore,
        activity_notes: activityNotes,
        from_strava: fromStrava,
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
              props.setShowActivityForm(false);
            });
        } else {
          props.setError(data.error);
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
            type="text"
            value={activityDate}
            onChange={(evt) => setActivityDate(evt.currentTarget.value)}
          />
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
  const [activities, setActivities] = React.useState([]);
  const [showActivityForm, setShowActivityForm] = React.useState(false);

  React.useEffect(() => {
    if (props.userId) {
      fetch(`/api/users/${props.userId}/activities`)
        .then((response) => response.json())
        .then((data) => setActivities(data.activities));
    }
  }, [props.userId]);

  return (
    <div>
      <ActivitiesContainer
        activities={activities}
        setActivities={setActivities}
        setError={props.setError}
        userId={props.userId}
        setShowActivityForm={setShowActivityForm}
        showActivityForm={showActivityForm}
      />
      <AddActivityButton
        activities={activities}
        setActivities={setActivities}
        setError={props.setError}
        userId={props.userId}
        setShowActivityForm={setShowActivityForm}
        showActivityForm={showActivityForm}
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
      />
    );
  }

  return (
    <div>
      <div>{activityDetails}</div>
    </div>
  );
}
