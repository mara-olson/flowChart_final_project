// import Card from "/static/Components/Card";

function App() {
  const [userId, setUserId] = React.useState(null);

  // const [activities, setActivities] = React.useState({});

  // React.useEffect(() => {
  //   fetch("/api/activities")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setActivities(data);
  //     });
  // }, []);
  // const [userData, setUserData] = React.useState({});

  // React.useEffect(() => {
  //   fetch("/api/user")
  //     .then((response) => response.json())
  //     .then((data) => setUserData(data));
  // }, []);

  return (
    <ReactRouterDOM.BrowserRouter>
      <Navbar logo="/static/period-logo.png" />
      <div className="container-fluid">
        <ReactRouterDOM.Route exact path="/">
          <LandingPage />
        </ReactRouterDOM.Route>
      </div>
      <div className="container-fluid">
        <ReactRouterDOM.Route exact path="/login">
          <Login setUserId={setUserId} />
        </ReactRouterDOM.Route>
      </div>
      <div className="container-fluid">
        <ReactRouterDOM.Route exact path="/:user_id/home">
          <Home />
        </ReactRouterDOM.Route>
      </div>
      <div className="container-fluid">
        <ReactRouterDOM.Route exact path="/activities">
          <Activities userId={userId} />
        </ReactRouterDOM.Route>
      </div>
      <div className="container-fluid">
        <ReactRouterDOM.Route exact path="/sign-up">
          <SignUp />
        </ReactRouterDOM.Route>
      </div>
    </ReactRouterDOM.BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
