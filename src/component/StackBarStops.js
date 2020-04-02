import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import Plot from "react-plotly.js";

const GROUP_BY_ROUTE_1 = gql`
query groupByStop_1($stops:[String!]) {
  groupby_stop2019(where: {name:{_in:$stops},time: {_eq: "Weekday (12:00am-8:29:59am)"}}) {
    name
    sum
  }
}
`;
const GROUP_BY_ROUTE_2 = gql`
query groupByStop_2($stops:[String!]) {
  groupby_stop2019(where: {name:{_in:$stops},time: {_eq: "Weekday (8:30am-2:59:59pm)"}}) {
    name
    sum
  }
}
`;

const GROUP_BY_ROUTE_3 = gql`
query groupByStop_3($stops:[String!]) {
  groupby_stop2019(where: {name:{_in:$stops},time: {_eq: "Weekday (3:00pm-6:59:59pm)"}}) {
    name
    sum
  }
}
`;

const GROUP_BY_ROUTE_4 = gql`
query groupByStop_4($stops:[String!]) {
  groupby_stop2019(where: {name:{_in:$stops},time: {_eq: "Weekday (8:30am-2:59:59pm)"}}) {
    name
    sum
  }
}
`;

const GROUP_BY_ROUTE_5 = gql`
query groupByStop_5($stops:[String!]) {
  groupby_stop2019(where: {name:{_in:$stops},time: {_eq: "Weekend"}}) {
    name
    sum
  }
}
`;

const StackBar = x => {
  console.log(x.x);
  const [x1, setX1] = useState([]);
  const [y1, setY1] = useState([]);
  const [x2,setX2] =useState([]);
  const [y2, setY2] = useState([]);
  const [x3,setX3] =useState([]);
  const [y3, setY3] = useState([]);
  const [x4,setX4] =useState([]);
  const [y4, setY4] = useState([]);
  const [x5,setX5] =useState([]);
  const [y5, setY5] = useState([]);

  const { loading, error } = useQuery(GROUP_BY_ROUTE_1, {
    variables: { stops: x.x},
    onCompleted: data => {
      console.log("why no results");
      console.log(data);
      const x_temp = data.groupby_stop2019.map(stop => stop.name);
      const y_temp = data.groupby_stop2019.map(route => route.sum);
      setX1(x_temp);
      setY1(y_temp);
    }
  });

  const { loading:loading1, error:error1 } = useQuery(GROUP_BY_ROUTE_2, {
    variables: { stops: x.x },
    onCompleted: data => {
      console.log(data);
      const x_temp = data.groupby_stop2019.map(stop => stop.name);
      const y_temp = data.groupby_stop2019.map(route => route.sum);
      setX2(x_temp);
      setY2(y_temp);
    }
  });

  const { loading:loading2, error:error2} = useQuery(GROUP_BY_ROUTE_3, {
    variables: { stops: x.x },
    onCompleted: data => {
      console.log(data);
      const x_temp = data.groupby_stop2019.map(stop => stop.name);
      const y_temp = data.groupby_stop2019.map(route => route.sum);
      setX3(x_temp);
      setY3(y_temp);
    }
  });

  const { loading:loading3, error:error3 } = useQuery(GROUP_BY_ROUTE_4, {
    variables: { stops: x.x },
    onCompleted: data => {
      console.log(data);
      const x_temp = data.groupby_stop2019.map(stop => stop.name);
      const y_temp = data.groupby_stop2019.map(route => route.sum);
      setX4(x_temp);
      setY4(y_temp);
    }
  });

  const { loading:loading4, error:error4 } = useQuery(GROUP_BY_ROUTE_5, {
    variables: { stops: x.x },
    onCompleted: data => {
      console.log(data);
      const x_temp = data.groupby_stop2019.map(stop => stop.name);
      const y_temp = data.groupby_stop2019.map(route => route.sum);
      setX5(x_temp);
      setY5(y_temp);
    }
  });


  return (
    <div>
      <h1>bar chart</h1>
      <Plot
        data={[
            {
                x: x.x,
                y: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                type: "bar"
              },
          {
            x: x1,
            y: y1,
            type: "bar"
          },
          {
            x: x2,
            y: y2,
            type: "bar"
          },
          {
            x: x3,
            y: y3,
            type: "bar"
          },
          {
            x: x4,
            y: y4,
            type: "bar"
          },
          {
            x: x5,
            y: y5,
            type: "bar"
          }

        ]}
        layout={{
          barmode: 'stack',
          //   width: 800,
          //   height: 600,
          xaxis:{
            
            type:'category'
            },
          title: "Stop Inbound Qty by Operator- 2019"
          //   margin: {
          //     l: 200,
          //     r: 30,
          //     b: 30,
          //     t: 100,
          //     pad: 4
          //   }
        }}
      />
    </div>
  );
};

export default StackBar;
