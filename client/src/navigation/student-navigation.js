import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useRouteMatch
  } from "react-router-dom";
import "./navigation.css";
import StudentDashboard from "../dashboard/student/dashboard";
import { logo } from "../resources/lock-logo.png";
import Tickets from "../students/tickets/tickets";
export default class StudentNavigation extends Component {
  render() {
    return (
      <div>
        <>
          <div className="container">
            <div className="logo" src={logo}></div>
            <hr />
            <nav>
              <ul>
                <li>
                  <Link style={{ textDecoration: "none" }} to={"/student/home"}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link style={{ textDecoration: "none" }} to={"/student/tickets"}>
                    Tickets
                  </Link>
                </li>
                
              </ul>
            </nav>
            <img
              src={require("../resources/bottom-image.png")}
              style={{
                position: "absolute",
                left: 0,
                bottom: 0,
                width: "160px",
                height: "160x"
              }}
            ></img>
          </div>

          <Switch>
            <Route
              exact
              path="/student/home"
              render={() => <Redirect to="/student" />}
            ></Route>
            <Route exact path="/student">
              <StudentDashboard />
            </Route>
            <Route path="/student/tickets">
              <Tickets />
            </Route>
            <Route path="/student/notifications">
            </Route>
          </Switch>
        </>
      </div>
    );
  }
}
