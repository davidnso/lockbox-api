import React, { Component } from "react";
import "./tickets.css";
import axios from "axios";

const statusColors = { 
  accepted: '#58BE56',
  pending: '#6680B1',
  denied: '#EC9D9D',
}
export default class Tickets extends Component {
  state = {
    formStarted: true,
    formDetails: {},
    building: '',
    begin: '',
    end: '',
    details: '',
    requesterId: '',
    ticketsExist: false,
    currentTickets: [],
    createTicket: false,
    buildings: []
  };
  handleSubmit(event) {
    const userId = localStorage.getItem('user');
    const info = {
      buildingId: '5d881a161c9d440000c7dd0b',
      begin: this.state.begin,
      end: this.state.end,
      requesterId: localStorage.getItem('user'),
      details: this.state.details,
    };
    console.log(info);
    axios
      .post(`http://localhost:4100/service/${userId}`, { info })
      .then(apiResponse => {
        console.log("request made");
        if (apiResponse.statusText != 404) {
          console.log("success");
        }
      });
  }

  componentWillMount() {
    const user = localStorage.getItem("user");
    console.log(user);
    axios.get(`http://localhost:4100/service/${user}`).then(apiResponse => {
      if (!apiResponse.data || apiResponse.data.length == 0) {
        this.setState({ ticketsExist: false });
      } else {
        this.setState({ ticketsExist: true });
        if (apiResponse.data) {
          this.setState({ currentTickets: apiResponse.data });
        }
      }
    });
    
  }

  componentDidMount() {
    axios.get(`http://localhost:4100/buildings`).then(apiResponse => {
      this.setState({ buildings: apiResponse.data.buildings });
    });
  }

  handleBuildingChange(event, state, id) {
    const target = event.target;
    const value = target.value;
    const info = state;
    console.log(id);
    info.buildingName = id;
    this.setState({
      building: id
    });
  }
  handleBeginChange(event, state) {
    const target = event.target;
    const value = target.value;
    const info = state;
    info.begin = value;
    this.setState({
      begin: value
    });
  }
  handleEndChange(event, state) {
    const target = event.target;
    const value = target.value ? target.value : "12/12/12";
    const info = state;
    info.end = value;
    this.setState({
      end: value
    });
  }
  handleDetailsChange(event, state) {
    const target = event.target;
    const value = target.value;
    const details = value;
    const info = state;
    info.details = details;
    console.log(info);
    this.setState({
      details: value
    });
  }
  render() {
    return (
      // <div style={{ marginLeft: "230px", padding: "20px" }}>
      //   <div>
      //     <div style={{cursor: 'pointer'}}>
      //     <img style={{marginLeft: '15px', marginTop: '10px', width: '23px', height: '20px'}} src={require('../../resources/plusIconAdd.png')}></img><label style={{cursor:'pointer'}}> Create New</label>
      //     </div>

      //     <h3 className="header">Tickets</h3>
      //     
      //   </div>
      // </div>
      <div style={{ marginLeft: "230px", padding: "20px" }}>
        <img
          style={{ width: "90px", height: "18px", cursor: "pointer" }}
          onClick={event => this.setState({ createTicket: true })}
          src={require("../../resources/create.png")}
        ></img>
        <h2
          style={{
            fontFamily: "Nunito",
            fontSize: "20px",
            letterSpacing: ".05em"
          }}
        >
          Tickets
        </h2>
        {!this.state.ticketsExist ? (
          <h3
            style={{
              margin: "auto",
              fontFamily: "Nunito",
              color: "grey",
              textAlign: "center",
              marginTop: "40px"
            }}
          >
            No Pending Tickets at this time, click "create new" To start a new
            one
          </h3>
        ) : 
          this.state.currentTickets.map(ticket => (
            <>
            <div style={{width: '90%', backgroundColor: '#FBFBFB', marginLeft: '15px', borderRadius: '8px', padding: '20px'}}>
            <strong><label>Status:</label> </strong><button style={{
              borderRadius: '3px',
              border: 'none',
              backgroundColor: statusColors[`${ticket.status}`],
              padding: '3px',
              fontWeight: 'bold',
              fontFamily: 'Nunito',
              fontSize: '16px',
              color: 'white'
            }}>{ticket.status}</button>
          <p className="ticketDetails">SR#: {ticket.buildingId}</p>
            <p className="ticketDetails">Details: {ticket.details}</p>
            <p className="ticketDetails">Duration: {ticket.end}</p>
            <img style={{height: '15px', width: '10px', float:'right'}} src={require('../../resources/chevron.png')}/>
          </div>
          </>
          ))
        }
        {this.state.createTicket && this.createFormModal()}
      </div>
    );
  }

  createFormModal = props => {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          zIndex: 4,
          position: "absolute",
          backgroundColor: "rgba(0,0,0,0.5)",
          opacity: "50%",
          top: 0,
          left: 0,
          alignContent: "center",
          alignItems: "center"
        }}
      >
        <form
          style={{
            width: "50%",
            position: "absolute",
            alignSelf: "center",
            textAlign: "center",
            borderRadius: "10px",
            textAlign: 'left',
            padding: '40px',
            fontFamily: 'Nunito',
            fontWeight: 'bold',
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            backgroundColor: "white"
          }}
        >
        <h3 style={{fontSize: '24px', marginTop: '-5px', marginLeft: '-10px'}}>New Ticket</h3>
          <p
            style={{
              position: "absolute",
              top: 0,
              right: 10,
              cursor: "pointer"
            }}
            onClick={() => {
              this.setState({ createTicket: false });
            }}
          >
            x
          </p>
          <div style={{marginTop: '10px', marginBottom: '10px'}}>
          <label style={{fontFamily: 'Nunito', fontWeight: 'bold'}}>Building: </label>
          <select onChange={e=>(this.handleBeginChange(e,this.state.formDetails,'Dwight Oliver Holmes'))}  >
            {this.state.buildings ? (
              this.state.buildings.map(building => (
                <option
                  value={building._id}
                >
                  {building.name}
                </option>
              ))
            ) : (
              <option
                value="---"
                onChange={(event) =>
                  (this.handleBuildingChange(event, this.state.formDetails))
                }
              >
                ---
              </option>
            )}
          </select>
          </div>
          <div style={{marginTop: '10px', marginBottom: '10px'}}>
          <label>Less than 24 hours: </label>
          <input type="checkbox"></input>
          </div>
          <label>From:</label>
          <input
            type="Date"
            onChange={event =>
              this.handleBeginChange(event, this.state.formDetails)
            }
          ></input>
          <br />
          <label>To:</label>
          <input
            type="Date"
            onChange={event =>
              this.handleEndChange(event, this.state.formDetails)
            }
          ></input>
          <br />
          <label>Details:</label>
          <input
            type="textarea"
            onChange={event =>
              this.handleDetailsChange(event, this.state.formDetails)
            }
          ></input>
          <button
            type="submit"
            value="submit"
            className='ticket-button'
            onClick={event => this.handleSubmit(event)}
          >
            Submit
          </button>
        </form>
        <div></div>
      </div>
    );
  };
}
