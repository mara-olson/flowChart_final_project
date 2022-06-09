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
          to="/users/home"
          className="navbar-brand d-flex justify-content-left"
        >
          <img src={props.logo} height="30" alt="logo" />
        </ReactRouterDOM.Link>

        <section className="d-flex justify-content-left">
          <ReactRouterDOM.NavLink
            to={`/users/activities`}
            activeClassName="navlink-active"
            className="nav-link nav-item"
          >
            Activities
          </ReactRouterDOM.NavLink>
          <ReactRouterDOM.NavLink
            to="/users/profile"
            activeClassName="navlink-active"
            className="nav-link nav-item"
          >
            Profile
          </ReactRouterDOM.NavLink>
          <ReactRouterDOM.NavLink
            to="/users/periods"
            activeClassName="navlink-active"
            className="nav-link nav-item"
          >
            Periods
          </ReactRouterDOM.NavLink>
          <Logout
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

function Modal(props) {
  if (!props.showModal) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        {props.modalContent}
        <div className="modal-footer">
          {props.modalError && <p className="error">{props.modalError}</p>}
          <button className="modal-button" onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
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
      {/* <Modal
        onClose={() => setShowModal(false)}
        showModal={showModal}
        modalTitle={modalTitle}
      /> */}
      <Calendar
        userId={props.userId}
        setShowModal={props.setShowModal}
        setModalContent={props.setModalContent}
        activityDate={props.activityDate}
        setActivityDate={props.setActivityDate}
      />
      {/* <p>Welcome, {props.userId}!</p> */}
      {/* <ActivitiesContainer /> */}
    </div>
  );
}

function Login(props) {
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

function Profile(props) {
  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [teamName, setTeamName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [sinceDate, setSinceDate] = React.useState(null);

  React.useEffect(() => {
    if (props.userId) {
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
    }
  }, [props.userId]);

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
