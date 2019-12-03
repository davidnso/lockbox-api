import React, { Component } from "react";
import {Link} from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import "./dashboard.css";
import axios from "axios";
import { Button } from "@material-ui/core";

export default class StudentDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: { name: "David", status: "In the Lab" },
      pendingStatus: '',
      roommates: [],
      guests: [],
      highlightedGuest: [],
      showGuestModal: false,
      showStatusModal: false,
      showNotification: false,
      percentage: 30
    };
  }
  
  componentWillMount() {
    this.fetchOnLoad().then(() => {});
  }
  ProgressBar = props => {
    return (
      <div className="progress-bar">
        <this.Filler percentage={Number.parseInt(props.percentage)} />
      </div>
    );
  };
  Filler = props => {
    return (
      <div className="filler" style={{ width: `${props.percentage}%` }}></div>
    );
  };

  handleChange(event, user){
    const status = event.target.value   
    this.setState({pendingStatus:status}) 
    event.preventDefault()
  }

  handleSubmit(event, user){
    const userId = "5d90dc8f1c9d4400002fc3ce";
    user.status = this.state.pendingStatus;
    this.setState({user});
    axios.patch(`http://localhost:4100/users/${userId}`,{status: user.status}).then(apiResponse=>{
      console.log(apiResponse);
    })
    this.setState({showStatusModal: false});
    this.setState({showNotification: true});
  }

  deleteGuest(event,guest){
    const userId = "5d90dc8f1c9d4400002fc3ce";
    axios.patch(`http://localhost:4100/users/${userId}/guest`,{name: guest.name}).then(apiResponse=>{ 
      console.log(apiResponse)
      window.location.reload(false);
    })
  }

  async fetchOnLoad() {
    const userId = "5d90dc8f1c9d4400002fc3ce";
    axios.get(`http://localhost:4100/users/${userId}`).then(apiResponse => {
      const user = apiResponse.data[0];
      //parse name to only show the first.
      console.log(user)
      this.setState({ user });
      this.setState({ guests: user.guests });

    });
    axios
      .get(`http://localhost:4100/users/${userId}/roommates`)
      .then(apiResponse => {
        const roommates = apiResponse.data;
        this.setState({ roommates });
      });
  }

  fetchRoommatePolicy(roommate){
    const today = new Date();
    const hours = today.getHours();

    console.log(roommate.policies);
    switch(true){
      case (hours<12): return roommate.policies.morning;
      case (hours>12 && hours<18): return roommate.policies.afternoon;
      case (hours>18 && hours<24): return roommate.policies.evening;
      default: return 'No policies in effect';
    }
  }

  render() {
    /**
     * Modal related...
     */

    return (
      <div style={{ marginLeft: "230px", padding: "20px" }}>
        <div
          style={{
            right: "10px",
            height: "95%",
            width: "300px",
            backgroundColor: "#FCFCFC",
            position: "fixed",
            borderRadius: "15px",
            padding: "15px",
            alignContent: "center",
            verticalAlign: "middle"
          }}
        >
          <Link to='/' style={{textDecoration: 'none'}}>
            <p style={{ fontWeight: 500, fontSize: "17px", color: "#5A5555",  }}>
              Logout
            </p>
          </Link>
          
          <div
            style={{
              width: "100%",
              height: "50%",
              alignItems: "center",
              textAlign: "center",
              position: "absolute",
              transform: "translate(0%,50%)"
            }}
          >
            <img
              src={require("../../resources/user.png")}
              style={{
                width: "200px",
                height: "200px",
                alignSelf: "center",
                marginBottom: "20px"
              }}
            ></img>
            <h2
              style={{
                fontFamily: "Nunito",
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: 300,
                letterSpacing: ".15em",
                color: "#fff",
                backgroundColor: "#58BE56",
                lineHeight: "25px",
                width: "150px",
                margin: "auto",
                borderRadius: "20px"
              }}
            >
              {this.state.user.role ? this.state.user.role : "Student"}
            </h2>
            <p
              style={{
                lineHeight: "10px",
                fontFamily: "Nunito",
                fontStyle: "normal",
                fontWeight: "800",
                fontSize: "14px",
                color: "#000"
              }}
            >
              {this.state.user.name}
            </p>
            <p
              style={{
                lineHeight: "10px",
                fontFamily: "Nunito",
                fontStyle: "normal",
                fontWeight: "300",
                fontSize: "14px",
                color: "#000"
              }}
            >
              {this.state.user.username}
            </p>
          </div>
          <div style={{ position: "absolute", bottom: "60px" }}>
            <ul>
              <li className="studentAccountTitle">
                Your Account
                <ul>
                  <li
                    className="studentAccountItem"
                    style={{ marginTop: "25px" }}
                  >
                    Edit
                  </li>
                  <li className="studentAccountItem" onClick={()=>(this.setState({showStatusModal: true}))}>Change Status</li>
                  <li className="studentAccountItem">Notifications</li>
                </ul>
                Settings
              </li>
            </ul>
          </div>
        </div>
        <div>
          <h3 className="header">Dashboard</h3>
          <div className="banner">
            <h2 className="welcome">Welcome Back {this.state.user.name}</h2>
            <h1 className="status">Your status: {this.state.user.status}</h1>
          </div>
          {this.state.showNotification && (<div className="notification">
            <img src={require('../../resources/notificationIcon.png')} style={{height: '32px', width: '32px', marginLeft: '3px', position: "absolute", float: 'left'}}/>
            <div style={{ position: 'absolute', marginLeft: '40px'}}>
            <label > Your roommates have been notified!</label>
            </div>     
          </div>)}
        </div>
        <span style={{ display: "flex", flexDirection: "row", width: "95%" }}>
          <div className="roommate-container">
            <p
              style={{
                fontFamily: "Nunito",
                fontSize: "15px",
                fontWeight: "bold",
                margin: "15px"
              }}
            >
              Roommates
            </p>
            <div>
              <ul>
                {this.state.roommates.map(roommate => (
                  <li>
                    <div
                      style={{
                        width: "50%"
                      }}
                    >
                      <img
                        style={{ width: "55px", height: "55px" }}
                        src={require("../../resources/profile.png")}
                      />
                      <div
                        style={{
                          flexDirection: "column",
                          float: "right ",
                          verticalAlign: "middle",
                          marginTop: "5px"
                        }}
                      >
                        <label
                          style={{
                            fontFamily: "Nunito",
                            fontSize: "16px",
                            fontStyle: "normal",
                            fontWeight: 300,
                            letterSpacing: ".15em",
                            color: "#B1B1B1"
                          }}
                        >
                          {roommate.name}
                        </label>
                        <br />
                        <label
                          style={{
                            fontFamily: "Nunito",
                            fontStyle: "normal",
                            fontWeight: "300",
                            fontSize: "15px",
                            color: "#000"
                          }}
                        >
                          {roommate.username}
                        </label>
                      </div>
                    </div>
                    <div style={{ paddingTop: "10px", paddingLeft: "12px" }}>
                      {" "}
                      <label
                        style={{
                          fontWeight: "700",
                          fontFamily: "Nunito",
                          letterSpacing: ".15em",
                          fontSize: "14px"
                        }}
                      >
                        Status:
                      </label>
                      <label
                        style={{
                          fontFamily: "Nunito",
                          letterSpacing: ".15em",
                          fontSize: "14px"
                        }}
                      >
                        {roommate.status}
                      </label>
                      <br />{" "}
                      <label
                        style={{
                          fontFamily: "Nunito",
                          letterSpacing: ".15em",
                          fontSize: "14px"
                        }}
                      >
                        Guest Policy:
                      </label>{" "}
                      <label
                        style={{
                          fontFamily: "Nunito",
                          letterSpacing: ".15em",
                          fontSize: "14px",
                          fontWeight: "300"
                        }}
                      >
                        {this.fetchRoommatePolicy(roommate)}
                      </label>
                    </div>

                    <hr
                      style={{
                        width: "80%",
                        float: "left",
                        height: "0px",
                        marginTop: "20px",
                        border: "1px solid #ECECEC"
                      }}
                    ></hr>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            style={{
              marginLeft: "80px",
              marginTop: "90px",
              padding: "5px",
              minHeight: "100px",
              borderRadius: "10px",
              width: "400px"
            }}
          >
            {this.state.guests? this.state.guests.map(guest => (
              <div
                style={{
                  backgroundColor: "#EDF8FF",
                  borderRadius: "10px",
                  width: "95%",
                  padding: "5px",
                  minHeight: "100px",
                  marginBottom: "40px",
                }}
              >
                <p
                  style={{
                    marginTop: "1px",
                    fontFamily: "sans-serif",
                    marginLeft: "15px",
                    fontSize: "12px",
                    letterSpacing: ".15em"
                  }}
                >
                  Guest
                </p>
                <div
                  style={{
                    width: "60%",
                  }}
                >
                  <img
                    style={{
                      width: "55px",
                      height: "55px",
                      marginLeft: "15px"
                    }}
                    src={require("../../resources/profile.png")}
                  />
                  <div
                    style={{
                      flexDirection: "column",
                      float: "right",
                      verticalAlign: "middle",
                      marginTop: "5px"
                    }}
                  >
                    <label
                      style={{
                        fontFamily: "Nunito",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: 300,
                        letterSpacing: ".15em",
                        color: "#B1B1B1"
                      }}
                    >
                      {guest.name}
                    </label>
                    <br />
                    <label
                      style={{
                        fontFamily: "Nunito",
                        fontStyle: "normal",
                        fontWeight: "300",
                        fontSize: "15px",
                        color: "#000"
                      }}
                    >
                      rprince
                    </label>
                  </div>
                </div>

                <this.ProgressBar percentage={100 - guest.percentage} />
                {100 - guest.percentage >= 33 && (
                  <div
                    style={{
                      float: "right",
                      bottom: "-20px",
                      cursor: "pointer"
                    }}
                  >
                    <img
                      style={{ width: "25px", height: "25px" }}
                      src={require("../../resources/deleteIcon.png")}
                      onClick={() => {
                        this.setState({ showGuestModal: true });
                        this.setState({highlightedGuest: guest});
                      }}
                    />
                  </div>
                )}
              </div>
            )): null}

            <h1></h1>
          </div>
        </span>
        {this.state.showGuestModal && (
          <div
            style={{
              height: "100%",
              width: "100%",
              zIndex: 4,
              position: "absolute",
              backgroundColor: "rgba(0,0,0,0.5)",
              opacity: "100%",
              zIndex: 0,
              top: 0,
              left: 0,
              alignContent: "center",
              alignItems: "center"
            }}
          >
            <div
              style={{
                width: "50%",
                height: "200px",
                position: "absolute",
                alignSelf: "center",
                textAlign: "center",
                borderRadius: "10px",
                zIndex: 5,
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                backgroundColor: "white"
              }}
            >
              <p
                style={{
                  position: "absolute",
                  top: 0,
                  right: 10,
                  cursor: "pointer"
                }}
                onClick={() => {
                  this.setState({ showGuestModal: false });
                }}
              >
                x
              </p>
              <p className="modalText">
                Are you sure you want to delete Lisa from your guest list, You
                won’t be able to sign them in for 48 hours.
              </p>
              <div
                style={{
                  marginTop: "20px",
                  display: "row",
                  width: '70%',
                  marginTop: '120px',
                  margin:'auto',
                }}
              >
                <button
                  style={{
                    float: "left",
                    width: "130px",
                    height: "35px",
                    borderRadius: "20px",
                    backgroundColor: '#EC9D9D',
                    border: 'none',
                    color: 'white',
                    
                  }}
                  onClick={(event)=>{this.deleteGuest(event,this.state.highlightedGuest)}}
                >
                  Yes Delete!
                </button>
                <button style={{ 
                  float: "right",
              width: "130px",
              height: "35px",
              borderRadius: "20px",
              backgroundColor: '#58BE56',
              border: 'none',
              color: 'white' }}>Noooo!!!</button>
              </div>
            </div>
          </div>
        )}
        {this.state.showStatusModal && (
          <div
          style={{
            height: "100%",
            width: "100%",
            zIndex: 4,
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.5)",
            opacity: "100%",
            top: 0,
            left: 0,
            alignContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={{
              width: "35%",
              height: "200px",
              position: "absolute",
              alignSelf: "center",
              textAlign: "center",
              borderRadius: "10px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              backgroundColor: "white"
            }}
          >
            <p
              style={{
                position: "absolute",
                top: 0,
                right: 10,
                cursor: "pointer"
              }}
              onClick={() => {
                this.setState({ showStatusModal: false });
              }}
            >
              x
            </p>
            <p className="modalText" style={{marginBottom: '10px'}}>
              Set a status
            </p>
            <input className='statusTextBox'  type='text' placeholder="What are you doing?" onChange={(event)=>(this.handleChange(event,this.state.user))} />
            <div
              style={{
                marginTop: "20px",
                display: "row",
                width: '70%',
                marginTop: '120px',
                margin:'auto',
              }}
            >
             
              <button style={{ 
            width: "130px",
            height: "35px",
            borderRadius: "20px",
            backgroundColor: '#58BE56',
            border: 'none',
            color: 'white' }}  onClick={(event)=>(this.handleSubmit(event,this.state.user))}>Save</button>
            </div>
          </div>
        </div>
        )}
      </div>
    );
  }
}
//TODO: Add options in the status modal so that users can quickly choose common statuses. 
/**ROOOOMMMMAAATEE LI!!!!!!!!!
 * <li style={{ display: "flex", flexDirection: "row" }}>
                        <img
                          style={{
                            width: "50px",
                            height: "50px",
                            marginLeft: "25px",
                            verticalAlign: "middle",
                            transform: "translate(10%,50%)"
                          }}
                          src={require("../../resources/profile.png")}
                        ></img>
                        <div
                          style={{
                            verticalAlign: "middle",
                            transform: "translate(10%,60%)",
                            flexDirection: "column",
                            marginLeft: "10px"
                          }}
                        >
                          <label
                            style={{
                              fontFamily: "Nunito",
                              fontSize: "18px",
                              fontStyle: "normal",
                              fontWeight: 300,
                              letterSpacing: ".15em",
                              color: "#B1B1B1"
                            }}
                          >
                            djdansdf{" "}
                          </label>
                          <br />
                          <label
                            style={{
                              fontFamily: "Nunito",
                              fontStyle: "normal",
                              fontWeight: "300",
                              fontSize: "11px",
                              color: "#000"
                            }}
                          >
                            jsdnfkjdns{" "}
                          </label>
                        </div>
                        
                      </li>
 */
