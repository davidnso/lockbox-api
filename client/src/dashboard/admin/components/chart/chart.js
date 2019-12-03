import React, { Component } from 'react'
import Chart from 'react-apexcharts'
import Timeline from 'react-visjs-timeline'
import Axios from 'axios'


const CSS_String = 'margin-top:50px;'
const options = {
    width: '100%',
    height: '450px',
    stack: true,
    showMajorLabels: true,
    showCurrentTime: true,
    zoomMin: 1000000,
    type: 'box',
    format: {
      minorLabels: {
        minute: 'h:mma',
        hour: 'ha'
      }
    },
    style: CSS_String
  }
  const items = [{
    start: new Date(2010, 7, 15),
    content: 'Trajectory A',
  },
  {
    start: new Date(2010, 7, 15),
    content: 'Trajectory A',
  },{
    start: new Date(2010, 7, 17),
    content: 'Trajectory A',
  }]

  
export default class BuildingChart extends Component {
    
  constructor(props){
    super(props);

    this.state = {
      items: [],
      currentBuilding: ''
    }

    Axios.get(`http://localhost:4100/buildings/5d881a2b1c9d440000c7dd0d/logs`).then(apiResponse=>{
      const logs = apiResponse.data.logs
      const items = logs.map(log=>{
        return {start:new Date(2010, 7, 17), content: log.username}
      });
      this.setState({items});
    })
    
  }
  
  render(){
    return(
    <div>
       <Timeline className='timeline' options={options} items={items}/>
    </div>)
  }
}
