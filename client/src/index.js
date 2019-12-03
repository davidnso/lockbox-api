import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Login from "./login/login";
import AdminDashboard from "./dashboard/admin/dashboard";
import AdminNavigation from "./navigation/admin-navigation";
import Tasks from "./admin/tasks/tasks";
import Archive from "./admin/archives/archive";
import Accounts from "./admin/accounts/accounts";
import StudentNavigation from "./navigation/student-navigation";

ReactDOM.render(
  <Router>
    <Route exact path="/" component={App}></Route>
    <Route exact path="/login" component={Login}></Route>
    <Route path="/admin">
      <AdminNavigation />
    </Route>
    <Route path='/student'>
      <StudentNavigation/>
    </Route>
    
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
