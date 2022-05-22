//"""Components for project"""

// const { useEffect } = require("react");

// GENERAL COMPONENTS

function Logout(props) {
  const history = ReactRouterDOM.useHistory();
  const handleLogout = (evt) => {
    // console.log(evt);
    evt.preventDefault();
    props.setUserId(null);
    props.setIsLoggedIn(false);
    localStorage.setItem("userId", null);
    localStorage.setItem("isLoggedIn", false);
    history.push("/");
  };

  return <button onClick={handleLogout}>Logout</button>;
}

function Navbar(props) {
  if (!props.isLoggedIn) {
    return (
      <nav>
        <ReactRouterDOM.Link
          to="/"
          className="navbar-brand d-flex justify-content-left"
        >
          <img src={props.logo} height="30" alt="logo" />
        </ReactRouterDOM.Link>
        <ReactRouterDOM.NavLink
          to="/login"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          Login
        </ReactRouterDOM.NavLink>
      </nav>
    );
  }
  if (props.isLoggedIn) {
    return (
      <nav>
        <ReactRouterDOM.Link
          to={`users/home`}
          className="navbar-brand d-flex justify-content-left"
        >
          <img src={props.logo} height="30" alt="logo" />
        </ReactRouterDOM.Link>

        <section className="d-flex justify-content-left">
          <ReactRouterDOM.NavLink
            to={`/users/${props.userId}/activities`}
            activeClassName="navlink-active"
            className="nav-link nav-item"
          >
            Activities
          </ReactRouterDOM.NavLink>
          <ReactRouterDOM.NavLink
            to={`/users/${props.userId}/profile`}
            activeClassName="navlink-active"
            className="nav-link nav-item"
          >
            Profile
          </ReactRouterDOM.NavLink>
          <ReactRouterDOM.NavLink
            to={`/users/${props.userId}/periods`}
            activeClassName="navlink-active"
            className="nav-link nav-item"
          >
            Periods
          </ReactRouterDOM.NavLink>
          <Logout
            // logout={logout}
            className="justify-content-right"
            setUserId={props.setUserId}
            // isLoggedIn={isLoggedIn}
            setIsLoggedIn={props.setIsLoggedIn}
          />
        </section>
      </nav>
    );
  }
}

// LANDING PAGE COMPONENT
function LandingPage(props) {
  const landingMessage1 =
    "Your training periods & menstrual periods don’t happen in isolation.";
  const landingMessage2 = "Finally there is a tracking system for both.";

  const history = ReactRouterDOM.useHistory();

  if (localStorage.getItem("isLoggedIn") == true) {
    history.push("users/home");
  } else {
    return (
      <div>
        <section
          id="landing-message1"
          className="d-flex justify-content-center"
        >
          <p>{landingMessage1}</p>
        </section>
        <section
          id="landing-message1"
          className="d-flex justify-content-center"
        >
          <p>
            <strong>{landingMessage2}</strong>
          </p>
        </section>

        <form
          action="/sign-up"
          id="sign-up"
          className="d-flex justify-content-center"
        >
          <button type="submit" id="sign-up_button">
            Sign Up
          </button>
        </form>
      </div>
    );
  }
}

// HOMEPAGE AFTER LOGIN COMPONENT
function Home(props) {
  return (
    <div>
      <p>Welcome, {props.userId}!</p>
      {/* <ActivitiesContainer /> */}
    </div>
  );
}

function Login(props) {
  // form updates state of Login component, submit makes request to backend, retrieve response, use response to update state of App component
  // Any child component can use user_id

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = ReactRouterDOM.useHistory();

  const handleLogin = (evt) => {
    // console.log(evt);
    evt.preventDefault();

    fetch("/api/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data", data);
        if (data.success) {
          console.log(data.user_id);
          console.log("user_id", data.user_id);

          props.setUserId(data.user_id);

          props.setIsLoggedIn(true);

          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userId", data.user_id);

          window.location.replace(
            "https://www.strava.com/oauth/authorize?client_id=80271&response_type=code&redirect_uri=http://localhost:5001/exchange_token&approval_prompt=force&scope=profile:read_all,activity:read_all"
          );
        } else {
          props.setError(data.error);
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Email
          <input
            type="text"
            value={email}
            onChange={(evt) => setEmail(evt.currentTarget.value)}
          />
        </div>
        <div>
          Password
          <input
            type="text"
            value={password}
            onChange={(evt) => setPassword(evt.currentTarget.value)}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

// function Authorize(props) {
//   // Verify that the user has gone through Strava's OAuth and return them to their homepage.

//   // const handleAuthorization = (evt) => {
//   // evt.preventDefault();
//   fetch("/exchange_token")
//     .then((response) => response.json())
//     .then((data) => {
//       props.setIsLoggedIn(true);
//       localStorage.setItem("isLoggedIn", true);
//       const error = data.error;
//       history.push(`users/${props.userId}/home`);
//     });
//   // };
//   if (isLoggedIn) {
//     return <Home userId={props.userId} />;
//   } else {
//     return <p>{error}</p>;
//   }
// }

function SignUp(props) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [teamName, setTeamName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const history = ReactRouterDOM.useHistory();

  const handleSignUp = (evt) => {
    // console.log(evt);
    evt.preventDefault();

    fetch("/api/sign-up", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        team_name: teamName,
        email: email,
        password: password,
        // created_at: sinceDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.success);
        if (data.success) {
          props.setUserId(data.user_id);
          history.push(`users/home`);
        } else {
          props.setError(data.error_msg);
        }
      });
  };

  return (
    <div>
      <h2>New User Info</h2>
      <form action="/sign-up" method="POST" onSubmit={handleSignUp}>
        {/* <label htmlFor="sign-up-fname">First name</label> */}
        <div>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(evt) => setFirstName(evt.currentTarget.value)}
          />
        </div>
        <br></br>
        {/* <label htmlFor="sign-up-lname">Last name</label> */}
        <div>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(evt) => setLastName(evt.currentTarget.value)}
          />
        </div>
        <br></br>
        <div>
          Team Name
          {/* <label htmlFor="sign-up-team">Team name</label> */}
          <input
            type="text"
            value={teamName}
            onChange={(evt) => setTeamName(evt.currentTarget.value)}
          />
        </div>
        <br></br>
        {/* <label htmlFor="sign-up-email">Email</label> */}
        <div>
          Email
          <input
            type="text"
            value={email}
            onChange={(evt) => setEmail(evt.currentTarget.value)}
          />
        </div>
        <br></br>

        {/* <label htmlFor="sign-up-password">Password</label> */}
        <div>
          Password
          <input
            type="text"
            value={password}
            onChange={(evt) => setPassword(evt.currentTarget.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

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
  // const [activities, setActivities] = React.useState([]);
  const { activities, setActivities } = props;

  const [stravaActivities, setStravaActivities] = React.useState([]);

  // NOTE: fetch here the activity data
  // Review further study of second react lab
  React.useEffect(() => {
    fetch(`/api/users/${props.userId}/activities`)
      .then((response) => response.json())
      .then((data) => setActivities(data.activities));
  }, []);

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

  // React.useEffect(() => {
  //   fetch("https://www.strava.com/api/v3/athlete/activities")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }, []);

  return (
    <div>
      <div>{activityDetails}</div>
    </div>
  );
}

function Profile(props) {
  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [teamName, setTeamName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [sinceDate, setSinceDate] = React.useState(null);

  React.useEffect(() => {
    fetch(`/users/${props.userId}/profile`)
      .then((response) => response.json())
      .then((data) => {
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setTeamName(data.team_name);
        setEmail(data.email);
        setPassword(data.password);
        setSinceDate(data.member_since);
      });
  }, []);

  return (
    <div>
      <h2>Account Information</h2>
      <br></br>
      <p>
        First Name: <strong>{firstName}</strong>
      </p>
      <br></br>
      <p>
        Last Name: <strong>{lastName}</strong>
      </p>
      <br></br>
      <p>
        Team Name: <strong>{teamName}</strong>
      </p>
      <br></br>
      <p>
        Email: <strong>{email}</strong>
      </p>
      <br></br>
      <p>
        Password: <strong>*****</strong>
      </p>
      <br></br>
      <p>
        Member Since: <strong>{sinceDate}</strong>
      </p>
    </div>
  );
}

function Periods(props) {
  const [periods, setPeriods] = React.useState([]);

  // const userId = props.userId;

  React.useEffect(() => {
    fetch(`/api/users/${props.userId}/periods`)
      .then((response) => response.json())
      .then((data) => setPeriods(data.periods));
  }, []);

  const periodDetails = [];

  console.log(periods);

  for (const period of periods) {
    // if (period.flow_volume == 0) {
    //   period.flow_volume = "None";
    // } else if (period.flow_volume == 1) {
    //   period.flow_volume = "Light";
    // } else if (period.flow_volume == 2) {
    //   period.flow_volume = "Moderate";
    // } else if (period.flow_volume == 3) {
    //   period.flow_volume = "Heavy";
    // }
    periodDetails.push(
      <PeriodCard
        key={period.mense_id}
        volume={period.flow_volume}
        date={period.created_at}
        mood={period.mood}
      />
    );
  }
  return (
    <div>
      <div>{periodDetails}</div>
    </div>
  );
}

function PeriodCard(props) {
  return (
    <div className="card">
      <p>Name: {props.volume}</p>
      <p>Mood: {props.mood}</p>
      <p>Date: {props.date}</p>
    </div>
  );
}

function PeriodForm(props) {
  const [flowVolume, setFlowVolume] = React.useState(null);

  const [mood, setMood] = React.useState(false);

  const [cramps, setCramps] = React.useState(false);

  const [bloating, setBloating] = React.useState(false);

  const [fatigue, setFatigue] = React.useState(false);

  const [notes, setNotes] = React.useState(null);

  const handleAddPeriod = (evt) => {
    // console.log(evt);
    evt.preventDefault();

    const userId = props.userId;

    fetch("/api/add-period", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        user_id: userId,
        flow_volume: flowVolume,
        mood: mood,
        cramps: cramps,
        bloating: bloating,
        fatigue: fatigue,
        notes: notes,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // if (data.success) {
        console.log(data.flow_volume);
        // } else {
        // console.log("error");
        // props.setError(data.error);
      });
  };
  return (
    <div>
      <form id="period-form" onSubmit={handleAddPeriod}>
        <fieldset name="flow-form" id="period-form" disabled={false}>
          <legend>What's your flow?</legend>
          <select
            name="flow-volume"
            onChange={(evt) => setFlowVolume(evt.currentTarget.value)}
          >
            <option value="No Flow">No Flow</option>
            <option value="Light">Light</option>
            <option value="Moderate">Moderate</option>
            <option value="Heavy">Heavy</option>
          </select>
        </fieldset>
        <br></br>
        <fieldset name="sx-form" id="period-form" disabled={false}>
          <legend>What symptoms are you experiencing?</legend>
          <input
            type="checkbox"
            name="mood"
            onChange={(evt) => setMood(evt.currentTarget.checked)}
          />
          <label htmlFor="mood">Moodiness</label>
          <br></br>

          <input
            type="checkbox"
            name="cramps"
            onChange={(evt) => setCramps(evt.currentTarget.checked)}
          />
          <label htmlFor="cramps">Cramps</label>
          <br></br>

          <input
            type="checkbox"
            name="bloating"
            onChange={(evt) => setBloating(evt.currentTarget.checked)}
          />
          <label htmlFor="bloating">Bloating</label>
          <br></br>

          <input
            type="checkbox"
            name="fatigue"
            onChange={(evt) => setFatigue(evt.currentTarget.checked)}
          />
          <label htmlFor="fatigue">Fatigue</label>
        </fieldset>
        <br></br>

        <label htmlFor="notes">Notes</label>
        <br></br>
        <textarea
          id="notes"
          name="periodNotes"
          onChange={(evt) => setNotes(evt.currentTarget.value)}
        />
        <br></br>
        <button type="submit">Add Period</button>
      </form>
    </div>
  );
}
