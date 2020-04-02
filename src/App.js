import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from "./component/Nav";
import Station from "./pages/Station";
import Overall from "./pages/Overall";

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
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
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
