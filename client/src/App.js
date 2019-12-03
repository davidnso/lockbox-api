import React, { Component } from "react";
import "./App.css";
import AdminNavigation from "./navigation/admin-navigation";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch
} from "react-router-dom";
import Login from "./login/login";
require("typeface-nunito");

function renderNavigation() {
  return <AdminNavigation />;
}

export class App extends Component {
  state = {
    isVisible: true,
    isLoggedIn: false,
    landing: true,
    login: false,
  };
  

  loadLogin(){
    this.setState({landing: false})
    this.setState({login: true});
  }
  render() {
    return (
      // <Router>
      //   {this.state.isVisible && (
      //     <div className="context" >
      //       <Link
      //         className="button"
      //         style={{ textDecoration: "none" }}
      //         onClick={() => this.setState({ isVisible: false })}
      //         to="/student"
      //       >
      //         <p>Student</p>
      //       </Link>

      //       <Link
      //         className="button"
      //         style={{ textDecoration: "none" }}
      //         onClick={() => this.setState({ isVisible: false })}
      //         to="/admin"
      //       >
      //         <p>Administrator</p>
      //       </Link>
      //     </div>
      //   )}
      //   <Switch>
      //     <Route path="/student">
      //       <Navigation context="student" />
      //     </Route>
      //     <Route path="/admin">
      //       <Navigation context="administrator" />
      //     </Route>
      //   </Switch>
      // </Router>
      <>
      {this.state.landing && <div style={{ background: "#FDFDFD", height: "100%" }}>
        <img
          style={{
            position: "absolute",
            width: "100%",
            marginTop: "90px",
            zIndex: "0",
            animation: 'fadein 2s'
          }}
          src={require("./resources/splash.png")}
        ></img>
        <div
          style={{
            alignSelf: "center",
            width: "80%",
            height: "100%",
            margin: "auto"
          }}
        >
          <div className="navbar">
            <div className="left">
              <div
                className="logo"
                src={require("./resources/lock-logo.png")}
                style={{ marginTop: "0px" }}
              />
            </div>
            <div className="right">
                <button>Contact us</button>
                <Link to="/login">
                <p style={{cursor: 'pointer'}} onClick={()=>{this.loadLogin()}}>Login</p>
                </Link>
            </div>
          </div>
          <div
            className="message-wrapper"
            style={{ textAlign: "center", fontFamily: "Nunito" }}
          >
            <h1 style={{fontSize: '45px'}}>Welcome to the Lockbox App!</h1>
            <h2 style={{fontSize: '30px'}}>
              We believe in safety, security,
              <br /> and ease of use for all our users
            </h2>
            <hr style={{ width: "300px" }} />
            <button>Sign-up</button>
          </div>
          <div className="iconRow">
            <img src={require("./resources/manage.png")} />
            <img src={require("./resources/record.png")} />
            <img src={require("./resources/monitor.png")} />
          </div>
        </div>
        <div class="row">
          <div class="column"></div>
          <div class="column">
          </div>
          <div class="right">Developer: David Nsoesie</div>
        </div>
      </div>}
      </>
    );
  }
}

export default App;
