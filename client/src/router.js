import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";
import Login from "./login/login";
import App from "./App";
import AdminDashboard from "./dashboard/admin/dashboard";
import StudentDashboard from "./dashboard/student/dashboard";

  export default ()=>(
      <Router>
          <Switch>
            <Route path='/' component={App}></Route>
             <Route path='/login' component={Login}/>
             <Route path='/admin' component={AdminDashboard}/>
             <Route path='/student' component={StudentDashboard}/>
          </Switch>
      </Router>
  )