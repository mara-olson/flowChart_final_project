function SignUpConnectModal(props) {
  const history = ReactRouterDOM.useHistory();
  const authenticate = () => {
    window.location.replace(
      "https://www.strava.com/oauth/authorize?client_id=80271&response_type=code&redirect_uri=http://flowchart-fitness.com/exchange_token&approval_prompt=force&scope=profile:read_all,activity:read_all"
    );
    setShowSignUpModal(false);
    props.setIsLoggedIn(true);
  };

  if (!props.showSignUpConnectModal) {
    return null;
  }
  return (
    <div className="strava-connect-container">
      <div className="strava-connect-card card">
        <div className="signup-success-message">
          Thank you for creating an account!
        </div>
        <div className="strava-connect-message1">
          Want to see all your activities in one place?
        </div>
        <div className="strava-connect-message2">Connect to Strava now!</div>
        <div className="modal-footer">
          {props.modalError && <p className="error">{props.modalError}</p>}
          <button className="btn connect-button red1" onClick={authenticate}>
            Connect
          </button>
          <br></br>

          <button
            className="btn no-thanks"
            onClick={() => {
              history.push(`users/${props.userId}/home`);
              setShowModal(false);
            }}
          >
            {/* <div className="no-thanks-message">No thanks!</div> */}
            {/* <br></br> */}
            Continue to homepage
          </button>
        </div>
      </div>
    </div>
  );
}

function SignUp(props) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [teamName, setTeamName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [bio, setBio] = React.useState("");
  const history = ReactRouterDOM.useHistory();

  const returnToLandingPage = (evt) => {
    evt.preventDefault();
    history.push("/");
  };

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
        bio: bio,
        // created_at: sinceDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.success);
        console.log(data);
        if (data.success) {
          props.setUserId(data.user_id);
          props.setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userId", data.user_id);
          props.setShowSignUpModal(false);
          props.setShowSignUpConnectModal(true);
        } else {
          props.setModalError(data.error_msg);
        }
      });
  };

  return (
    <div className="sign-up card">
      <h2 className="header black">Join today for free</h2>

      <div className="signup-form">
        <form
          className="content"
          action="/sign-up"
          method="POST"
          onSubmit={handleSignUp}
        >
          <div className="signup-field">
            First Name <span className="red-text">*</span>
            <br></br>
            <input
              type="text"
              className="signup-input"
              value={firstName}
              onChange={(evt) => setFirstName(evt.currentTarget.value)}
            />
          </div>

          <div className="signup-field">
            Last Name <span className="red-text">*</span>
            <br></br>
            <input
              type="text"
              className="signup-input"
              value={lastName}
              onChange={(evt) => setLastName(evt.currentTarget.value)}
            />
          </div>
          <div className="signup-field">
            Team Name
            <br></br>
            <input
              type="text"
              className="signup-input"
              value={teamName}
              onChange={(evt) => setTeamName(evt.currentTarget.value)}
            />
          </div>

          <div className="signup-field">
            Email <span className="red-text">*</span>
            <br></br>
            <input
              type="text"
              className="signup-input"
              value={email}
              onChange={(evt) => setEmail(evt.currentTarget.value)}
            />
          </div>
          <div className="signup-field">
            Password <span className="red-text">*</span>
            <br></br>
            <input
              type="text"
              className="signup-input"
              value={password}
              onChange={(evt) => setPassword(evt.currentTarget.value)}
            />
          </div>

          <div className="signup-field">
            Bio
            <br></br>
            <textarea
              className="signup-input bio"
              value={bio}
              onChange={(evt) => setBio(evt.currentTarget.value)}
            />
          </div>
          <div className="signup-modal-footer">
            {props.modalError && <p className="error">{props.modalError}</p>}
            <button type="submit" className="btn btn-primary red1">
              Sign Up
            </button>
            <br></br>
            <button className="btn inconspicuous" onClick={returnToLandingPage}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
    // </div>
  );
}
