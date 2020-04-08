import React from "react";
import Map from "../component/Map";
import LineChart from "../component/LineChart";
import Filter from "../component/Filter";

import Grid from "@material-ui/core/Grid";

const Station = () => {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Filter />
        </Grid>

        <Grid item xs={8}>
          <Map
            link={
              "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/temp.json"
            }
            style_height={"55vh"}
          />
          <LineChart />
        </Grid>
      </Grid>
    </div>
  );
};

export default Station;
