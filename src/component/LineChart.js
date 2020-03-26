import React, { useState, useContext } from "react";
import Plot from "react-plotly.js";

import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import { StopContext } from "../context/StopProvider";

const STOP_INBOUND_QTY_2019 = gql`
  query stops_inbound_qty_2019($stopID: String) {
    stops_inbound_qty_2019(where: { origin_stop: { _eq: $stopID } }) {
      origin_stop
      month
      time
      sum
    }
  }
`;

const LineChart = () => {
  const [stop, setStop] = useContext(StopContext);
  console.log(stop.stopID);

  const [yAxis, setYAxis] = useState([]);
  const [xAxis, setXAxis] = useState([]);

  const { loading, error } = useQuery(STOP_INBOUND_QTY_2019, {
    variables: { stopID: stop.stopID },
    onCompleted: data => {
      console.log(data);
      const tempX = data.stops_inbound_qty_2019.map(row => row.month);
      const unique = [...new Set(tempX)];
      setXAxis(unique);

      const tempY = data.stops_inbound_qty_2019
        .filter(row => row.time == "Weekday (12:00am-8:29:59am)")
        .map(row => row.sum);
      console.log(tempY);
      setYAxis(tempY);
    }
  });

  return (
    <Plot
      data={[
        {
          x: xAxis,
          y: yAxis,
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "red" },
          line: { color: "#red" }
        }
      ]}
      layout={{
        width: 820,
        height: 200,
        //  title: "Traffic Inbound Flow"
        margin: {
          l: 30,
          r: 5,
          b: 30,
          t: 10,
          pad: 2
        },
        plot_bgcolor: "#FFF3",
        paper_bgcolor: "#FFF3",
        xaxis: {
          showgrid: false
        },
        yaxis: {
          showgrid: true,
          gridcolor: "#636363"
        }
      }}
    />
  );
};

export default LineChart;
