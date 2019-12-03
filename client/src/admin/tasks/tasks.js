import React, { Component } from "react";
import Axios from "axios";
import './tasks.css'
export default class Tasks extends Component {
  state = {
    tickets: [],
    reason: '',
  };

  componentDidMount(){
    this.fetchOnLoad();
  }

  fetchOnLoad() {
    let requesters = [];
    Axios.get("http://localhost:4100/service").then(async apiResponse => {
      const ticketArray = apiResponse.data.tickets;
      const fullTickets = await Promise.all(ticketArray.map(async ticket=>{
        if(ticket.requesterId && ticket.status=='pending'){
        let userApiResponse = await Axios.get(`http://localhost:4100/users/${ticket.requesterId}`);
        const requester = { 
          name: userApiResponse.data[0].name,
          role: userApiResponse.data[0].role,
        }
        ticket.requester = requester;
        //console.log(ticket.requester);
        }
        return ticket;
      })) 
      console.log(fullTickets);
      this.setState({ tickets: fullTickets });
    });
  }

  submitTicketResponse(event,value,id){
    const response={
      status: value,
      //reason: this.state.response
    }
    console.log(response)
    Axios.put(`http://localhost:4100/service/${id}`, response).then(apiResponse=>{
      console.log(apiResponse.status);
    })
    console.log('submitting')

  
  }
  handleResponseChange(event,state){
    this.setState({response: event.value});
  }
  render() {
    return (
      <div style={{ marginLeft: "260px" }}>
<h2
          style={{
            fontFamily: "Nunito",
            fontSize: "20px",
            letterSpacing: ".05em"
          }}
        >
          Tasks
        </h2>        {this.state.tickets
          ? this.state.tickets.map(ticket => <div className='taskCard'>
            <h3 style={{fontFamily: 'Nunito', color:'#A4A2A2'}}>Requesting access to building with Id#: {ticket.buildingId}</h3>
            <p>Details: {ticket.details}</p>
            {/* <p>{ticket.requester.name}</p> */}
            {/* <label>Reason</label>
            <input type="textarea" onChange={(event)=>this.handleResponseChange(event,this.state.response)}></input> */}
            <div style={{marginTop: "20px",
                  display: "flex",
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  float: 'right',
                  width: '300px',
                  marginTop: '120px',
                  margin:'auto',}}>
            <button className="accept" value="accepted" type="submit" onClick={(event)=>this.submitTicketResponse(event,event.target.value,ticket._id)}>Accept</button>
            <button className="decline" value="denied" type="submit" onClick={(event)=>this.submitTicketResponse(event,event.target.value,ticket._id)}>Decline</button>
              </div>
            
          </div>)
          : null}
      </div>
    );
  }
}
