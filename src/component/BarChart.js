import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Plot from "react-plotly.js";

const TEMP = gql`
  query groupByOperator($year: String) {
    groupby_operator(
      where: { issue_year: { _eq: $year } }
      order_by: { sum: asc }
    ) {
      operator
      sum
    }
  }
`;

const BarChart = ({ year }) => {
  console.log(year);
  const [axisX, setAxisX] = useState([]);
  const [qty, setQty] = useState([]);
  const { loading, error, data } = useQuery(TEMP, {
    variables: {
      year: year.toString()
    },
    onCompleted: data => {
      setAxisX(data.groupby_operator.map(operator => operator.operator));
      setQty(data.groupby_operator.map(operator => operator.sum));
      console.log("updated");
    }
  });
  console.log(data);

  // useEffect(()=>{
  // },[data])

  // const axisX = data
  //   ? data.groupby_operator.map(operator => operator.operator)
  //   : [];
  // const qty = data ? data.groupby_operator.map(operator => operator.sum) : [];
  return (
    <div>
      <h1>bar chart</h1>
      <Plot
        data={[
          // {
          //     x: axisX,
          //     y: qty,
          //     type: 'scatter',
          //     mode: 'lines+markers',
          //     marker: { color: 'red' },
          // },
          {
            type: "bar",
            x: qty,
            y: axisX,
            orientation: "h"
          }
        ]}
        layout={{
          //   width: 800,
          //   height: 600,
          title: "Stop Inbound Qty by Operator- 2019",
          margin: {
            l: 200,
            r: 30,
            b: 30,
            t: 100,
            pad: 4
          }
        }}
      />
    </div>
  );
};

export default BarChart;
