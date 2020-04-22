import React from "react";
import mapboxgl from "mapbox-gl";

const mapStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  left: 0,
  bottom: 0
};

mapboxgl.accessToken =
  "pk.eyJ1IjoicmVuZWVsaW4iLCJhIjoiY2s2bGdsM294MGFyNDNkcGZxdjRiamVtZCJ9.NXBRh4xFGeNFfqikqH97bA";

class Realtime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // lng: 153.0137,
      // lat: -27.4975,
      lng: 36.19583044471166,
      lat: 44.17716381518971,
      zoom: 2
    };
  }

  componentDidMount() {
    var map = (window.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      zoom: this.state.zoom,
      center: [this.state.lng, this.state.lat],
      pitch: 60,
      antialias: true // create the gl context with MSAA antialiasing, so custom layers are antialiased
    }));

    var url = "https://wanderdrone.appspot.com/";
    map.on("load", function() {
      window.setInterval(function() {
        map.getSource("drone").setData(url);
      }, 2000);

      map.addSource("drone", { type: "geojson", data: url });
      map.addLayer({
        id: "drone",
        type: "symbol",
        source: "drone",
        layout: {
          "icon-image": "rocket-15"
        }
      });
    });
  }

  render() {
    return (
      <div>
        <div ref={el => (this.mapContainer = el)} style={mapStyle} />
      </div>
    );
  }
}

export default Realtime;
