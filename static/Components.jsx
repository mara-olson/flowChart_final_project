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

  if (!props.isLoggedIn) {
    return (
      <nav className="navbar my-navbar">
        {/* <div className="row"> */}
        {/* <nav> */}
        <div>
          <ReactRouterDOM.Link
            to="/"
            className="navbar-brand d-flex justify-content-left"
          >
            <a className="navbar-brand add-pad nav-link flow-font" href="/home">
              flow<span className="poppins-font">chart</span>
              <span className="red-letter">.</span>
            </a>
            {/* <img src={props.logo} height="30" alt="logo" /> */}
          </ReactRouterDOM.Link>
        </div>
        <ReactRouterDOM.NavLink
          to="/login"
          activeClassName="navlink-active"
          className="btn btn-secondary grey1 border-0"
        >
          Login
        </ReactRouterDOM.NavLink>
        {/* </nav>
        </div> */}
      </nav>
    );
  }
  if (props.isLoggedIn) {
    return (
      // <div className="container-fluid">
      // <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <nav className="navbar my-navbar navbar-expand-md align-items-bottom">
        {/* <div className="container-fluid "> */}
        <a className="navbar-brand add-pad nav-link flow-font" href="/home">
          flow<span className="poppins-font">chart</span>
          <span className="red-letter">.</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target=".dual-nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse dual-nav">
          <ul className="navbar-nav">
            {/* <li> */}
            {/* <a className="navbar-brand add-pad nav-link" href="/home">
                  floChart<span className="red-letter">.</span>
                </a> */}
            {/* </li> */}
            <li>
              <a className="nav-link" href="/activities">
                Training Periods<span className="sr-only"></span>
              </a>
            </li>
            <li>
              <a className="nav-link" href="/periods">
                Menstrual Periods
              </a>
            </li>
            <li className="dropdown">
              <button className="dropdown-btn">
                <i className="bi bi-person-circle profile-icon"></i>
              </button>
              <div className="dropdown-content">
                <a className="dropdown-item" href="/profile">
                  Profile
                </a>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </li>
          </ul>

          {/* <div className="dropdown">
            <button className="dropdown-btn">
              <i className="bi bi-person-circle profile-icon"></i>
            </button>
            <div className="dropdown-content">
              <a className="dropdown-item" href="/profile">
                Profile
              </a>
              <button className="dropdown-item" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div> */}

          {/* <div className="nav-item position-navbar dropdown">
            <button className="dropbtn">
              <i className="bi bi-person-circle profile-icon"></i>
            </button>
            <div className="dropdown-content">
              <a className="dropdown-item" href="/activities">
                Action
              </a>
              <a className="dropdown-item">Another action</a>
              <a className="dropdown-item">Something else here</a>
              <Logout
                className="justify-content-right"
                setUserId={props.setUserId}
                // isLoggedIn={isLoggedIn}
                setIsLoggedIn={props.setIsLoggedIn}
              />
            </div>
          </div> */}

          {/* </div> */}
          {/* </div> */}
        </div>
      </nav>
      // </div>
      // <nav className="navbar navbar-expand-lg navbar-light bg-light">
      //   <div className="container-fluid">
      //     <button
      //       className="navbar-toggler"
      //       type="button"
      //       data-toggle="collapse"
      //       data-target="#navbarSupportedContent"
      //       aria-controls="navbarSupportedContent"
      //       aria-expanded="false"
      //       aria-label="Toggle navigation"
      //     >
      //       <i className="fas fa-bars"></i>
      //     </button>

      //     <div className="collapse navbar-collapse" id="navbarSupportedContent">
      //       <a className="navbar-brand mr-auto" href="/home">
      //         fullGO<span className="red-letter">.</span>
      //       </a>

      //       <ul className="navbar-nav mr-auto">
      //         <li className="nav-item">
      //           <a className="nav-link" href="/activities">
      //             Training Periods
      //           </a>
      //         </li>
      //         <li className="nav-item">
      //           <a className="nav-link" to="/periods">
      //             Menstrual Periods
      //           </a>
      //         </li>
      //       </ul>
      /* <img
            className="navbar-brand"
            href="/home"
            src={props.logo}
            alt="logo"
            height="60"
          ></img> */
      /* <section className="d-flex justify-content-left"> */
      // {/* <ReactRouterDOM.Link to="/home"> */}
      // {/* <img src={props.logo} alt="logo" />
      //   </ReactRouterDOM.Link> */}
      // {/* <ReactRouterDOM.NavLink
      //   to="/activities"
      //   activeClassName="navlink-active"
      //   className="nav-link nav-item"
      // >
      //   Activities
      // </ReactRouterDOM.NavLink>
      // <ReactRouterDOM.NavLink
      //   to="/periods"
      //   activeClassName="navlink-active"
      //   className="nav-link nav-item"
      // >
      //   Periods
      // </ReactRouterDOM.NavLink>
      // <Logout
      //   className="justify-content-right"
      //   setUserId={props.setUserId}
      //   // isLoggedIn={isLoggedIn}
      //   setIsLoggedIn={props.setIsLoggedIn}
      // />
      // <ReactRouterDOM.NavLink
      //   to="/profile"
      //   activeClassName="navlink-active"
      //   className="nav-link nav-item"
      // >
      //   <i className="bi bi-person-circle profile-icon dropdown"></i>
      // </ReactRouterDOM.NavLink>
      // </section> */}
      //     </div>
      //   </div>
      // </nav>
    );
  }
}

function Footer(props) {
  return (
    <div className="footer">
      <i className="bi bi-instagram footer-icon"></i>
      <i className="bi bi-twitter footer-icon"></i>
      <i></i>
    </div>
  );
}

function StatCard1(props) {
  return (
    <div className="stat-card">
      {props.monthlyMileage && (
        <div>
          <div className="stat">Mileage this Month: </div>
          <div className="stat-value"> {props.monthlyMileage}</div>
        </div>
      )}
      {!props.monthlyMileage && (
        <div>
          <div className="stat">Mileage this Month: </div>
          <div className="stat-value"> 0</div>
        </div>
      )}
    </div>
  );
}

function StatCard2(props) {
  return (
    <div className="stat-card">
      <div className="stat">
        Last Period:
        <div className="stat-value2">{props.lastPeriod}</div>
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

  const handleClick = (evt) => {
    evt.preventDefault();
    props.setShowSignUpModal(true);
    console.log("clicked");
    history.push("/sign-up");
  };

  if (localStorage.getItem("isLoggedIn") == true) {
    history.push(`/${props.userId}/home`);
  } else {
    return (
      <div className="landingpage-card card">
        <div id="landing-messages">
          <section id="landing-message1">
            <div>{landingMessage1}</div>
          </section>
          <section id="landing-message2">
            <div>{landingMessage2}</div>
          </section>

          {/* <form
            action="/sign-up"
            id="sign-up"
            className="d-flex justify-content-center"
          > */}
          <button
            onClick={handleClick}
            className="btn btn-primary sign-up-button red1"
          >
            Sign Up
          </button>
          {/* </form> */}
        </div>
      </div>
    );
  }
}

// HOMEPAGE AFTER LOGIN COMPONENT
function Home(props) {
  // console.log(props.activities);
  return (
    <div className="container-flex flex-wrap">
      <div className="row top-adjust">
        <div className="col-3">
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
            modalError={props.modalError}
            setModalError={props.setModalError}
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
          <AddCard setShowEntryChoiceModal={props.setShowEntryChoiceModal} />
        </div>
        <div className="col-9">
          <div className="calendar-card">
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
              showPeriodModal={props.showPeriodModal}
              setShowPeriodModal={props.setShowPeriodModal}
              showAddPeriodModal={props.showAddPeriodModal}
              setShowAddPeriodModal={props.setShowAddPeriodModal}
              showDeletePeriodModal={props.showDeletePeriodModal}
              setShowDeletePeriodModal={props.setShowDeletePeriodModal}
              showEntryChoiceModal={props.showEntryChoiceModal}
              setShowEntryChoiceModal={props.setShowEntryChoiceModal}
              showEditActivityModal={props.showEditActivityModal}
              setShowEditActivityModal={props.setShowEditActivityModal}
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
              selectedPeriodId={props.selectedPeriodId}
              setSelectedPeriodId={props.setSelectedPeriodId}
              selectedDate={props.selectedDate}
              setSelectedDate={props.setSelectedDate}
            />

            <ActivityModal
              userId={props.userId}
              error={props.error}
              setError={props.setError}
              modalError={props.modalError}
              setModalError={props.setModalError}
              showDeleteActModal={props.showDeleteActModal}
              setShowDeleteActModal={props.setShowDeleteActModal}
              showActivityModal={props.showActivityModal}
              setShowActivityModal={props.setShowActivityModal}
              activities={props.activiies}
              setActivities={props.setActivities}
              selectedActivityId={props.selectedActivityId}
              setSelectedActivityId={props.setSelectedActivityId}
              showEditActivityModal={props.showEditActivityModal}
              setShowEditActivityModal={props.setShowEditActivityModal}
            />
            <AddActivityModal
              userId={props.userId}
              error={props.error}
              setError={props.setError}
              modalError={props.modalError}
              setModalError={props.setModalError}
              showAddActModal={props.showAddActModal}
              setShowAddActModal={props.setShowAddActModal}
              showDeleteActModal={props.showDeleteActModal}
              setShowDeleteActModal={props.setShowDeleteActModal}
              activities={props.activities}
              setActivities={props.setActivities}
              selectedActivityId={props.selectedActivityId}
              setSelectedActivityId={props.setSelectedActivityId}
              selectedDate={props.selectedDate}
              setSelectedDate={props.setSelectedDate}
            />
            <DeleteActivity
              showDeleteActModal={props.showDeleteActModal}
              setShowDeleteActModal={props.setShowDeleteActModal}
            />
            <PeriodModal
              userId={props.userId}
              showPeriodModal={props.showPeriodModal}
              setShowPeriodModal={props.setShowPeriodModal}
              showAddPeriodModal={props.showAddPeriodModal}
              setShowAddPeriodModal={props.setShowAddPeriodModal}
              modalError={props.modalError}
              setModalError={props.setModalError}
              error={props.error}
              setError={props.setError}
              periods={props.periods}
              setPeriods={props.setPeriods}
              selectedPeriodId={props.selectedPeriodId}
              setSelectedPeriodId={props.setSelectedPeriodId}
              showDeletePeriodModal={props.showDeletePeriodModal}
              setShowDeletePeriodModal={props.setShowDeletePeriodModal}
            />
            <AddPeriodModal
              userId={props.userId}
              // onClose={closeModal}
              showPeriodModal={props.showPeriodModal}
              setShowPeriodModal={props.setShowPeriodModal}
              showAddPeriodModal={props.showPeriodModal}
              setShowAddPeriodModal={props.setShowPeriodModal}
              modalError={props.modalError}
              setModalError={props.setModalError}
              error={props.error}
              setError={props.setError}
              periods={props.periods}
              setPeriods={props.setPeriods}
              selectedDate={props.selectedDate}
              setSelectedDate={props.setSelectedDate}
              selectedPeriodId={props.selectedPeriodId}
              setSelectedPeriodId={props.setSelectedPeriodId}
              showDeletePeriodModal={props.showDeletePeriodModal}
              setShowDeletePeriodModal={props.setShowDeletePeriodModal}
            />
            <EntryChoice
              showEntryChoiceModal={props.showEntryChoiceModal}
              setShowEntryChoiceModal={props.setShowEntryChoiceModal}
              showAddActModal={props.showAddActModal}
              setShowAddActModal={props.setShowAddActModal}
              showPeriodModal={props.showPeriodModal}
              setShowPeriodModal={props.setShowPeriodModal}
              showAddPeriodModal={props.showAddPeriodModal}
              setShowAddPeriodModal={props.setShowAddPeriodModal}
              modalError={props.modalError}
              setModalError={props.setModalError}
              selectedDate={props.selectedDate}
              setSelectedDate={props.setSelectedDate}
            />
          </div>
          <div className="chart-card">
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
        </div>
      </div>
    </div>
  );
}

function Login(props) {
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const history = ReactRouterDOM.useHistory();

  const goToSignUp = (evt) => {
    evt.preventDefault();
    props.setShowSignUpModal(true);
    props.setModalError(null);
    history.push("/sign-up");
  };

  const returnToLandingPage = (evt) => {
    evt.preventDefault();
    props.setModalError(null);
    history.push("/");
  };

  const handleLogin = (evt) => {
    // console.log(evt);
    evt.preventDefault();
    props.setModalError(null);

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
          props.setModalError(data.error);
        }
      });
  };

  return (
    <div className="login card">
      <div className="col-12">
        <h2 className="header black">Welcome Back</h2>
      </div>
      <div className="login-container">
        <form className="content" onSubmit={handleLogin}>
          <div className="login-field">
            Email
            <br></br>
            <input
              type="text"
              className="login-input"
              value={email}
              onChange={(evt) => setEmail(evt.currentTarget.value)}
            />
          </div>
          <div className="login-field">
            Password
            <br></br>
            <input
              type="text"
              className="login-input"
              value={password}
              onChange={(evt) => setPassword(evt.currentTarget.value)}
            />
          </div>
          <div>
            {props.modalError && <p className="error">{props.modalError}</p>}
          </div>
          <button type="submit" className="btn login-button red1">
            Log in
          </button>
          <div></div>
          <div>Don't have an account?</div>
          <button className="btn inconspicuous red-text" onClick={goToSignUp}>
            Sign up for free
          </button>
        </form>
        <button className="btn inconspicuous" onClick={returnToLandingPage}>
          Cancel
        </button>
      </div>
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
      console.log("PERIOD", props.periods);
      for (const period of props.periods) {
        const volume = null;
        if (period.flow_volume === "No Flow") {
          volume = 0;
        }
        if (period.flow_volume === "Light") {
          volume = 1;
        }
        if (period.flow_volume === "Moderate") {
          volume = 2;
        }
        if (period.flow_volume === "Heavy") {
          volume = 3;
        }

        const perObj = {
          x: period.mense_date,
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
              parsing: {
                yAxisKey: activityData.distance,
              },
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
            {
              label: "Flow Volume",
              data: periodData,
              parsing: {
                yAxisKey: periodData.flow_volume,
              },
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              segment: {
                borderColor: "rgba(255, 99, 132, 0)",
              },
              spanGaps: true,
            },
          ],
          options: {
            scales: {
              xAxis: {
                type: "time",
                time: {
                  unit: "day",
                },
              },
            },
          },
        },
      });
      setCurrentChart(testChart);
    }
  }, [props.activities, props.periods]);

  return <canvas id="test-chart" ref={chartRef}></canvas>;
}

function AddCard(props) {
  const handleClick = (evt) => {
    evt.preventDefault();
    props.setShowEntryChoiceModal(true);
  };
  return (
    <div className="plus-card">
      <i
        className="btn bi bi-plus-circle-fill icon-add-plus"
        onClick={handleClick}
      ></i>
    </div>
  );
}

function ProfileCard(props) {
  const [profilePicSrc, setProfilePicSrc] = React.useState(
    "/static/static/FlowLogo.png"
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
        <div className="profile-card">
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
            sinc
            eDate={props.sinceDate}
            modalError={props.modalError}
            setModalError={props.setModalError}
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
        </div>
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
        <label className="custom-file-upload fas">
          <div>
            <img
              htmlFor="photo-upload"
              className="profile-img"
              src={props.profilePicSrc}
            />
          </div>
        </label>
        <h3 className="no-spacing">
          {props.firstName} {props.lastName}
        </h3>
        <div className="spacing">{props.email}</div>
        <h6 className="spacing">Member since {props.sinceDate}</h6>
        <div>{props.profileBio}</div>
        {props.teamName && <div>Team: {props.teamName}</div>}
        {props.active === "profile" && (
          <button
            onClick={handleEdit}
            className="btn btn-secondary edit-profile-button"
          >
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
