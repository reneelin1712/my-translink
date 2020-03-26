import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Map from "./component/Map";
import LineChart from "./component/LineChart";
import Filter from "./component/Filter";
import Nav from "./component/Nav";

import Grid from "@material-ui/core/Grid";

function App() {
  return (
    <div className="App">
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Nav />
        </Grid>

        <Grid item xs={4}>
          <Filter />
        </Grid>

        <Grid item xs={8}>
          <Map />
          <LineChart />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
