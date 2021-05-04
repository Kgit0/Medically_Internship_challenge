import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from "./screens/LogIn";
import SignUp from "./screens/SignUp";
export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <SignUp />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}