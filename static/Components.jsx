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
          to="/home"
          className="navbar-brand d-flex justify-content-left"
        >
          <img src={props.logo} height="30" alt="logo" />
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
            to="/periods"
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

function StatCard1(props) {
  return (
    <div className="profile-card">
      {props.monthlyMileage ? (
        <div>Mileage this Month: {props.monthlyMileage}</div>
      ) : (
        <div>Mileage this Month: 0</div>
      )}
    </div>
  );
}

function StatCard2(props) {
  return (
    <div className="profile-card">
      <div>Last Period: {props.lastPeriod}</div>
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
    history.push(`/${props.userId}/home`);
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
        password={props.password}
        setPassword={props.setPassword}
        profileBio={props.profileBio}
        setProfileBio={props.setProfileBio}
        sinceDate={props.sinceDate}
        showProfileModal={props.showProfileModal}
        setShowProfileModal={props.setShowProfileModal}
      />
      <ProfileModal
        userId={props.userId}
        error={props.error}
        setError={props.setError}
        modalError={props.modalError}
        setModalError={props.setModalError}
        showProfileModal={props.showProfileModal}
        setShowModal={props.setShowModal}
        firstName={props.firstName}
        setFirstName={props.setFirstName}
        lastName={props.lastName}
        setLastName={props.setLastName}
        teamName={props.teamName}
        setTeamName={props.setTeamName}
        email={props.email}
        setEmail={props.setEmail}
        password={props.password}
        setPassword={props.setPassword}
        profileBio={props.profileBio}
        setProfileBio={props.setProfileBio}
        sinceDate={props.sinceDate}
      />
      <StatCard1
        monthlyMileage={props.monthlyMileage}
        setMonthlyMileage={props.setMonthlyMileage}
      />
      <StatCard2
        lastPeriod={props.lastPeriod}
        setLastPeriod={props.setLastPeriod}
      />
      <Calendar
        userId={props.userId}
        editMode={props.editMode}
        setEditMode={props.setEditMode}
        showActivityModal={props.showActivityModal}
        setShowActivityModal={props.setShowActivityModal}
        showAddActModal={props.showAddActModal}
        setShowAddActModal={props.setShowAddActModal}
        showDeleteActModal={props.showDeleteActModal}
        setShowDeleteActModal={props.setShowDeleteActModal}
        modalError={props.modalError}
        setModalError={props.setModalError}
        activityDate={props.activityDate}
        setActivityDate={props.setActivityDate}
        activities={props.activities}
        setActivities={props.setActivities}
        periods={props.periods}
        setPeriods={props.setPeriods}
        selectedActivityId={props.selectedActivityId}
        setSelectedActivityId={props.setSelectedActivityId}
        selectedDate={props.selectedDate}
        setSelectedDate={props.setSelectedDate}
      />
      <ActivityModal
        userId={props.userId}
        error={props.error}
        setError={props.setError}
        modalError={props.modalError}
        setModalError={props.setModalError}
        showActivityModal={props.showActivityModal}
        setShowActivityModal={props.setShowActivityModal}
        activities={props.activiies}
        setActivities={props.setActivities}
        selectedActivityId={props.selectedActivityId}
        setSelectedActivityId={props.setSelectedActivityId}
      />
      <AddActivityModal
        userId={props.userId}
        error={props.error}
        setError={props.setError}
        modalError={props.modalError}
        setModalError={props.setModalError}
        showAddActModal={props.showAddActModal}
        setShowAddActModal={props.setShowAddActModal}
        activities={props.activities}
        setActivities={props.setActivities}
        selectedActivityId={props.selectedActivityId}
        setSelectedActivityId={props.setSelectedActivityId}
        selectedDate={props.selectedDate}
        setSelectedDate={props.setSelectedDate}
      />
      <MyChart
        editMode={props.editMode}
        setEditMode={props.setEditMode}
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
        Bio: <strong>{props.profileBio}</strong>
      </p>
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

  React.useEffect(() => {
    if (props.activities) {
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
  const [profilePicSrc, setProfilePicSrc] = React.useState(
    "/static/static/ProfilePicDefault.png"
  );
  const [profilePic, setProfilePic] = React.useState(profilePicSrc);
  const [photoPreviewUrl, setPhotoPreviewUrl] = React.useState(
    "https://github.com/OlgaKoplik/CodePen/blob/master/profile.jpg?raw=true"
  );

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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    fetch("/api/profile", {
      method: "PUT",
      credentials: "include",
      body: JSON.stringify({
        first_name: props.firstName,
        last_name: props.lastName,
        team_name: props.teamName,
        email: props.email,
        password: props.password,
        bio: props.profileBio,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.success);
        // console.log(data);
        if (data.success) {
          props.setFirstName(data.first_name);
          props.setLastName(data.last_name);
          props.setTeamName(data.team_name);
          props.setEmail(data.email);
          props.setPassword(data.password);
          props.setProfileBio(data.bio);
          console.log(data.bio);

          props.setShowProfileModal(false);
          const activeProfile = active === "edit" ? "profile" : "edit";
          setActive(activeProfile);
        } else {
          props.setError(data.error_msg);
        }
      });
  };

  return (
    <div>
      {active === "edit" ? (
        <EditProfile
          active={active}
          setActive={setActive}
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
          password={props.password}
          setPassword={props.setPassword}
          profileBio={props.profileBio}
          setProfileBio={props.setProfileBio}
          sinceDate={props.sinceDate}
        >
          <PhotoUploader
            profilePicSrc={profilePicSrc}
            handlePhotoUpload={handlePhotoUpload}
          />
          <ProfileEmail setEmail={props.setEmail} email={props.email} />
          <ProfilePassword
            password={props.password}
            setPassword={props.setPassword}
          />
          <ProfileFirstName
            setFirstName={props.setFirstName}
            firstName={props.firstName}
          />
          <ProfileLastName
            setLastName={props.setLastName}
            lastName={props.lastName}
          />
          <ProfileBio
            profileBio={props.profileBio}
            setProfileBio={props.setProfileBio}
          />
          <ProfileTeam
            setTeamName={props.setTeamName}
            teamName={props.teamName}
          />
        </EditProfile>
      ) : (
        <ProfileForm
          active={active}
          setActive={setActive}
          handleSubmit={handleSubmit}
          showModal={props.showModal}
          setShowModal={props.setShowModal}
          profilePicSrc={profilePicSrc}
          firstName={props.firstName}
          lastName={props.lastName}
          profileBio={props.profileBio}
          setProfileBio={props.setProfileBio}
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
    <label htmlFor="photo-upload" className="custom-file-upload fas">
      <div className="img-wrap img-upload">
        <img
          htmlFor="photo-upload"
          className="profile-pic"
          src={props.profilePicSrc}
        />
      </div>
      <input id="photo-upload" type="file" onChange={props.handlePhotoUpload} />
    </label>
  );
}

function ProfileFirstName(props) {
  return (
    <div className="field">
      <label htmlFor="first-name">First Name: </label>
      <input
        id="first-name"
        type="text"
        onChange={(evt) => props.setFirstName(evt.currentTarget.value)}
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
        onChange={(evt) => props.setLastName(evt.currentTarget.value)}
        value={props.lastName}
        placeholder="Enter your last name"
      />
    </div>
  );
}

function ProfilePassword(props) {
  return (
    <div className="field">
      <label htmlFor="password">Password: </label>
      <input
        id="password"
        type="text"
        onChange={(evt) => props.setPassword(evt.currentTarget.value)}
        value={props.password}
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
        onChange={(evt) => props.setProfileBio(evt.currentTarget.value)}
        value={props.profileBio}
        placeholder="Enter a brief bio"
      />
    </div>
  );
}

function ProfileEmail(props) {
  return (
    <div className="field">
      <label htmlFor="email">Email: </label>
      <input
        id="email"
        type="text"
        onChange={(evt) => props.setEmail(evt.currentTarget.value)}
        value={props.email}
      />
    </div>
  );
}

function ProfileTeam(props) {
  return (
    <div className="field">
      <label htmlFor="team">Team: </label>
      <input
        id="team"
        type="text"
        onChange={(evt) => props.setTeamName(evt.currentTarget.value)}
        value={props.teamName}
        placeholder="Enter your team's name"
      />
    </div>
  );
}

function EditProfile(props) {
  const closeEdit = (evt) => {
    evt.preventDefault();
    props.setActive("profile");
  };

  return (
    <div className="profile-card">
      <form onSubmit={props.handleSubmit}>
        <h2>Profile</h2>
        {props.children}
        <button type="submit">Save</button>
        <button onClick={closeEdit}>Cancel</button>
      </form>
    </div>
  );
}

function ProfileForm(props) {
  const handleEdit = (evt) => {
    evt.preventDefault();
    // props.setShowModal(true);
    const editProfile = props.active === "edit" ? "profile" : "edit";
    props.setActive(editProfile);
  };

  return (
    <div className="profile-card">
      <form onSubmit={props.handleSubmit}>
        <h1>Profile Card</h1>
        <label className="custom-file-upload fas">
          <div className="img-wrap">
            <img
              htmlFor="photo-upload"
              className="profile-img"
              src={props.profilePicSrc}
            />
          </div>
        </label>
        <h3 className="first-name last-name">
          {props.firstName} {props.lastName}
        </h3>

        <div className="email">{props.email}</div>
        <h6>Member since {props.sinceDate}</h6>
        <div className="bio">{props.profileBio}</div>
        <div className="team-name">Team: {props.teamName}</div>
        {props.active === "profile" && (
          <button onClick={handleEdit} className="edit">
            Edit Profile
          </button>
        )}
        {/* {props.active === "edit" && (
          <button type="submit" className="edit">
            Save
          </button>
        )} */}
      </form>
    </div>
  );
}
