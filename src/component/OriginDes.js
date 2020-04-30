import * as React from "react";
import { Component } from "react";
import DeckGL, { ArcLayer } from "deck.gl";
import MapGL from "react-map-gl";
import {trips,temp} from "./tripData"

const TOKEN =
  "pk.eyJ1IjoicmVuZWVsaW4iLCJhIjoiY2s2bGdsM294MGFyNDNkcGZxdjRiamVtZCJ9.NXBRh4xFGeNFfqikqH97bA"; // Set your mapbox token here

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        longitude: 153.019079,
        latitude: -27.467834,
        zoom: 9,
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
          viewState={viewport}
          layers={[
            new ArcLayer({
              data: temp,
              strokeWidth: 4,
              getWidth:d=>d.qty/100,
              getSourcePosition: d => d.org,
              getTargetPosition: d => d.des,
              getSourceColor: x => [0, 0, 255],
              getTargetColor: x => [0, 255, 0]
            })
          ]}
        />
      </MapGL>
    );
  }
}
