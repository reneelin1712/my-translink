import React, { useState, useContext } from "react";
import MaterialTable from "material-table";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import { StopContext } from "../context/StopProvider";

const STOP_NAMES = gql`
  query stop_names {
    stop_mapping {
      stop_id
      stop_name
      stop_lat
      stop_lon
    }
  }
`;

const Filter = () => {
  const [stop, setStop] = useContext(StopContext);
  const [stopNames, setStopNames] = useState([]);
  const { loading, error } = useQuery(STOP_NAMES, {
    onCompleted: data => {
      console.log(data);
      const rowData = data.stop_mapping.map(stop => {
        return {
          stop_id: stop.stop_id,
          stop_name: stop.stop_name,
          stop_lat: stop.stop_lat,
          stop_lon: stop.stop_lon
        };
      });
      setStopNames(rowData);
    }
  });

  return (
    <div>
      <MaterialTable
        minRows={10}
        columns={[
          {
            width: 110,
            title: "Stop ID",
            field: "stop_id"
          },
          { title: "Stop Name", field: "stop_name" }
        ]}
        data={stopNames}
        title="Stations"
        detailPanel={rowData => {}}
        onRowClick={(event, rowData) => {
          console.log(rowData.stop_lat);
          setStop({
            stopID: rowData.stop_id,
            lat: rowData.stop_lat,
            lon: rowData.stop_lon
          });
        }}
        options={{
          maxBodyHeight: "70vh",
          minBodyHeight: "70vh",
          pageSize: 6,
          pageSizeOptions: [6, 10, 20, 25, 50, 100]
        }}
      />
    </div>
  );
};

export default Filter;
