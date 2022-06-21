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
  // const [modalContent, setModalContent] = React.useState(null);
  const [activities, setActivities] = React.useState(null);
  const [selectedActivityId, setSelectedActivityId] = React.useState(null);
  const [periods, setPeriods] = React.useState([]);

  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [teamName, setTeamName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [sinceDate, setSinceDate] = React.useState(null);

  const [monthlyMileage, setMonthlyMileage] = React.useState(0);
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
        });
    }
  }, [userId]);

  const closeModal = () => {
    setShowModal(false);
    setModalError(null);
  };

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
  }, [userId, showActivityModal]);

  React.useEffect(() => {
    const localSelectedActivity = localStorage.getItem("selectedActivity");
    if (localSelectedActivity) {
      setSelectedActivityId(JSON.parse(selectedActivityId));
    }
  }, [selectedActivityId]);

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
      <div className="container-fluid">
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
            sinceDate={sinceDate}
            monthlyMileage={monthlyMileage}
            setMonthlyMileage={setMonthlyMileage}
            lastPeriod={lastPeriod}
            setLastPeriod={setLastPeriod}
            selectedActivityId={selectedActivityId}
            setSelectedActivityId={setSelectedActivityId}
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
            onClose={closeModal}
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
            activities={activities}
            setActivities={setActivities}
            selectedActivityId={selectedActivityId}
            setSelectedActivityId={setSelectedActivityId}
            onClose={closeModal}
          />
          {/* <Calendar userId={userId} /> */}
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
            onClose={closeModal}
          />
          <PeriodModal
            userId={userId}
            onClose={closeModal}
            showPeriodModal={showPeriodModal}
            setShowPeriodModal={setShowPeriodModal}
            modalError={modalError}
            setModalError={setModalError}
            error={error}
            setError={setError}
            periods={periods}
            setPeriods={setPeriods}
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
            onClose={closeModal}
          />
        </Route>
      </div>
      <div className="container-fluid">
        <Route exact path="/periods">
          <Periods
            userId={userId}
            error={error}
            setError={setError}
            modalError={modalError}
            setModalError={setModalError}
            showPeriodModal={showPeriodModal}
            setShowPeriodModal={setShowPeriodModal}
            periods={periods}
            setPeriods={setPeriods}
          />
          <PeriodModal
            userId={userId}
            onClose={closeModal}
            showPeriodModal={showPeriodModal}
            setShowPeriodModal={setShowPeriodModal}
            modalError={modalError}
            setModalError={setModalError}
            error={error}
            setError={setError}
            periods={periods}
            setPeriods={setPeriods}
          />
        </Route>
      </div>
      {/* {Route path = '*' /* cutsie catch-all error page default if no route found */}
    </BrowserRouter>
    // </FullContext.Provider>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
