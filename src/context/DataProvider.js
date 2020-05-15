import React, { createContext, useState, useEffect } from "react";

export const DataContext = createContext();

export const DataProvider = props => {
  const [deckData, setDeckData] = useState({
    hexagonData: null,
    trips01: null,
    trips03: null,
    trpis2uq08: null,
    trips2uq12: null
  });

  useEffect(() => {
    // fetch(
    //   "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/deckgldata/tripData1.js"
    // )
    //   .then(response => response.json())
    //   .then(data => {
    //     setDeckData({ ...deckData, trips01: data });
    //   });

    // fetch(
    //   "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/deckgldata/tripData3.js"
    // )
    //   .then(response => response.json())
    //   .then(data => {
    //     setDeckData({ ...deckData, trips03: data });
    //   });

    // fetch(
    //   "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/deckgldata/hexagonData.js"
    // )
    //   .then(response => response.json())
    //   .then(data => {
    //     setDeckData({ ...deckData, hexagonData: data });
    //   });

    const p1 = fetch(
      "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/deckgldata/tripData1.js"
    );

    const p2 = fetch(
      "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/deckgldata/tripData3.js"
    );
    const p3 = fetch(
      "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/deckgldata/hexagonData.js"
    );

    const uq1 = fetch(
      "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/deckgldata/trips2uq201908am.json"
    );

    const uq2 = fetch(
      "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/deckgldata/trips2uq201912am.json"
    );

    const urls = [
      "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/deckgldata/tripData1.js",
      "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/deckgldata/tripData3.js",
      "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/deckgldata/hexagonData.js",
      "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/deckgldata/trips2uq201908am.json",
      "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/deckgldata/trips2uq201912am.json"
    ];

    Promise.all(urls.map(url => fetch(url).then(res => res.json())))
      .then(data =>
        // setDeckData({ ...deckData, trips03: data[0], hexagonData: data[1] });
        // console.log(data);
        {
          setDeckData({
            ...deckData,
            trips01: data[0],
            trips03: data[1],
            hexagonData: data[2],
            trips2uq08: data[3],
            trips2uq12: data[4]
          });
        }
      )
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <DataContext.Provider value={[deckData]}>
      {props.children}
    </DataContext.Provider>
  );
};
