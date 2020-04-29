import * as React from "react";
import { Component } from "react";
import DeckGL, { ArcLayer, HexagonLayer } from "deck.gl";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import MapGL from "react-map-gl";
// import { testfile } from "./test";

const TOKEN =
  "pk.eyJ1IjoicmVuZWVsaW4iLCJhIjoiY2s2bGdsM294MGFyNDNkcGZxdjRiamVtZCJ9.NXBRh4xFGeNFfqikqH97bA"; // Set your mapbox token here
const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

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

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        longitude: -73,
        latitude: 40,
        zoom: 11,
        bearing: 0,
        pitch: 30
      }
    };
  }

  _onViewportChange = viewport => {
    this.setState({ viewport });
  };

  render() {
    const { viewport } = this.state;

    return (
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        maxPitch={85}
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/dark-v9"
      >
        <DeckGL
          controller={true}
          viewState={viewport}
          effects={[lightingEffect]}
          colorRange={colorRange}
          material={material}
          layers={[
            new HexagonLayer({
              data: testfile,
              getPosition: d => [d.longitude, d.latitude],
              // strokeWidth: 4,
              getElevationWeight: d => d.n_killed * 2 + d.n_injured,
              elevationScale: 50,
              radius: 1609,
              extruded: true,
              onHover: this.props.onHover,
              pickable: true,
              opacity: 0.6,
              coverage: 0.88
              // lowerPercentile: 50
              // getSourceColor: x => [0, 0, 255],
              // getTargetColor: x => [0, 255, 0]
            })
          ]}
        />
      </MapGL>
    );
  }
}
