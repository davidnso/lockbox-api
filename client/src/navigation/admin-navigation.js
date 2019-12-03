import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch
} from "react-router-dom";
import AdminDashboard from "../dashboard/admin/dashboard";
import Accounts from "../admin/accounts/accounts";
import Tasks from "../admin/tasks/tasks";
import Archive from "../admin/archives/archive";
import Monitoring from "../admin/monitoring/monitoring";
import "./navigation.css";
import { logo } from "../resources/lock-logo.png";
import Tickets from "../students/tickets/tickets";
export default class AdminNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: true,
      admin: false,
      params: {},
    };
  }

  getRelativePath(){
    let { path, url } = useRouteMatch();
    const fullPathObject = { 
      path,
      url
    }
    this.setState({params: fullPathObject })
  }
componentWillMount(){
  this.getRelativePath.bind();
}

  render() {
    return (
      <>
        {true && (
          <>
            <div className="container">
              <div className="logo" src={logo}></div>
              <hr />
              <nav>
                <ul>
                  <li>
                    <Link style={{ textDecoration: "none" }} to={`/admin/home`}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <a style={{ textDecoration: "none" }} href={`/admin/monitoring`}>
                      Monitoring
                    </a>
                  </li>
                  <li>
                    <Link style={{ textDecoration: "none" }} to={`/admin/accounts`}>
                      Accounts
                    </Link>
                  </li>
                  <li>
                    <Link style={{ textDecoration: "none" }} to={`/admin/tasks`}>
                      Task Master
                    </Link>
                  </li>
                  <li>
                    <Link style={{ textDecoration: "none" }} to={`/admin/archive`}>
                      Archive
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
            <Route exact path="/admin/home" render={() => <Redirect to="/admin" />}></Route>
              <Route exact path="/admin">
                <AdminDashboard />
              </Route>
              <Route path="/admin/monitoring" component={Monitoring}/>
              <Route path="/admin/accounts">
                <Accounts />
              </Route>
              <Route path="/admin/tasks">
                <Tasks />
              </Route>
              <Route path="/admin/archive">
                <Archive />
              </Route>
            </Switch>
          </>
        )}
      </>
    );
  }
}
