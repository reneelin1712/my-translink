import React, { useState, useContext, useEffect } from "react";
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
  // const [last, setLast] = useState([]);
  const [forecast, setForecast] = useState([13317, 18000, 19000, 20000]);

  const { loading, error } = useQuery(STOP_INBOUND_QTY_2019, {
    variables: { stopID: stop.stopID },
    onCompleted: data => {
      console.log(data);
      const tempX = data.stops_inbound_qty_2019.map(row => row.month);
      const unique = [...new Set(tempX)];
      const forecast3month = [...unique, "2020-01", "2020-02", "2020-03"];
      console.log(forecast3month);
      setXAxis(forecast3month);

      const tempY = data.stops_inbound_qty_2019
        .filter(row => row.time == "Weekday (12:00am-8:29:59am)")
        .map(row => row.sum);
      console.log(tempY);
      const forecast3 = [...tempY];
      setYAxis(forecast3);
      // setLast(tempY[-1]);
    }
  });

  useEffect(() => {
    console.log(yAxis);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: stop.stopID })
    };

    fetch(
      //"https://cors-anywhere.herokuapp.com/http://35.194.55.164:5000/api/forecast",
      "http://127.0.0.1:5000/api/forecast",
      requestOptions
    )
      .then(res => res.json())
      .then(data => {
        console.log(data.forecast_central);
        const concatForcast = [...yAxis, data.forecast_central];
        console.log(concatForcast);
        setForecast([15024, 17912, 14311, 16817, 17311, 19559]);
      });

    fetch(
      //"https://cors-anywhere.herokuapp.com/http://35.194.55.164:5000/api/time"
      "http://127.0.0.1:5000/api/time"
    )
      .then(res => res.json())
      .then(data => console.log(data));
  }, [stop.stopID]);

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
        },
        {
          x: ["2020-01", "2020-02", "2020-03"],
          y: forecast,
          type: "scatter",
          mode: "lines+markers",
          marker: { color: "red" },
          line: { color: "rgb(55, 128, 191)" }
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
