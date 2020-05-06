import React, { useState, useContext, useEffect } from "react";
import DeckGL, { ArcLayer, HexagonLayer } from "deck.gl";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import MapGL, {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  Marker
} from "react-map-gl";
import { json201912 } from "./deckData";
import Icon from "@material-ui/core/Icon";
import { orange } from "@material-ui/core/colors";
import { StopContext } from "../context/StopProvider";

const TOKEN =
  "pk.eyJ1IjoicmVuZWVsaW4iLCJhIjoiY2s2bGdsM294MGFyNDNkcGZxdjRiamVtZCJ9.NXBRh4xFGeNFfqikqH97bA"; // Set your mapbox token here
const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const sourceData = json201912;
// "https://storage.googleapis.com/geojson_translink/geoJson201912.json";

const fullscreenControlStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

const navStyle = {
  position: "absolute",
  top: 36,
  left: 0,
  padding: "10px",
  zIndex: 9999
};

const scaleControlStyle = {
  position: "absolute",
  bottom: 36,
  left: 0,
  padding: "10px"
};

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000]
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000]
});

const lightingEffect = new LightingEffect({
  ambientLight,
  pointLight1,
  pointLight2
});
const material = {
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51]
};

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const DeckMap = () => {
  const [stop, setStop] = useContext(StopContext);
  const [viewport, setViewport] = useState({
    longitude: 153.006069,
    latitude: -27.465841,
    zoom: 9,
    bearing: 0,
    pitch: 45
  });

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
      <div style={fullscreenControlStyle}>
        <FullscreenControl />
      </div>
      <div style={navStyle}>
        <NavigationControl
        // showCompass={true}
        // onViewportChange={viewport => this.setState({ viewport })}
        />
      </div>
      <div style={scaleControlStyle}>
        <ScaleControl />
      </div>
      <Marker
        latitude={stop.lat}
        longitude={stop.lon}
        offsetLeft={-20}
        offsetTop={-10}
      >
        {/* <div style={{ color: "orange", fontWeight: "bold" }}>
            You are here
          </div> */}

        <Icon style={{ color: orange[500] }}>train</Icon>
      </Marker>

      <DeckGL
        controller={true}
        viewState={viewport}
        effects={[lightingEffect]}
        colorRange={colorRange}
        material={material}
        layers={[
          new HexagonLayer({
            data:
              //try11,
              sourceData,
            getPosition: d => [d.lon, d.lat],
            // strokeWidth: 4,
            //getElevationWeight: d => d.n_killed * 2 + d.n_injured,
            getElevationWeight: d => d.qty,
            elevationScale: 50,
            radius: 100,
            extruded: true,
            onHover: ({ object, x, y }) => {
              // const el = document.getElementById("tooltip");
              if (object) {
                const { points } = object;
                // console.log(points[0]);
                //   el.innerHTML = `<div><h5>Name ${
                //     points[0].stopName
                //   }</h5><h5>Qty ${points[0].qty * 100}</h5></div>`;
                //   el.style.display = "block";
                //   el.style.opacity = 0.9;
                //   el.style.left = x + "px";
                //   el.style.top = y + "px";
                // } else {
                //   el.style.opacity = 0.0;
              }

              // console.log(object);
            },
            pickable: true,
            opacity: 0.6,
            coverage: 0.88
            // colorRange   update this once know light
            // lowerPercentile: 50
            // getSourceColor: x => [0, 0, 255],
            // getTargetColor: x => [0, 255, 0]
          })
        ]}
      />
    </MapGL>
  );
};

export default DeckMap;
