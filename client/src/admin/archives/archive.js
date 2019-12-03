import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReactTable from "react-table";
import { CSVLink } from "react-csv";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";
import "react-table/react-table.css";

const useStyles = makeStyles(theme => ({
  root: {
    width: "50%",
    marginTop: theme.spacing(3)
  },
  table: {
    minWidth: 6
  }
}));

function createData(id, name, building, date, time, status) {
  if (!status) {
    status = "granted";
  }
  return { id, name, building, date, time, status };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

export default class Archive extends Component {
  classes = useStyles;
  constructor(props) {
    super(props);
    this.state = {
      tableData: []
    };
  }
  componentWillMount() {
    this.fetchOnLoad().then(() => {});
  }

  async fetchOnLoad() {
    Axios.get(`http://localhost:4100/logs`).then(apiResponse => {
      let logRow = [];
      let logs = apiResponse.data;
      // logs.map(async log => {
      //   const apiResponse = await Axios.get(
      //     `http://localhost:4100/buildings/${log.buildingId}`
      //   );
      //   delete log.buildingId;
      //   log.buildingName = apiResponse.data[0].name;
      //   const status = "Accepted";
      //   const date = new Date(Number.parseInt(log.date));
      //   const time = date.toLocaleTimeString();
      //   const day = date.getDate();
      //   logRow.push(
      //     {id: log._id, name: log.username, building: log.buildingName, day: day, time: time, status:status}
      //   );
      // });
      // if(logRow && logRow.length){
      //   console.log(logRow)
      // }
      //this.setState({ tableData: logRow });
      logs = logs.map(log => {
        const date = new Date(Number.parseInt(log.date));
        delete log.date;
        return {
          ...log,
          status: "accepted",
          time: date.toLocaleTimeString(),
          day: date.getDate(),
          month: date.getMonth()
        };
      });
      console.log(logs);
      this.setState({ tableData: logs });
    });
  }

  render() {
    const columns = [
      { Header: "Building Name", accessor: "buildingId" },
      { Header: "Student", accessor: "username" },
      { Header: "Status", accessor: "status" },
      { Header: "date", accessor: "day" },
      { Header: "time", accessor: "time" }
    ];
    return (
      <div
        style={{ marginLeft: "240px", marginTop: "20px", marginRight: "20px" }}
      >
        <div style={{ margin: "40px" }}>
          <div style={{ display: "flex" }}>
            <img
              className="image"
              src={require("../../resources/building-grey-icon.png")}
            ></img>
            <div style={{ marginLeft: "10px" }}>
              <p className="building-name">Dwight Oliver Holmes</p>
              <hr className="title-line" />
              <p className="building-name sub-text">Tracking</p>
            </div>
          </div>
        </div>
        <ReactTable columns={columns} data={this.state.tableData}></ReactTable>
        <CSVLink
          data={this.state.tableData}
          filename={"Building_Logs.csv"}
          className="archive_button"
          target="_blank"
        >
          Download
        </CSVLink>
        ;
      </div>
    );
  }
}
