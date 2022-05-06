// import Card from "/static/Components/Card";

function App() {
  return (
    <ReactRouterDOM.BrowserRouter>
      <Navbar logo="/static/period-logo.png" brand="period" />
      <div className="container-fluid">
        <ReactRouterDOM.Route exact path="/">
          <LandingPage />
        </ReactRouterDOM.Route>
      </div>
    </ReactRouterDOM.BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
