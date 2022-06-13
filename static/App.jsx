const { Route, BrowserRouter } = ReactRouterDOM;

function App() {
  const [userId, setUserId] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [modalError, setModalError] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(null);
  const [activities, setActivities] = React.useState(null);
  const [periods, setPeriods] = React.useState([]);

  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [teamName, setTeamName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [sinceDate, setSinceDate] = React.useState(null);

  React.useEffect(() => {
    if (userId) {
      fetch(`/users/${userId}/profile`)
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
  }, [userId]);

  React.useEffect(() => {
    if (userId) {
      fetch(`/api/users/${userId}/activities`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.activities);
          setActivities(data.activities);
        });
    }
  }, [userId]);

  React.useEffect(() => {
    if (userId) {
      fetch(`/api/users/${userId}/periods`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data.periods);
          setPeriods(data.periods);
        });
    }
  }, [isLoggedIn]);

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
        <Route exact path="/users/home">
          <Home
            userId={userId}
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
            sinceDate={sinceDate}
          />
          <Modal
            userId={userId}
            onClose={closeModal}
            showModal={showModal}
            setShowModal={setShowModal}
            setModalContent={setModalContent}
            modalContent={modalContent}
            modalError={modalError}
            setModalError={setModalError}
          />
          {/* <Calendar userId={userId} /> */}
        </Route>
      </div>
      <div className="container-fluid">
        <Route exact path="/users/activities">
          <Activities
            userId={userId}
            setError={setError}
            setModalError={setModalError}
            showModal={showModal}
            setShowModal={setShowModal}
            setModalContent={setModalContent}
            activities={activities}
            setActivities={setActivities}
          />
          <Modal
            userId={userId}
            onClose={closeModal}
            showModal={showModal}
            setShowModal={setShowModal}
            modalContent={modalContent}
            modalError={modalError}
            setModalError={setModalError}
          />
        </Route>
      </div>
      <div className="container-fluid">
        <Route exact path="/users/profile">
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
            setUserId={setUserId}
            setIsLoggedIn={setIsLoggedIn}
            setError={setError}
            setModalContent={setModalContent}
            setShowModal={setShowModal}
          />
          <SignUpModal
            onClose={closeModal}
            showModal={showModal}
            setShowModal={setShowModal}
            modalContent={modalContent}
            userId={userId}
            modalError={modalError}
            setModalError={setModalError}
          />
        </Route>
      </div>
      <div className="container-fluid">
        <Route exact path="/users/periods">
          <Periods
            userId={userId}
            periods={periods}
            setPeriods={setPeriods}
            error={error}
            setError={setError}
            modalError={modalError}
            setModalError={setModalError}
            showModal={showModal}
            setShowModal={setShowModal}
            modalContent={modalContent}
            setModalContent={setModalContent}
          />
          <Modal
            userId={userId}
            onClose={closeModal}
            showModal={showModal}
            setShowModal={setShowModal}
            modalContent={modalContent}
            modalError={modalError}
            setModalError={setModalError}
          />
        </Route>
      </div>
      {/* {Route path = '*' /* cutsie catch-all error page default if no route found */}
    </BrowserRouter>
    // </FullContext.Provider>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
