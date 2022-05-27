// import Card from "/static/Components/Card";
const { Route, BrowserRouter } = ReactRouterDOM;

function App() {
  const [userId, setUserId] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [error, setError] = React.useState(null);

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

  return (
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
          <Home userId={userId} isLoggedIn={isLoggedIn} />
          <Calendar userId={userId} />
        </Route>
      </div>
      <div className="container-fluid">
        <Route exact path="/users/activities">
          <Activities userId={userId} setError={setError} />
        </Route>
      </div>
      <div className="container-fluid">
        <Route exact path="/users/profile">
          <Profile userId={userId} />
        </Route>
      </div>
      <div className="container-fluid">
        <Route exact path="/sign-up">
          <SignUp setUserId={setUserId} setError={setError} />
        </Route>
      </div>
      <div className="container-fluid">
        <Route exact path="/users/periods">
          <Periods userId={userId} />
          <PeriodForm userId={userId}></PeriodForm>
        </Route>
      </div>
      {/* {Route path = '*' /* cutsie catch-all error page default if no route found */}
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
