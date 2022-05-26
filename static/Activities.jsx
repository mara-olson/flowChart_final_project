function ActivityCard(props) {
  return (
    <div className="card">
      <p>Name: {props.name}</p>
      <p>Type: {props.type}</p>
      <p>Date: {props.date}</p>
    </div>
  );
}

function AddActivityButton(props) {
  const [showActivityForm, setShowActivityForm] = React.useState(false);
  const userId = props.userId;
  if (showActivityForm) {
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
  const handleClick = (evt) => {
    evt.preventDefault();
    if (showActivityForm === false) {
      setShowActivityForm(true);
    } else {
      setShowActivityForm(false);
    }
  };
  return <button onClick={handleClick}>Add Activity</button>;
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
          console.log(data.error);
          // history.push(`/users/${props.userId}/activities`);
          // props.setActivities([...activities, data.new_activity]);
        } else {
          props.setError(data.error);
        }

        // props.setShowActivityForm(true);
        // history.push(`/users/${props.userId}/activities`);
      });
  };
  return (
    <div>
      <h2>New Activity</h2>
      <form onSubmit={handleAddActivity}>
        {/* <label htmlFor="sign-up-fname">First name</label> */}
        <div>
          Activity Date
          <input
            type="text"
            value={activityDate}
            onChange={(evt) => setActivityDate(evt.currentTarget.value)}
          />
        </div>
        <br></br>
        {/* <label htmlFor="sign-up-lname">Last name</label> */}
        <div>
          Activity Type
          <select
            name="activity-types"
            onChange={(evt) => setActivityType(evt.currentTarget.value)}
          >
            <option value="run">Run</option>
            <option value="bike">Bike</option>
            <option value="swim">Swim</option>
            <option value="climb">Climb</option>
            <option value="elliptical">Elliptical</option>
            <option value="other">Other</option>
          </select>
        </div>
        <br></br>
        <div>
          Activity Name
          {/* <label htmlFor="sign-up-team">Team name</label> */}
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
        {/* <label htmlFor="sign-up-email">Email</label> */}
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

        {/* <label htmlFor="sign-up-password">Password</label> */}
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

  return (
    <div>
      <ActivitiesContainer
        activities={activities}
        setActivities={setActivities}
        setError={props.setError}
        userId={props.userId}
      />
      <AddActivityButton
        activities={activities}
        setActivities={setActivities}
        setError={props.setError}
        userId={props.userId}
      />
    </div>
  );
}

function ActivitiesContainer(props) {
  const { activities, setActivities } = props;

  const [stravaActivities, setStravaActivities] = React.useState([]);

  React.useEffect(() => {
    if (props.userId) {
      fetch(`/api/users/${props.userId}/activities`)
        .then((response) => response.json())
        .then((data) => setActivities(data.activities));
    }
  }, [props.userId]);

  const activityDetails = [];

  console.log(activities);

  for (const activity of activities) {
    activityDetails.push(
      <ActivityCard
        key={activity.activity_id}
        name={activity.activity_name}
        date={activity.activity_date}
        type={activity.activity_type}
      />
    );
  }

  return (
    <div>
      <div>{activityDetails}</div>
    </div>
  );
}
