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
    console.log(props.isLoggedIn);
    console.log(props.userId);
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
          to={`/users/${props.userId}/home`}
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
  const landingMessage2 = "Finally there’s a tracking system for both.";

  return (
    <div>
      <section id="landing-message1" className="d-flex justify-content-center">
        <p>{landingMessage1}</p>
      </section>
      <section id="landing-message1" className="d-flex justify-content-center">
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

// HOMEPAGE AFTER LOGIN COMPONENT
function Home(props) {
  // const [userInfo, setUserInfo] = React.useState(null);

  // React.useEffect(() => {
  //   fetch(`/users/${props.userId}/home`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUserInfo(data);
  //       console.log(userInfo);
  //     });
  // });

  return <p>Welcome, {props.userId}!</p>;
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
    props.setIsLoggedIn(true);
    fetch("/login", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          props.setUserId(data.user_id);
          history.push(`/users/${data.user_id}/home`);
        }
      });
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        {/* <p className="error">{props.error}</p> */}
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

    fetch("/sign-up", {
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
          history.push(`/users/${data.user_id}/home`);
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
      <p>Date: {props.date}</p>
    </div>
  );
}

function ActivitiesContainer(props) {
  const [activities, setActivities] = React.useState([]);

  console.log(props.userId);

  // NOTE: fetch here the activity data
  // Review further study of second react lab
  React.useEffect(() => {
    fetch(`/users/${props.userId}/activities`)
      .then((response) => response.json())
      .then((data) => setActivities(data.activities));
  }, []);

  const activityDetails = [];

  // console.log(activities);

  for (const activity of activities) {
    activityDetails.push(
      <ActivityCard
        key={activity.activity_id}
        name={activity.activity_name}
        date={activity.activity_date}
      />
    );
  }

  return <div>{activityDetails}</div>;
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
        console.log(data);
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
