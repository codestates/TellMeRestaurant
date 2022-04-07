import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Mypage from "./components/mypage";

function App() {
  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          <Route path="/mypage" exact>
            <Mypage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
