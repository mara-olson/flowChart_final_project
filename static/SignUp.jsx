function SignUpConnectModal(props) {
  const history = ReactRouterDOM.useHistory();
  const authenticate = () => {
    window.location.replace(
      "https://www.strava.com/oauth/authorize?client_id=80271&response_type=code&redirect_uri=http://localhost:5001/exchange_token&approval_prompt=force&scope=profile:read_all,activity:read_all"
    );
    setShowSignUpModal(false);
  };

  if (!props.showSignUpConnectModal) {
    return null;
  }
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Thank you for creating an account!</h2>
        <h3>Would you like to connect to Strava?</h3>
        <div className="modal-footer">
          {props.modalError && <p className="error">{props.modalError}</p>}
          <button className="modal-button" onClick={authenticate}>
            Yes
          </button>
          <button
            className="modal-button"
            onClick={() => {
              history.push(`users/${props.userId}/home`);
              setShowModal(false);
            }}
          >
            No
          </button>
          <button className="modal-button" onClick={props.onClose}>
            Close
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
          props.setShowSignUpConnectModal(true);
        } else {
          props.setModalError(data.error_msg);
        }
      });
  };

  return (
    <div className="sign-up card">
      <div className="row">
        <div className="col-12">
          <h2 className="header black">Join today for free</h2>
        </div>
      </div>
      <div className="row">
        <form
          className="content"
          action="/sign-up"
          method="POST"
          onSubmit={handleSignUp}
        >
          <div className="field">
            First Name <span className="red-text">*</span>
            <input
              type="text"
              value={firstName}
              onChange={(evt) => setFirstName(evt.currentTarget.value)}
            />
          </div>

          <div className="field">
            Last Name <span className="red-text">*</span>
            <input
              type="text"
              value={lastName}
              onChange={(evt) => setLastName(evt.currentTarget.value)}
            />
          </div>
          <div className="field">
            Team Name
            <input
              type="text"
              value={teamName}
              onChange={(evt) => setTeamName(evt.currentTarget.value)}
            />
          </div>

          <div className="field">
            Email <span className="red-text">*</span>
            <input
              type="text"
              value={email}
              onChange={(evt) => setEmail(evt.currentTarget.value)}
            />
          </div>
          <div className="field">
            Password <span className="red-text">*</span>
            <input
              type="text"
              value={password}
              onChange={(evt) => setPassword(evt.currentTarget.value)}
            />
          </div>

          <div className="field">
            Bio
            <input
              type="text"
              value={bio}
              onChange={(evt) => setBio(evt.currentTarget.value)}
            />
          </div>
          <div className="modal-footer">
            {props.modalError && <p className="error">{props.modalError}</p>}
          </div>
          <button type="submit" className="btn sign-up-button red1">
            Sign Up
          </button>
          <button className="btn inconspicuous" onClick={props.onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
