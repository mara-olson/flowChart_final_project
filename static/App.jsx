// import Card from "/static/Components/Card";

function App() {
  // fetch("/login", { method: "POST" })
  //   .then((response) => response.json())
  //   .then((data) => console.log(data));

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
