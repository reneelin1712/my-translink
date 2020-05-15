import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import grey from "@material-ui/core/colors/grey";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import { StopProvider } from "./context/StopProvider";
import { DataProvider } from "./context/DataProvider";
import { SelectionProvider } from "./context/SelectionProvider";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: grey[50]
    }
  }
});

const client = new ApolloClient({
  uri: "http://localhost:8080/v1/graphql"
  //uri: "http://34.70.125.163:8080/v1/graphql"
});

ReactDOM.render(
  <StopProvider>
    <DataProvider>
      <SelectionProvider>
        <ThemeProvider theme={darkTheme}>
          <ApolloProvider client={client}>
            <CssBaseline />
            <App />
          </ApolloProvider>
        </ThemeProvider>
      </SelectionProvider>
    </DataProvider>
  </StopProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
