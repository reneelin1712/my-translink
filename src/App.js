import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from "./component/Nav";
import Station from "./pages/Station";
import Overall from "./pages/Overall";
import Hexagon from "./pages/Hexagon";
import ThreeD from "./pages/ThreeD";
import Realtime from "./pages/Realtime";
import OrigDes from "./pages/OrigDes";
import SelfDrivingCar from "./pages/SelfDrivingCar";
import Monitor from "./pages/Monitor";

export default function App() {
  return (
    <Router>
      <div>
        <Nav />

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/station">
            <Station />
          </Route>
          <Route path="/overall">
            <Overall />
          </Route>

          <Route path="/hexagon">
            <Hexagon />
          </Route>

          <Route path="/origdes">
            <OrigDes />
          </Route>

          <Route path="/realtime">
            <Realtime />
          </Route>

          <Route path="/threed">
            <ThreeD />
          </Route>

          <Route path="/selfdriving">
            <SelfDrivingCar />
          </Route>

          <Route path="/monitor">
            <Monitor />
          </Route>

          <Route path="/">
            <Station />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

// import React from "react";
// import logo from "./logo.svg";
// import "./App.css";
// import Map from "./component/Map";
// import LineChart from "./component/LineChart";
// import Filter from "./component/Filter";
// import Nav from "./component/Nav";

// import Grid from "@material-ui/core/Grid";

// function App() {
//   return (
//     <div className="App">
//       <Grid container spacing={1}>
//         <Grid item xs={12}>
//           <Nav />
//         </Grid>

//         <Grid item xs={4}>
//           <Filter />
//         </Grid>

//         <Grid item xs={8}>
//           <Map />
//           <LineChart />
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// export default App;
