//"""Components for project"""
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
      <ProfileCard
        userId={props.userId}
        firstName={props.firstName}
        setFirstName={props.setFirstName}
        lastName={props.lastName}
        setLastName={props.setLastName}
        teamName={props.teamName}
        setTeamName={props.setTeamName}
        email={props.email}
        setEmail={props.setEmail}
        sinceDate={props.sinceDate}
      />
      <Calendar
        userId={props.userId}
        showModal={props.showModal}
        setShowModal={props.setShowModal}
        modalContent={props.modalContent}
        setModalContent={props.setModalContent}
        modalError={props.modalError}
        setModalError={props.setModalError}
        activityDate={props.activityDate}
        setActivityDate={props.setActivityDate}
        activities={props.activities}
        setActivities={props.setActivities}
        periods={props.periods}
        setPeriods={props.setPeriods}
      />

      <MyChart
        activities={props.activities}
        setActivities={props.setActivities}
        periods={props.periods}
        setPeriods={props.setPeriods}
        dataForContext={props.dataForContext}
      />
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
          // props.setUpdateContextData(true);
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
  // const [firstName, setFirstName] = React.useState(null);
  // const [lastName, setLastName] = React.useState(null);
  // const [teamName, setTeamName] = React.useState(null);
  // const [email, setEmail] = React.useState(null);
  // const [password, setPassword] = React.useState(null);
  // const [sinceDate, setSinceDate] = React.useState(null);

  // React.useEffect(() => {
  //   if (props.userId) {
  //     console.log("hi");
  //     fetch(`/users/${props.userId}/profile`)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setFirstName(data.first_name);
  //         setLastName(data.last_name);
  //         setTeamName(data.team_name);
  //         setEmail(data.email);
  //         setPassword(data.password);
  //         setSinceDate(data.member_since);
  //       });
  //   }
  // }, [props.userId]);

  return (
    <div>
      <h2>Account Information</h2>
      <br></br>
      <p>
        First Name: <strong>{props.firstName}</strong>
      </p>
      <br></br>
      <p>
        Last Name: <strong>{props.lastName}</strong>
      </p>
      <br></br>
      <p>
        Team Name: <strong>{props.teamName}</strong>
      </p>
      <br></br>
      <p>
        Email: <strong>{props.email}</strong>
      </p>
      <br></br>
      <p>
        Password: <strong>*****</strong>
      </p>
      <br></br>
      <p>
        Member Since: <strong>{props.sinceDate}</strong>
      </p>
    </div>
  );
}

function MyChart(props) {
  const chartRef = React.useRef(null);
  const [currentChart, setCurrentChart] = React.useState(null);

  // if (props.activities) {
  //   const activities = props.activities;
  //   console.log(activities);
  // }

  React.useEffect(() => {
    // if (chartRef.current && !currentChart) {
    if (props.activities) {
      // const activityData = props.activities;
      // const periodData = props.periods;
      // console.log(activityData);
      // console.log("hi");

      // [
      //   "January",
      //   "February",
      //   "March",
      //   "April",
      //   "May",
      //   "June",
      //   "July",
      //   "August",
      //   "September",
      //   "October",
      //   "November",
      //   "December",
      // ];

      const activityData = [];

      for (const activity of props.activities) {
        const actObj = {
          x: activity.date,
          y: activity.distance,
        };
        activityData.push(actObj);
      }

      const periodData = [];

      for (const period of props.periods) {
        const volume = null;
        if (period.flow === "No Flow") {
          volume = 0;
        }
        if (period.flow === "Light") {
          volume = 1;
        }
        if (period.flow === "Moderate") {
          volume = 2;
        }
        if (period.flow === "Heavy") {
          volume = 3;
        }

        const perObj = {
          x: period.date,
          y: volume,
        };
        periodData.push(perObj);
      }

      const testChart = new Chart(chartRef.current, {
        type: "line",
        data: {
          datasets: [
            {
              label: "Miles",
              data: activityData,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
            {
              label: "Flow",
              data: periodData,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        },
      });
      setCurrentChart(testChart);
    }
  }, [props.activities]);

  return <canvas id="test-chart" ref={chartRef}></canvas>;
}

function ProfileCard(props) {
  const [profilePicSrc, setProfilePicSrc] = React.useState(null);
  const [profilePic, setProfilePic] = React.useState(profilePicSrc);
  const [photoPreviewUrl, setPhotoPreviewUrl] = React.useState(
    "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"
  );
  // const [profileFirstName, setProfileFirstName] = React.useState("");
  // const [profileLastName, setProfileLastName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [active, setActive] = React.useState("profile");

  const handlePhotoUpload = (evt) => {
    evt.preventDefault();
    const reader = new FileReader();
    const photo = evt.target.files[0];
    const source = URL.createObjectURL(photo);

    reader.onloadend = () => {
      setProfilePic(photo);
      setProfilePicSrc(source);
      setPhotoPreviewUrl(reader.result);
    };
    reader.readAsDataURL(photo);
  };

  const editBio = (evt) => {
    const newBio = evt.target.value;
    setBio(newBio);
  };

  // const editFirstName = (evt) => {
  //   const fname = evt.target.value;
  //   props.setFirstName(fname);
  // };

  // const editLastName = (evt) => {
  //   const lname = evt.target.value;
  //   props.setLastName(lname);
  // };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const activeProfile = active === "edit" ? "profile" : "edit";
    setActive(activeProfile);
  };

  return (
    <div className="stats-card">
      {active === "edit" ? (
        <EditProfile
          handleSubmit={handleSubmit}
          userId={props.userId}
          firstName={props.firstName}
          setFirstName={props.setFirstName}
          lastName={props.lastName}
          setLastName={props.setLastName}
          teamName={props.teamName}
          setTeamName={props.setTeamName}
          email={props.email}
          setEmail={props.setEmail}
          sinceDate={props.sinceDate}
        >
          <PhotoUploader
            profilePicSrc={profilePicSrc}
            handlePhotoUpload={handlePhotoUpload}
          />
          <ProfileFirstName
            setFirstName={props.setFirstName}
            firstName={props.firstName}
          />
          <ProfileLastName
            // profileLastName={profileLastName}
            setLastName={props.setLastName}
            lastName={props.lastName}
          />
          <ProfileBio editBio={editBio} bio={bio} />
        </EditProfile>
      ) : (
        <ProfileForm
          handleSubmit={handleSubmit}
          profilePicSrc={profilePicSrc}
          firstName={props.firstName}
          lastName={props.lastName}
          bio={bio}
          email={props.email}
          teamName={props.teamName}
          sinceDate={props.sinceDate}
        />
      )}
    </div>
  );
}

function PhotoUploader(props) {
  return (
    <label htmlForm="photo-upload" className="file-upload">
      <div className="img-upload">
        <img for="photo-upload" src={props.profilePicSrc} />
      </div>
      <input id="photo-upload" type="file" onChange={props.handlePhotoUpload} />
    </label>
  );
}

function ProfileFirstName(props) {
  console.log(props.firstName);
  return (
    <div className="field">
      <label htmlFor="first-name">First Name: </label>
      <input
        id="first-name"
        type="text"
        onChange={props.setFirstName}
        value={props.firstName}
        placeholder="Enter your first name"
      />
    </div>
  );
}

function ProfileLastName(props) {
  return (
    <div className="field">
      <label htmlFor="last-name">Last Name: </label>
      <input
        id="last-name"
        type="text"
        onChange={props.setLastName}
        value={props.lastName}
        placeholder="Enter your last name"
      />
    </div>
  );
}

function ProfileBio(props) {
  return (
    <div className="field">
      <label htmlFor="bio">Bio: </label>
      <input
        id="bio"
        type="text"
        onChange={props.editBio}
        value={props.bio}
        placeholder="Enter a brief bio"
      />
    </div>
  );
}

function EditProfile(props) {
  return (
    <div className="profile-card">
      <form onSubmit={props.handleSubmit}>
        <h2>Profile</h2>
        {props.children}
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

function ProfileForm(props) {
  return (
    <div className="profile-card">
      <form onSubmit={props.handleSubmit}>
        <h1>Profile Card</h1>
        <label className="custom-file-upload">
          <div>
            <img for="photo-upload" src={props.profilePicSrc} />
          </div>
        </label>
        <h3 className="first-name last-name">
          {props.firstName} {props.lastName}
        </h3>
        <h6>Member since {props.sinceDate}</h6>
        <p className="bio">{props.bio}</p>
        <div className="team-name">{props.teamName}</div>
        <div className="email">{props.email}</div>
        <button type="submit" className="edit">
          Edit Profile{" "}
        </button>
      </form>
    </div>
  );
}

// const handlePhotoUpload = (evt) => {
//   const reader = new FileReader();
//   const photo = evt.target.files[0];
//   const source = URL.createObjectURL(photo);

//   reader.onloadend = () => {
//     setProfilePic(photo);
//     setProfilePicSrc(source);
//     setPhotoPreviewUrl(reader.result);
//   };
//   reader.readAsDataURL(photo);
// };

// const showPhotoPreview = () => {
//   if (profilePicSrc) {
//     return <img src={profilePicSrc} />;
//   } else {
//     return <p>No Preview</p>;
//   }
// };

//   return (
//     <div>
//       <h3>Profile Pic Uploader</h3>
//       <input type="file" onChange={handlePhotoUpload} />
//       <br></br>
//       <div>{showPhotoPreview}</div>
//       <hr />
//       <button>Upload Photo</button>
//     </div>
//   );
// }
