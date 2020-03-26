import React, { useState, useContext, useEffect } from "react";
import MapGL, { Source, Layer, Popup } from "react-map-gl";

import { StopContext } from "../context/StopProvider";

const temp = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { stopID: "600018", qty: 61.7602 },
      geometry: { type: "Point", coordinates: [153.026069, -27.465841] }
    },
    {
      type: "Feature",
      properties: { stopID: "11168", qty: 17.3429 },
      geometry: { type: "Point", coordinates: [153.019148, -27.473482] }
    },
    {
      type: "Feature",
      properties: { stopID: "600014", qty: 17.3378 },
      geometry: { type: "Point", coordinates: [153.033762, -27.456135] }
    },
    {
      type: "Feature",
      properties: { stopID: "10802", qty: 13.7189 },
      geometry: { type: "Point", coordinates: [153.019082, -27.473363] }
    },
    {
      type: "Feature",
      properties: { stopID: "600811", qty: 11.6792 },
      geometry: { type: "Point", coordinates: [153.428396, -28.001641] }
    },
    {
      type: "Feature",
      properties: { stopID: "600801", qty: 10.5684 },
      geometry: { type: "Point", coordinates: [153.431141, -28.035761] }
    },
    {
      type: "Feature",
      properties: { stopID: "600006", qty: 7.7354 },
      geometry: { type: "Point", coordinates: [153.022995, -27.481832] }
    },
    {
      type: "Feature",
      properties: { stopID: "600823", qty: 7.2681 },
      geometry: { type: "Point", coordinates: [153.413509, -27.967861] }
    },
    {
      type: "Feature",
      properties: { stopID: "19064", qty: 7.1886 },
      geometry: { type: "Point", coordinates: [153.022209, -27.481023] }
    },
    {
      type: "Feature",
      properties: { stopID: "600012", qty: 6.9238 },
      geometry: { type: "Point", coordinates: [153.018521, -27.475067] }
    }
  ]
};

const Map = () => {
  const [stop, setStop] = useContext(StopContext);
  console.log(stop.lat);

  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: stop.lat,
    longitude: stop.lon,
    zoom: 12
  });

  useEffect(() => {
    setViewport({ ...viewport, latitude: stop.lat, longitude: stop.lon });
  }, [stop.lat]);

  // popup tooltip
  const [showPopup, setShowPopup] = useState(false);
  const [lat, setLat] = useState(-27.465841);
  const [lon, setLon] = useState(153.026069);
  const [property, setProperty] = useState("");

  // chart update
  // const [stopID, setStopID] = useState(600018);

  const _onClick = e => {
    const {
      features,
      srcEvent: { offsetX, offsetY }
    } = e;
    console.log(features[0]);
    if (features[0] && features[0].properties.qty == null) {
      setShowPopup(false);
    } else {
      setShowPopup(true);
      setLat(features[0].geometry.coordinates[1]);
      setLon(features[0].geometry.coordinates[0]);
      setProperty(features[0].properties.qty);
      // console.log(features[0].properties.qty);
      // setStopID(features[0].properties.stopID);
      console.log(property);
      setStop({ ...stop, stopID: features[0].properties.stopID });
    }
  };

  return (
    <MapGL
      {...viewport}
      width="65vw"
      height="55vh"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onClick={_onClick}
    >
      {showPopup && property !== "" && (
        <Popup
          latitude={lat}
          longitude={lon}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setShowPopup(false)}
          anchor="top"
        >
          {/* <div>{property}</div> */}
          <div style={{ backgroundColor: "black" }}>
            <h1>{property}</h1>
          </div>
        </Popup>
      )}
      <Source id="my-stop" type="geojson" data={temp}>
        <Layer
          id="point"
          type="circle"
          paint={{
            "circle-radius": 10,
            "circle-color": [
              "step",
              ["get", "qty"],
              "#51bbd6",
              10,
              "#f1f075",
              61,
              "#f28cb1"
            ],
            "circle-radius": ["step", ["get", "qty"], 6, 7, 13, 20, 25],
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff"
          }}
        />
      </Source>
    </MapGL>
  );
};

export default Map;
