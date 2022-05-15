// import Card from "/static/Components/Card";
const { Route, BrowserRouter } = ReactRouterDOM;

function App() {
  const [userId, setUserId] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <BrowserRouter>
      <Navbar
        logo="/static/period-logo.png"
        setUserId={setUserId}
        setIsLoggedIn={setIsLoggedIn}
        isLoggedIn={isLoggedIn}
      />
      <div className="container-fluid">
        <Route exact path="/">
          <LandingPage />
        </Route>
      </div>
      <div className="container-fluid">
        <Route exact path="/login">
          <Login setUserId={setUserId} setIsLoggedIn={setIsLoggedIn} />
        </Route>
      </div>
      <div className="container-fluid">
        <Route exact path="/:user_id/home">
          <Home userId={userId} setUserId={setUserId} />
        </Route>
      </div>
      <div className="container-fluid">
        <Route exact path="/users/:user_id/activities">
          <ActivitiesContainer userId={userId} />
        </Route>
      </div>
      <div className="container-fluid">
        <Route exact path="/sign-up">
          <SignUp setUserId={setUserId} />
        </Route>
      </div>

      {/* {Route path = '*' /* cutsie catch-all error page default if no route found */}
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
