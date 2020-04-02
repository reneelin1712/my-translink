import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import BarChart from "../component/BarChart";
import DonutChart from "../component/DonutChart";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import StackBar from "../component/StackBar";
import StackBarStops from "../component/StackBarStops"

const GROUP_BY_ROUTE = gql`
  query groupByRoute2019 {
    groupby_route2019(
      where: { time: { _eq: "All Time" } }
      order_by: { sum: desc }
      offset: 3
      limit: 15
    ) {
      route
      sum
    }
  }
`;

const GROUP_BY_STOP = gql`
query groupByStop2019 {
    groupby_stop2019(where: {time: {_eq: "All Time"}},order_by:{sum:desc},offset:1,limit:15) {
      name
      sum
    }
  }
`;


const Overall = () => {
  const [topRoutes, setTopRoutes] = useState([]);
  const [topStops, setTopStops] = useState([]);
  const { loading, error } = useQuery(GROUP_BY_ROUTE, {
    onCompleted: data => {
      const routes = data.groupby_route2019.map(route => route.route);
      setTopRoutes(routes);
      console.log(topRoutes);
    }
  });
 
  const { loading:loading1, error:err1 } = useQuery(GROUP_BY_STOP, {
    onCompleted: data => {
      const stops = data.groupby_stop2019.map(stop => stop.name);
      setTopStops(stops);
      console.log(topStops);
    }
  });

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={5} spacing={1}>
          <BarChart />
        </Grid>

        <Grid item xs={5} spacing={1}>
          <DonutChart />
        </Grid>

        <Grid item xs={5}>
          {topRoutes.length>0 ? <StackBar x={topRoutes} /> : null}
        </Grid>
        <Grid item xs={5}>

        {topStops.length>0 ? <StackBarStops x={topStops} /> : null}
        </Grid>
      </Grid>
    </div>
  );
};

export default Overall;
