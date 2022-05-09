//"""Components for project"""

// GENERAL COMPONENTS

function Card(props) {
  return <div className="card">Displayed!</div>;
}

function Navbar(props) {
  const { logo, brand } = props;

  return (
    <nav>
      <ReactRouterDOM.Link
        to="/"
        className="navbar-brand d-flex justify-content-left"
      >
        <img src={logo} height="30" alt="logo" />
      </ReactRouterDOM.Link>

      <section className="d-flex justify-content-left">
        <ReactRouterDOM.NavLink
          to="/activities"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          Activities
        </ReactRouterDOM.NavLink>
        <ReactRouterDOM.NavLink
          to="/profile"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          Profile
        </ReactRouterDOM.NavLink>
        <ReactRouterDOM.NavLink
          to="/login"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          Login
        </ReactRouterDOM.NavLink>
      </section>
    </nav>
  );
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
  return <div>{props.error}</div>;
}

function Login(props) {
  //   const [userData, setUserData] = React.useState({});

  //   React.useEffect(() => {
  //     fetch("/api/user")
  //       .then((response) => response.json())
  //       .then((data) => setUserData(data));
  //   }, []);

  return (
    <div>
      <form action="/login" method="POST">
        <div>
          Email
          <input type="text" name="email" />
        </div>
        <div>
          Password
          <input type="text" name="password" />
        </div>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

function SignUp(props) {
  return (
    <div>
      <p>New User Info</p>
      <form action="/sign-up" method="POST">
        <label htmlFor="sign-up-fname">First name</label>
        <input type="text" name="sign-up-fname" />
        <br></br>
        <label htmlFor="sigh-up-lname">Last name</label>
        <input type="text" name="sign-up-lname" />
        <br></br>
        <label htmlFor="sigh-up-team">Team name</label>
        <input type="text" name="sign-up-team" />
        <br></br>
        <label htmlFor="sigh-up-email">Email</label>
        <input type="text" name="sign-up-email" />
        <br></br>
        <label htmlFor="sign-up-password">Password</label>
        <input type="text" name="sign-up-password" />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
