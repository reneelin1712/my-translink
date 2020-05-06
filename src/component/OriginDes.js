import React, { useState, useContext, useEffect } from "react";
import DeckGL, { ArcLayer } from "deck.gl";
import MapGL, { Marker } from "react-map-gl";
import { trips, temp } from "./tripData";
import Icon from "@material-ui/core/Icon";
import { orange } from "@material-ui/core/colors";
import { StopContext } from "../context/StopProvider";

const TOKEN =
  "pk.eyJ1IjoicmVuZWVsaW4iLCJhIjoiY2s2bGdsM294MGFyNDNkcGZxdjRiamVtZCJ9.NXBRh4xFGeNFfqikqH97bA"; // Set your mapbox token here

const OriginDes = () => {
  const [viewport, setViewport] = useState({
    // width: 400,
    // height: 400,
    longitude: 153.019079,
    latitude: -27.467834,
    zoom: 9,
    bearing: 0,
    pitch: 30
    // transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
    // transitionDuration: "auto"
  });

  const [stop, setStop] = useContext(StopContext);

  const _onViewportChange = viewport => {
    setViewport(viewport);
  };

  useEffect(() => {
    setViewport({ ...viewport, latitude: stop.lat, longitude: stop.lon });
    // setLat(stop.lat);
    // setLon(stop.lon);
  }, [stop.lat]);

  return (
    <MapGL
      {...viewport}
      width="100%"
      height="100%"
      maxPitch={85}
      onViewportChange={_onViewportChange}
      mapboxApiAccessToken={TOKEN}
      mapStyle="mapbox://styles/mapbox/dark-v9"
    >
      <Marker
        latitude={stop.lat}
        longitude={stop.lon}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <Icon style={{ color: orange[500] }}>train</Icon>
      </Marker>
      <DeckGL
        viewState={viewport}
        layers={[
          new ArcLayer({
            data: trips,
            strokeWidth: 4,
            getWidth: d => d.qty / 500,
            getSourcePosition: d => d.org,
            getTargetPosition: d => d.des,
            getSourceColor: x => [0, 0, 255],
            getTargetColor: x => [0, 255, 0]
          })
        ]}
      />
    </MapGL>
  );
};

export default OriginDes;
