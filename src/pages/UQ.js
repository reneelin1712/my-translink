import React, { useState, useContext } from "react";
import MapGL, { Source, Layer } from "react-map-gl";
import DeckGL, { ArcLayer, HexagonLayer } from "deck.gl";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  Marker
} from "react-map-gl";
// import { json201912 } from "./deckData";
import Icon from "@material-ui/core/Icon";
import { orange } from "@material-ui/core/colors";
import { StopContext } from "../context/StopProvider";
import { DataContext } from "../context/DataProvider";

const shapeData =
  "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/shapes_to_uq_PointsToLine.json";

const TOKEN =
  "pk.eyJ1IjoicmVuZWVsaW4iLCJhIjoiY2s2bGdsM294MGFyNDNkcGZxdjRiamVtZCJ9.NXBRh4xFGeNFfqikqH97bA"; // Set your mapbox token here

const UQ = () => {
  const [data, setData] = useContext(DataContext);
  const [viewport, setViewport] = useState({
    longitude: 153.0137,
    latitude: -27.4975,
    zoom: 12,
    pitch: 45
    // bearing: -27.396674584323023
  });

  return (
    <div>
      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={TOKEN}
      >
        <h1>A SIMPLE CASE STUDY</h1>
        <Source id="uq" type="geojson" data={shapeData}>
          <Layer
            id="uq"
            type="line"
            source="uq"
            layout={{
              "line-join": "round",
              "line-cap": "round"
            }}
            paint={{
              // "line-color": "#FF4500",
              // "line-color": [
              //   "match",
              //   ["get", "route_id"],
              //   "412",
              //   "#fbb03b",
              //   "Black",
              //   "#223b53",
              //   "Hispanic",
              //   "#e55e5e",
              //   "Asian",
              //   "#3bb2d0",
              //   /* other */ "#ccc"
              // ],
              "line-color": {
                property: "route_id",
                stops: [
                  [28, "#fbb03b"],
                  [29, "#223b53"],
                  [66, "#e55e5e"],
                  [139, "#3bb2d0"],
                  [169, "orange"],
                  [192, "red"],
                  [209, "blue"],
                  [402, "purple"],
                  [411, "yellow"],
                  [412, "brown"],
                  [414, "pink"],
                  [427, "navy"],
                  [428, "green"],
                  [432, "#fff"]
                ]
              },
              "line-width": 7
            }}
          />
        </Source>
        <DeckGL
          controller={true}
          viewState={viewport}
          // effects={[lightingEffect]}
          layers={[
            new HexagonLayer({
              data:
                //try11,
                // sourceData,
                data.hexagonData,
              getPosition: d => [d.lon, d.lat],
              // strokeWidth: 4,
              //getElevationWeight: d => d.n_killed * 2 + d.n_injured,
              getElevationWeight: d => d.qty,
              elevationScale: 50,
              radius: 100,
              extruded: true,
              // onHover: info => {
              //   // console.log(info);
              //   if (info.object) {
              //     console.log(info.object);
              //     setTooltipInfo({
              //       stopName: info.object.points[0].stopName,
              //       stopQty: info.object.points[0].qty,
              //       pointerX: info.x,
              //       pointerY: info.y
              //     });
              //   } else {
              //     setTooltipInfo({
              //       stopQty: null
              //     });
              //   }
              // },
              pickable: true,
              opacity: 0.6,
              coverage: 0.88,
              // material,
              // colorRange,
              upperPercentile: 100
              // elevationRange: [0, 3000],
              // transitions: {
              //   elevationScale: 3000
              // }
              // lowerPercentile: 50
              // getSourceColor: x => [0, 0, 255],
              // getTargetColor: x => [0, 255, 0]
            })
          ]}
        >
          {/* {_renderTooltip()} */}
        </DeckGL>
      </MapGL>
    </div>
  );
};

export default UQ;
