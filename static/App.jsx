const { Route, BrowserRouter } = ReactRouterDOM;

function App() {
  const [userId, setUserId] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [modalError, setModalError] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(null);
  const [activities, setActivities] = React.useState(null);
  const [selectedActivityId, setSelectedActivityId] = React.useState(null);
  const [periods, setPeriods] = React.useState([]);

  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [teamName, setTeamName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [sinceDate, setSinceDate] = React.useState(null);

  const [editMode, setEditMode] = React.useState(false);

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
          console.log(data.email);
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
  }, [userId]);

  React.useEffect(() => {
    if (userId) {
      fetch("/api/<user_id>/activities")
        .then((response) => response.json())
        .then((data) => {
          console.log(data.activities);
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

  React.useEffect(() => {
    const selectedActId = localStorage.getItem("selectedActId");
    if (selectedActId) {
      setSelectedActivityId(JSON.parse(selectedActId));
    }
  }, [selectedActivityId]);

  // React.useEffect(() => {
  //   fetch(`/api/${userId}/data`)
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  //   // setDataForContext(data));
  // }, [userId]);

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
            editMode={editMode}
            setEditMode={setEditMode}
            isLoggedIn={isLoggedIn}
            showModal={showModal}
            setShowModal={setShowModal}
            modalContent={modalContent}
            setModalContent={setModalContent}
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
            showModal={showModal}
            setShowModal={setShowModal}
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
            showModal={showModal}
            setShowModal={setShowModal}
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
            showModal={showModal}
            setShowModal={setShowModal}
            activities={activities}
            setActivities={setActivities}
            selectedActivityId={selectedActivityId}
            setSelectedActivityId={setSelectedActivityId}
            onClose={closeModal}
          />
          <PeriodModal
            userId={userId}
            onClose={closeModal}
            showModal={showModal}
            setShowModal={setShowModal}
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
            setShowModal={setShowModal}
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
            showModal={showModal}
            setShowModal={setShowModal}
          />
          <SignUpModal
            userId={userId}
            setUserId={setUserId}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            modalError={modalError}
            setError={setError}
            showModal={showModal}
            setShowModal={setShowModal}
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
            showModal={showModal}
            setShowModal={setShowModal}
            periods={periods}
            setPeriods={setPeriods}
          />
          <PeriodModal
            userId={userId}
            onClose={closeModal}
            showModal={showModal}
            setShowModal={setShowModal}
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
