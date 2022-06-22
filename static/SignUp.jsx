function SignUpModal(props) {
  const history = ReactRouterDOM.useHistory();
  const authenticate = () => {
    window.location.replace(
      "https://www.strava.com/oauth/authorize?client_id=80271&response_type=code&redirect_uri=http://localhost:5001/exchange_token&approval_prompt=force&scope=profile:read_all,activity:read_all"
    );
    setShowSignUpModal(false);
  };

  if (!props.showSignUpModal) {
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

          props.setShowSignUpModal(true);
        } else {
          props.setError(data.error_msg);
        }
      });
  };

  return (
    <div>
      <h2>New User Info</h2>
      <form action="/sign-up" method="POST" onSubmit={handleSignUp}>
        <div>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(evt) => setFirstName(evt.currentTarget.value)}
          />
        </div>
        <br></br>
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
          <input
            type="text"
            value={teamName}
            onChange={(evt) => setTeamName(evt.currentTarget.value)}
          />
        </div>
        <br></br>
        <div>
          Email
          <input
            type="text"
            value={email}
            onChange={(evt) => setEmail(evt.currentTarget.value)}
          />
        </div>
        <br></br>
        <div>
          Password
          <input
            type="text"
            value={password}
            onChange={(evt) => setPassword(evt.currentTarget.value)}
          />
        </div>
        <br></br>
        <div>
          Bio
          <input
            type="text"
            value={bio}
            onChange={(evt) => setBio(evt.currentTarget.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}
