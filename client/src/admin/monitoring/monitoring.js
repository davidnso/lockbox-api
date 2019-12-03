import React, { Component } from "react";
import BuildingChart from "../../dashboard/admin/components/chart/chart";
import Timeline from 'react-visjs-timeline'
import Axios from "axios";


const options = {
  width: "100%",
  height: "700px",
  stack: true,
  showMajorLabels: true,
  showCurrentTime: true,
  zoomMin: 1000000,
  type: "box",
  format: {
    minorLabels: {
      millisecond: "SSS",
      second: "s",
      minute: "HH:mm",
      hour: "HH:mm",
      weekday: "ddd D",
      day: "D",
      month: "MMM",
      year: "YYYY"
    },
    majorLabels: {
      millisecond: "HH:mm:ss",
      second: "D MMMM HH:mm",
      minute: "ddd D MMMM",
      hour: "ddd D MMMM",
      weekday: "MMMM YYYY",
      day: "MMMM YYYY",
      month: "YYYY",
      year: ""
    }
  },
};
export default class Monitoring extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buildings: ["Dwight Oliver Holmes Hall", "Towers Hall", "Kennard Hall"],
      items: []
    };
  }
  componentDidMount() {
    Axios.get(`http://localhost:4100/buildings`).then(apiResponse => {
      this.setState({ buildings: apiResponse.data.buildings });
    });
  }
  fetchOnSelect(buildingId){
    Axios
      .get(`http://localhost:4100/buildings/${buildingId}/logs`)
      .then(apiResponse => {
        const logs = apiResponse.data.logs;
        if (logs) {
          const items = logs.map(log => {
            console.log(log)
            return { start: new Date(2019, 7, 17), content: `Entry: ${log.username }`,};
          });

          this.setState({ items });
        } else {
          this.setState({ items: [] });
        }
      });
  }
  //TODO:: Build a custom dropdown that listens to state change and correctly updates list..
  render() {
    return (
      <div style={{ marginLeft: "260px", marginTop: "50px" }}>
        <span style={{ float: "right", marginRight: "30px" }}>
          <form>
            <select
              style={{ border: ".5px solid #838383", borderRadius: "40px", float: 'left'}}
              onChange={(option=>(this.fetchOnSelect(option.target.value)))}
            >
              {this.state.buildings.map(building => (
                <option value={building._id}>{building.name}</option>
              ))}
              <option></option>
            </select>
          </form>
        </span>
        <div
          style={{
            margin: "20px",
            minHeight: "70%",
            minWidth: "77%",
            border: "1px solid #BFBFBF",
            position: "absolute",
            top: "20"
          }}
        >
            <Timeline className='timeline' options={options} items={this.state.items}/>
        </div>
        <span style={{ display: "flex", flexDirection: "row", width: "90%", position: 'absolute', bottom: '70px', marginLeft: '20px' }}>
          <div className="archiveContainer">
            <p
              style={{
                marginTop: "1px",
                fontFamily: "sans-serif",
                marginLeft: "15px",
                fontSize: "12px",
                letterSpacing: ".15em",
                color: "#5A5555"
              }}
            ></p>
            <div style={{ display: "flex", marginTop: "20px" }}>
              <img
                style={{
                  maxHeight: "60px",
                  width: "60px",
                  paddingLeft: "20px"
                }}
                src={require("../../resources/file.png")}
              ></img>
              <div style={{ marginLeft: "20px" }}>
                <p
                  style={{
                    verticalAlign: "middle",
                    fontFamily: "Nunito",
                    fontSize: "18px",
                    fontStyle: "normal",
                    fontWeight: 300,
                    letterSpacing: ".15em",
                    color: "#508bff"
                  }}
                >
                  View Archive
                </p>
              </div>
            </div>
          </div>
        </span>
      </div>
    );
  }
}
