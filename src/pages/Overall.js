import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import BarChart from "../component/BarChart";
import DonutChart from "../component/DonutChart";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import StackBar from "../component/StackBar";
import StackBarStops from "../component/StackBarStops";
import Slider from "@material-ui/core/Slider";


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
    groupby_stop2019(
      where: { time: { _eq: "All Time" } }
      order_by: { sum: desc }
      offset: 1
      limit: 15
    ) {
      name
      sum
    }
  }
`;

const marks = [
  {
    value: 2017,
    label: "2017"
  },
  {
    value: 2018,
    label: "2018"
  },
  {
    value: 2019,
    label: "2019"
  },
  {
    value: 2020,
    label: "2020"
  }
];
const Overall = () => {
  const [selectYear, setSelectYear] = useState(2019);
  const [topRoutes, setTopRoutes] = useState([]);
  const [topStops, setTopStops] = useState([]);
  const { loading, error } = useQuery(GROUP_BY_ROUTE, {
    onCompleted: data => {
      const routes = data.groupby_route2019.map(route => route.route);
      setTopRoutes(routes);
      console.log(topRoutes);
    }
  });

  const { loading: loading1, error: err1 } = useQuery(GROUP_BY_STOP, {
    onCompleted: data => {
      const stops = data.groupby_stop2019.map(stop => stop.name);
      setTopStops(stops);
      console.log(topStops);
    }
  });

  function valuetext(value) {
    return `${value}`;
  }

  // function valueLabelFormat(value) {
  //   return marks.findIndex(mark => mark.value === value) + 1;
  // }

  const handleChange = (e, v) => {
    console.log(v);
    setSelectYear(v);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid
          container
          item
          xs={12}
          spacing={1}
          align="center"
          justify="center"
          alignItems="center"
        >
          <Slider
            style={{ width: 300 }}
            defaultValue={2019}
            // valueLabelFormat={valueLabelFormat}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider-restrict"
            step={1}
            //valueLabelDisplay="auto"
            marks={marks}
            onChange={handleChange}
            min={2017}
            max={2020}
          />
        </Grid>

        <Grid item xs={5}>
          <BarChart year={selectYear} />
        </Grid>

        {/* <Grid item xs={5}>
          <DonutChart />
        </Grid>

        <Grid item xs={5}>
          {topRoutes.length > 0 ? <StackBar x={topRoutes} /> : null}
        </Grid>
        <Grid item xs={5}>
          {topStops.length > 0 ? <StackBarStops x={topStops} /> : null}
        </Grid> */}
      </Grid>
    </div>
  );
};

export default Overall;
