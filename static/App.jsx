const { Route, BrowserRouter } = ReactRouterDOM;

function App() {
  const [userId, setUserId] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [error, setError] = React.useState(null);
  const [modalError, setModalError] = React.useState(null);
  const [showProfileModal, setShowProfileModal] = React.useState(false);
  const [showActivityModal, setShowActivityModal] = React.useState(false);
  const [showAddActModal, setShowAddActModal] = React.useState(false);
  const [showPeriodModal, setShowPeriodModal] = React.useState(false);
  const [showAddPeriodModal, setShowAddPeriodModal] = React.useState(false);
  const [showSignUpModal, setShowSignUpModal] = React.useState(false);
  const [showDeleteActModal, setShowDeleteActModal] = React.useState(false);
  const [showDeletePeriodModal, setShowDeletePeriodModal] =
    React.useState(false);
  const [showEntryChoiceModal, setShowEntryChoiceModal] = React.useState(false);
  // const [modalContent, setModalContent] = React.useState(null);
  const [activities, setActivities] = React.useState(null);
  const [selectedActivityId, setSelectedActivityId] = React.useState(null);
  const [selectedPeriodId, setSelectedPeriodId] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [periods, setPeriods] = React.useState([]);

  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [teamName, setTeamName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [profileBio, setProfileBio] = React.useState(null);
  const [sinceDate, setSinceDate] = React.useState(null);

  const [monthlyMileage, setMonthlyMileage] = React.useState("0");
  const [lastPeriod, setLastPeriod] = React.useState("--");

  React.useEffect(() => {
    if (userId) {
      fetch("/api/profile")
        .then((response) => response.json())
        .then((data) => {
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setTeamName(data.team_name);
          setEmail(data.email);
          setPassword(data.password);
          setSinceDate(data.member_since);
          setProfileBio(data.bio);
        });
    }
  }, [userId]);

  // const closeModal = () => {
  //   setShowModal(false);
  //   setModalError(null);
  // };

  React.useEffect(() => {
    const localIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (localIsLoggedIn) {
      setIsLoggedIn(JSON.parse(localIsLoggedIn));
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    const localUserId = localStorage.getItem("userId");
    if (localUserId) {
      setUserId(JSON.parse(localUserId));
    }
  }, [userId]);

  React.useEffect(() => {
    const localSelectedActivity = localStorage.getItem("selectedActivity");

    if (localSelectedActivity) {
      try {
        setSelectedActivityId(JSON.parse(selectedActivityId));
      } catch (e) {}
    }
  }, [selectedActivityId]);

  React.useEffect(() => {
    const localSelectedPeriod = localStorage.getItem("selectedPeriod");

    if (localSelectedPeriod) {
      try {
        setSelectedPeriodId(JSON.parse(selectedPeriodId));
      } catch (e) {}
    }
  }, [selectedPeriodId]);

  React.useEffect(() => {
    if (userId) {
      fetch("/api/<user_id>/activities")
        .then((response) => response.json())
        .then((data) => {
          setActivities(data.activities);
          setMonthlyMileage(data.monthlyMileage);
        });
    }
  }, [userId]);

  React.useEffect(() => {
    if (userId) {
      fetch(`/api/${userId}/periods`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.periods);
          setPeriods(data.periods);
          setLastPeriod(data.lastPeriod);
        });
    }
  }, [isLoggedIn]);

  return (
    // <FullContext.Provider value={dataContext}>
    <BrowserRouter>
      <Navbar
        logo="/static/period-logo.png"
        userId={userId}
        setUserId={setUserId}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
      />
      {error && <p className="error">{error}</p>}
      {!isLoggedIn && (
        <div className="container-fluid">
          <Route exact path="/">
            <LandingPage isLoggedIn={isLoggedIn} userId={userId} />
          </Route>
        </div>
      )}
      <div className="container-fluid">
        <Route exact path="/login">
          <Login
            userId={userId}
            setUserId={setUserId}
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            setError={setError}
          />
        </Route>
      </div>
      <div className="container-fluid homepage">
        <Route exact path="/home">
          <Home
            userId={userId}
            isLoggedIn={isLoggedIn}
            showProfileModal={showProfileModal}
            setShowProfileModal={setShowProfileModal}
            showActivityModal={showActivityModal}
            setShowActivityModal={setShowActivityModal}
            showAddActModal={showAddActModal}
            setShowAddActModal={setShowAddActModal}
            showDeleteActModal={showDeleteActModal}
            setShowDeleteActModal={setShowDeleteActModal}
            showPeriodModal={showPeriodModal}
            setShowPeriodModal={setShowPeriodModal}
            showDeletePeriodModal={showDeletePeriodModal}
            setShowDeletePeriodModal={setShowDeletePeriodModal}
            showEntryChoiceModal={showEntryChoiceModal}
            setShowEntryChoiceModal={setShowEntryChoiceModal}
            showAddPeriodModal={showAddPeriodModal}
            setShowAddPeriodModal={setShowAddPeriodModal}
            // modalContent={modalContent}
            // setModalContent={setModalContent}
            modalError={modalError}
            setModalError={setModalError}
            activities={activities}
            setActivities={setActivities}
            periods={periods}
            setPeriods={setPeriods}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            teamName={teamName}
            setTeamName={setTeamName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            profileBio={profileBio}
            setProfileBio={setProfileBio}
            sinceDate={sinceDate}
            monthlyMileage={monthlyMileage}
            setMonthlyMileage={setMonthlyMileage}
            lastPeriod={lastPeriod}
            setLastPeriod={setLastPeriod}
            selectedActivityId={selectedActivityId}
            setSelectedActivityId={setSelectedActivityId}
            selectedPeriodId={selectedPeriodId}
            setSelectedPeriodId={setSelectedPeriodId}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <ActivityModal
            userId={userId}
            error={error}
            setError={setError}
            modalError={modalError}
            setModalError={setModalError}
            showActivityModal={showActivityModal}
            setShowActivityModal={setShowActivityModal}
            showDeleteActModal={showDeleteActModal}
            setShowDeleteActModal={setShowDeleteActModal}
            activities={activities}
            setActivities={setActivities}
            selectedActivityId={selectedActivityId}
            setSelectedActivityId={setSelectedActivityId}
            selectedPeriodId={selectedPeriodId}
            setSelectedPeriodId={setSelectedPeriodId}
            // onClose={closeModal}
          />
          <AddActivityModal
            userId={userId}
            error={error}
            setError={setError}
            modalError={modalError}
            setModalError={setModalError}
            showActivityModal={showActivityModal}
            setshowActivityModal={setShowActivityModal}
            showAddActModal={showAddActModal}
            setShowAddActModal={setShowAddActModal}
            showDeleteActModal={showDeleteActModal}
            setShowDeleteActModal={setShowDeleteActModal}
            activities={activities}
            setActivities={setActivities}
            selectedActivityId={selectedActivityId}
            setSelectedActivityId={setSelectedActivityId}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            // onClose={closeModal}
          />
          <DeleteActivity
            showDeleteActModal={showDeleteActModal}
            setShowDeleteActModal={setShowDeleteActModal}
          />
          <PeriodModal
            userId={userId}
            showPeriodModal={showPeriodModal}
            setShowPeriodModal={setShowPeriodModal}
            modalError={modalError}
            setModalError={setModalError}
            error={error}
            setError={setError}
            periods={periods}
            setPeriods={setPeriods}
            showAddPeriodModal={showAddPeriodModal}
            setShowAddPeriodModal={setShowAddPeriodModal}
            showDeletePeriodModal={showDeletePeriodModal}
            setShowDeletePeriodModal={setShowDeletePeriodModal}
            selectedPeriodId={selectedPeriodId}
            setSelectedPeriodId={setSelectedPeriodId}
          />
          <AddPeriodModal
            userId={userId}
            showPeriodModal={showPeriodModal}
            setShowPeriodModal={setShowPeriodModal}
            modalError={modalError}
            setModalError={setModalError}
            error={error}
            setError={setError}
            periods={periods}
            setPeriods={setPeriods}
            showAddPeriodModal={showAddPeriodModal}
            setShowAddPeriodModal={setShowAddPeriodModal}
            showDeletePeriodModal={showDeletePeriodModal}
            setShowDeletePeriodModal={setShowDeletePeriodModal}
            selectedPeriodId={selectedPeriodId}
            setSelectedPeriodId={setSelectedPeriodId}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <DeletePeriod
            showDeletePeriodModal={showDeletePeriodModal}
            setShowDeletePeriodModal={setShowDeletePeriodModal}
            showPeriodModal={showPeriodModal}
            setShowPeriodModal={setShowPeriodModal}
          />
        </Route>
      </div>
      <div className="container-fluid">
        <Route exact path="/activities">
          <AllActivitiesContainer
            userId={userId}
            error={error}
            setError={setError}
            modalError={modalError}
            setModalError={setModalError}
            showActivityModal={showActivityModal}
            setShowActivityModal={setShowActivityModal}
            activities={activities}
            setActivities={setActivities}
            selectedActivityId={selectedActivityId}
            setSelectedActivityId={setSelectedActivityId}
            showDeletePeriodModal={showDeletePeriodModal}
            setShowDeletePeriodModal={setShowDeletePeriodModal}
          />
          <ActivityModal
            userId={userId}
            error={error}
            setError={setError}
            modalError={modalError}
            setModalError={setModalError}
            showActivityModal={showActivityModal}
            setShowActivityModal={setShowActivityModal}
            activities={activities}
            setActivities={setActivities}
            selectedActivityId={selectedActivityId}
            setSelectedActivityId={setSelectedActivityId}
            showDeletePeriodModal={showDeletePeriodModal}
            setShowDeletePeriodModal={setShowDeletePeriodModal}
            // onClose={closeModal}
          />
        </Route>
      </div>
      <div className="container-fluid">
        <Route exact path="/profile">
          <Profile
            userId={userId}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            teamName={teamName}
            setTeamName={setTeamName}
            email={email}
            setEmail={setEmail}
            sinceDate={sinceDate}
            setShowProfileModal={setShowProfileModal}
            modalError={modalError}
            setModalError={setModalError}
          />
        </Route>
      </div>
      <div className="container-fluid">
        <Route exact path="/sign-up">
          <SignUp
            userId={userId}
            setUserId={setUserId}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            modalError={modalError}
            setError={setError}
            showSignUpModal={showSignUpModal}
            setShowSignUpModal={setShowSignUpModal}
          />
          <SignUpModal
            userId={userId}
            setUserId={setUserId}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            modalError={modalError}
            setError={setError}
            showSignUpModal={showSignUpModal}
            setShowSignUpModal={setShowSignUpModal}
            // onClose={closeModal}
          />
        </Route>
      </div>
      <div className="container-fluid">
        <Route exact path="/periods">
          {/* <Periods
            userId={userId}
            error={error}
            setError={setError}
            modalError={modalError}
            setModalError={setModalError}
            showPeriodModal={showPeriodModal}
            setShowPeriodModal={setShowPeriodModal}
            periods={periods}
            setPeriods={setPeriods}
          /> */}
          <PeriodModal
            userId={userId}
            showPeriodModal={showPeriodModal}
            setShowPeriodModal={setShowPeriodModal}
            showAddPeriodModal={showAddPeriodModal}
            setShowAddPeriodModal={setShowAddPeriodModal}
            modalError={modalError}
            setModalError={setModalError}
            error={error}
            setError={setError}
            periods={periods}
            setPeriods={setPeriods}
            showDeletePeriodModal={showDeletePeriodModal}
            setShowDeletePeriodModal={setShowDeletePeriodModal}
            selectedPeriodId={selectedPeriodId}
            setSelectedPeriodId={setSelectedPeriodId}
          />
          <AddPeriodModal
            userId={userId}
            showAddPeriodModal={showPeriodModal}
            setShowAddPeriodModal={setShowPeriodModal}
            modalError={modalError}
            setModalError={setModalError}
            error={error}
            setError={setError}
            periods={periods}
            setPeriods={setPeriods}
            selectedPeriodId={selectedPeriodId}
            setSelectedPeriodId={setSelectedPeriodId}
          />
          <DeletePeriod
            showDeletePeriodModal={showDeletePeriodModal}
            setShowDeletePeriodModal={setShowDeletePeriodModal}
          />
        </Route>
      </div>
      {/* {Route path = '*' /* cutsie catch-all error page default if no route found */}
    </BrowserRouter>
    // </FullContext.Provider>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
