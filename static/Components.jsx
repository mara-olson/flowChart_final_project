//"""Components for project"""

// GENERAL COMPONENTS

function Card(props) {
  return <div className="card">Displayed!</div>;
}

function Navbar(props) {
  const { logo, brand } = props;

  //   const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  //   authenticate(user_id) {
  //       if {
  //           user_id in
  //   }

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
  const landingMessage =
    "Your training periods & menstrual periods don’t happen in isolation.";

  return (
    <div>
      <section id="landing-message" className="d-flex justify-content-center">
        {landingMessage}
      </section>
      <form action="/sign-up" id="sign-up">
        <button type="submit" id="sign-up_button">
          Sign Up
        </button>
      </form>
    </div>
  );
}
