// import Card from "/static/Components/Card";

function App() {
  // const [userData, setUserData] = React.useState({});

  // React.useEffect(() => {
  //   fetch("/api/user")
  //     .then((response) => response.json())
  //     .then((data) => setUserData(data));
  // }, []);

  return (
    <ReactRouterDOM.BrowserRouter>
      <Navbar logo="/static/period-logo.png" brand="period" />
      <div className="container-fluid">
        <ReactRouterDOM.Route exact path="/">
          <LandingPage />
        </ReactRouterDOM.Route>
      </div>
      <div className="container-fluid">
        <ReactRouterDOM.Route exact path="/login">
          <Login />
        </ReactRouterDOM.Route>
      </div>
      <div className="container-fluid">
        <ReactRouterDOM.Route exact path="/home">
          <Home />
        </ReactRouterDOM.Route>
      </div>
    </ReactRouterDOM.BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
