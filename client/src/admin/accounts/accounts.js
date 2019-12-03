import React, { Component } from "react";
import "./accounts.css";
import axios from "axios";
export default class Accounts extends Component {
  background = '../../resources/buildingIcon.png';

  constructor(props) {
    super(props);
    this.state = {
      user: "BullDogAdmin",

      privUsers: [
        {
          name: "Andrew Marcs",
          username: "amarcs1",
          thumbnail: null,
          accessRights: ["Tubman Hall"]
        },
        {
          name: "David Nso",
          username: "dnsoes1",
          thumbnail: null,
          accessRights: ["Carenegie Mellon Hall"]
        },
        {
          name: "Mike Jackson",
          username: "mjackson3",
          thumbnail: null,
          accessRights: ["Tubman Hall"]
        }
      ],
      selectedUser: {},
      updateUser: true,
    };
  }
  //TODO: ADD FILTER DROPDOWN AND ON CLICK HIDE THE SIDE BAR AND USER ACCOUNT INFO..
  componentDidMount(){
    this.fetchAllUsers().then((user)=>{
      this.setState({selectedUser: user});
    })
  }
  async fetchAllUsers(){
    const apiResponse  = await axios.get('http://localhost:4100/users?role=Student');
    this.setState({privUsers: apiResponse.data})
    return apiResponse.data[0];

  }
  showUserDetails(user){
    this.setState({selectedUser: user});
  }
  render() {
    return (
      <div style={{ marginLeft: "230px", padding: "20px" }}>
        <div style={{ display: "row" }}>
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              height: "85%",
              width: "60%"
            }}
          >
            <span style={{ flexDirection: "row" }}>
              <div
                style={{
                  width: "80px",
                  height: "30px",
                  marginBottom: "40px",
                  cursor: "pointer"
                }}
              >
                <img
                  style={{ width: "15px", height: "15px", marginRight: "10px" }}
                  src={require("../../resources/chevron-point.png")}
                ></img>
                <label
                  style={{
                    color: "#508BFF",
                    fontSize: "14px",
                    cursor: "pointer"
                  }}
                >
                  Filter
                </label>
              </div>
            </span>
            
            <div
              style={{
                width: "100%",
                height: "95%",
                padding: "5px",
                left: "250px",
                gridRowGap: "50px",
                backgroundColor: "#FDFDFD"
              }}
            >
              <ul className="listing">
              {this.state.privUsers.map(user=>
              <li onClick={(e)=>{
                this.showUserDetails(user,e)
              }}>
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
                  transform: "translate(10%,30%)",
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
                  {user.name}
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
                  {user.username}
                </label>
              </div>
            </li>
            )}
                
                
              </ul>
            </div>
          </div>
          <div
            style={{
              right: "0",
              height: "95%",
              width: "20%",
              position: "fixed",
              marginRight: "10px",
              backgroundColor: "#FCFCFC",
              borderRadius: "10px",
              alignContent: "center",
              verticalAlign: "middle"
            }}
          >
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
                src={require("../../resources/profile.png")}
                style={{ width: "50px", height: "50px", alignSelf: "center" }}
              ></img>
              <h2
                style={{
                  fontFamily: "Nunito",
                  fontSize: "18px",
                  fontStyle: "normal",
                  fontWeight: 300,
                  letterSpacing: ".15em",
                  color: "#B1B1B1"
                }}
              >
                {this.state.selectedUser.name}
              </h2>
              <hr style={{ marginBottom: "5px" }} />
              <p
                style={{
                  lineHeight: "10px",
                  fontFamily: "Nunito",
                  fontStyle: "normal",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "#5A5555"
                }}
              >
                Access Rights
              </p>
              <img src={require('../../resources/fullBuildingIcon.png')} style={{ width: "80px", height: "70px", alignSelf: "center" }}></img>
              <p style={{color: '#838383', fontFamily: 'Nunito', fontSize:'12px'}}>{this.state.selectedUser.accessRights}</p>
              <img src={require('../../resources/plusIcon.png')} style={{width: "21px", height: "21px", alignSelf: "center", cursor: 'pointer'}} onClick={()=>(this.setState({updateUser: !this.state.updateUser}))}></img>
              <br></br>
              {this.state.updateUser && <><input style={{width: '80%', height:'18px', border: 'none', margin:'10px', borderBottom: '2px solid #75C2F6'}} type='text' placeholder="Enter building Name"></input>
              <br/>
              <img style={{width:'10px',height:'10px', cursor: 'pointer'}}src={require('../../resources/chevron.png')}></img></> }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//extract letter styles to seperate file...
