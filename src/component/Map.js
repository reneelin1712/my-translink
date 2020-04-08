import React, { useState, useContext, useEffect } from "react";
import MapGL, { Source, Layer, Popup } from "react-map-gl";

import { StopContext } from "../context/StopProvider";

// const temp = {"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[153.023547,-27.467949],[153.023961,-27.468532],[153.0192,-27.465942],[153.018344,-27.465855],[153.030604,-27.494044],[153.030193,-27.493932],[153.034195,-27.496767],[153.033846,-27.496841],[153.019082,-27.473363],[153.019148,-27.473482],[153.024777,-27.497983],[153.024484,-27.498096],[153.018263,-27.497734],[153.018077,-27.49805],[153.028213,-27.484505],[153.021835,-27.480721],[153.028393,-27.484413],[153.022209,-27.481023],[153.018234,-27.452195],[153.018135,-27.451851],[153.02533,-27.449792],[153.024912,-27.449862],[153.01511,-27.458866],[153.015067,-27.459122],[153.029133,-27.44699],[153.029207,-27.447393]]}}
// const tempdata = {
//   'type': 'Feature',
//   'properties': {},
//   'geometry': {
//   'type': 'LineString',
//   'coordinates':[[153.023547,-27.467949],[153.023961,-27.468532],[153.0192,-27.465942],[153.018344,-27.465855],[153.030604,-27.494044],[153.030193,-27.493932],[153.034195,-27.496767],[153.033846,-27.496841],[153.019082,-27.473363],[153.019148,-27.473482],[153.024777,-27.497983],[153.024484,-27.498096],[153.018263,-27.497734],[153.018077,-27.49805],[153.028213,-27.484505],[153.021835,-27.480721],[153.028393,-27.484413],[153.022209,-27.481023],[153.018234,-27.452195],[153.018135,-27.451851],[153.02533,-27.449792],[153.024912,-27.449862],[153.01511,-27.458866],[153.015067,-27.459122],[153.029133,-27.44699],[153.029207,-27.447393]]
//   }
//   }
  

const Map = ({link,style_height,line}) => {
  const [stop, setStop] = useContext(StopContext);
  console.log(stop.lat);

  const [viewport, setViewport] = useState({
    // width: 400,
    // height: 400,
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
      height={style_height}
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

     

      <Source
        id="route"
        type="geojson"
       // data={"https://storage.googleapis.com/geojson_translink/temp.json"}
        data={line}
      >
        <Layer
        id='lineLayer'
        type='line'
        source='my-data'
          layout={{'line-join': 'round',
          'line-cap': 'round'}}
          paint={{
            'line-color': '#51bbd6',
'line-width': 1
          }}
      
        />
      </Source>


      <Source
        id="my-stop"
        type="geojson"
       // data={"https://storage.googleapis.com/geojson_translink/temp.json"}
        data={link}
      >
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
