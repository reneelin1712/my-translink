import React from "react";
import Map from "../component/Map";
import Filter from "../component/Filter";
import DeckMap from "../component/DeckMap";

import Grid from "@material-ui/core/Grid";

const RouteTranslink = () => {
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Filter />
        </Grid>

        <Grid item xs={8}>
          <Map
            link={
              "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/stops_route66.json"
            }
            style_height={"90vh"}
            line={
              "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/route_66_line.json"
            }
          />

          {/* <DeckMap></DeckMap> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default RouteTranslink;
