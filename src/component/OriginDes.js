import * as React from "react";
import { Component } from "react";
import DeckGL, { ArcLayer } from "deck.gl";
import MapGL from "react-map-gl";

const TOKEN =
  "pk.eyJ1IjoicmVuZWVsaW4iLCJhIjoiY2s2bGdsM294MGFyNDNkcGZxdjRiamVtZCJ9.NXBRh4xFGeNFfqikqH97bA"; // Set your mapbox token here

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        longitude: -122.45,
        latitude: 37.78,
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
          viewState={viewport}
          layers={[
            new ArcLayer({
              data: [
                {
                  source: [-122.41669, 37.7853],
                  target: [-122.45669, 37.781]
                },
                {
                  source: [-122.41669, 37.7853],
                  target: [-122.47, 37.781]
                }
              ],
              strokeWidth: 4,
              getSourcePosition: d => d.source,
              getTargetPosition: d => d.target,
              getSourceColor: x => [0, 0, 255],
              getTargetColor: x => [0, 255, 0]
            })
          ]}
        />
      </MapGL>
    );
  }
}
