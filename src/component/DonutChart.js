import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Plot from "react-plotly.js";

const QTY_BY_ZONE = gql`
  query groupByZone {
    groupby_zone2019 {
      zone_id
      sum
    }
  }
`;

const DonutChart = () => {
  const { loading, error, data } = useQuery(QTY_BY_ZONE);
  console.log(data);

  const labels = data ? data.groupby_zone2019.map(zone => zone.zone_id) : [];
  const values = data ? data.groupby_zone2019.map(zone => zone.sum) : [];
  return (
    <div>
      <h1>Donut chart</h1>
      <Plot
        data={[
          {
            values: values,
            labels: labels,
            domain: { column: 0 },
            name: "GHG Emissions",
            hoverinfo: "label+percent+name",
            hole: 0.4,
            type: "pie"
          }
        ]}
        layout={{
          //   width: 500,
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
        styles={{ marginLeft: 50 }}
      />
    </div>
  );
};

export default DonutChart;
