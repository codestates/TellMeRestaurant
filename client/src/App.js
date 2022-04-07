import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Mypage from "./pages/Mypage";
import Main from "./components/Main";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav />
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <Route path="/mypage" exact>
            <Mypage />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
