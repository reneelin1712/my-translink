import React, { useState, useContext, useEffect } from "react";
import MapGL, {
  Source,
  Layer,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl
} from "react-map-gl";

// import { ScaleControl } from "react-mapbox-gl";

import { StopContext } from "../context/StopProvider";
import Slider from "@material-ui/core/Slider";

// const temp = {"type":"Feature","properties":{},"geometry":{"type":"LineString","coordinates":[[153.023547,-27.467949],[153.023961,-27.468532],[153.0192,-27.465942],[153.018344,-27.465855],[153.030604,-27.494044],[153.030193,-27.493932],[153.034195,-27.496767],[153.033846,-27.496841],[153.019082,-27.473363],[153.019148,-27.473482],[153.024777,-27.497983],[153.024484,-27.498096],[153.018263,-27.497734],[153.018077,-27.49805],[153.028213,-27.484505],[153.021835,-27.480721],[153.028393,-27.484413],[153.022209,-27.481023],[153.018234,-27.452195],[153.018135,-27.451851],[153.02533,-27.449792],[153.024912,-27.449862],[153.01511,-27.458866],[153.015067,-27.459122],[153.029133,-27.44699],[153.029207,-27.447393]]}}
// const tempdata = {
//   'type': 'Feature',
//   'properties': {},
//   'geometry': {
//   'type': 'LineString',
//   'coordinates':[[153.023547,-27.467949],[153.023961,-27.468532],[153.0192,-27.465942],[153.018344,-27.465855],[153.030604,-27.494044],[153.030193,-27.493932],[153.034195,-27.496767],[153.033846,-27.496841],[153.019082,-27.473363],[153.019148,-27.473482],[153.024777,-27.497983],[153.024484,-27.498096],[153.018263,-27.497734],[153.018077,-27.49805],[153.028213,-27.484505],[153.021835,-27.480721],[153.028393,-27.484413],[153.022209,-27.481023],[153.018234,-27.452195],[153.018135,-27.451851],[153.02533,-27.449792],[153.024912,-27.449862],[153.01511,-27.458866],[153.015067,-27.459122],[153.029133,-27.44699],[153.029207,-27.447393]]
//   }
//   }
const REACT_APP_MAPBOX_TOKEN =
  "pk.eyJ1IjoicmVuZWVsaW4iLCJhIjoiY2s2bGdsM294MGFyNDNkcGZxdjRiamVtZCJ9.NXBRh4xFGeNFfqikqH97bA";

const temp = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        stopID: "600018",
        qty: 61.7602,
        month: 11
      },
      geometry: {
        type: "Point",
        coordinates: [153.026069, -27.465841]
      }
    },
    {
      type: "Feature",
      properties: {
        stopID: "11168",
        qty: 17.3429
      },
      geometry: {
        type: "Point",
        coordinates: [153.019148, -27.473482]
      }
    },
    {
      type: "Feature",
      properties: {
        stopID: "600014",
        qty: 17.3378
      },
      geometry: {
        type: "Point",
        coordinates: [153.033762, -27.456135]
      }
    },
    {
      type: "Feature",
      properties: {
        stopID: "10802",
        qty: 13.7189
      },
      geometry: {
        type: "Point",
        coordinates: [153.019082, -27.473363]
      }
    },
    {
      type: "Feature",
      properties: {
        stopID: "600811",
        qty: 11.6792
      },
      geometry: {
        type: "Point",
        coordinates: [153.428396, -28.001641]
      }
    },
    {
      type: "Feature",
      properties: {
        stopID: "600801",
        qty: 10.5684,
        month: 11
      },
      geometry: {
        type: "Point",
        coordinates: [153.431141, -28.035761]
      }
    },
    {
      type: "Feature",
      properties: {
        stopID: "600006",
        qty: 7.7354
      },
      geometry: {
        type: "Point",
        coordinates: [153.022995, -27.481832]
      }
    },
    {
      type: "Feature",
      properties: {
        stopID: "600823",
        qty: 7.2681
      },
      geometry: {
        type: "Point",
        coordinates: [153.413509, -27.967861]
      }
    },
    {
      type: "Feature",
      properties: {
        stopID: "19064",
        qty: 7.1886
      },
      geometry: {
        type: "Point",
        coordinates: [153.022209, -27.481023]
      }
    },
    {
      type: "Feature",
      properties: {
        stopID: "600012",
        qty: 6.9238,
        month: 11
      },
      geometry: {
        type: "Point",
        coordinates: [153.018521, -27.475067]
      }
    }
  ]
};
const Map = ({ link, style_height, line }) => {
  const [qtyValue, setQtyValue] = useState([10, 37]);
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

  const marks = [
    {
      value: 2017,
      label: "2017"
    },
    {
      value: 2018,
      label: "2018"
    },
    {
      value: 2019,
      label: "2019"
    },
    {
      value: 2020,
      label: "2020"
    }
  ];

  function valuetext(value) {
    return `${value}`;
  }

  function valueqty(value) {
    return `${value}*10000`;
  }

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
    padding: "10px"
  };

  const scaleControlStyle = {
    position: "absolute",
    bottom: 36,
    left: 0,
    padding: "10px"
  };

  const monthFilter = {
    position: "absolute",
    bottom: 36,
    left: 0,
    padding: "10px"
  };

  const handleChangeQty = (event, newValue) => {
    setQtyValue(newValue);
    console.log(qtyValue[0]);
  };
  return (
    <>
      <MapGL
        {...viewport}
        width="65vw"
        height={style_height}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={setViewport}
        mapboxApiAccessToken={REACT_APP_MAPBOX_TOKEN}
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
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{ "line-join": "round", "line-cap": "round" }}
            paint={{
              "line-color": "#51bbd6",
              "line-width": 1
            }}
          />
        </Source>

        <Source
          id="my-stop"
          type="geojson"
          // data={"https://storage.googleapis.com/geojson_translink/temp.json"}
          data={temp}
        >
          <Layer
            id="point"
            type="circle"
            filter={["all", [">", "qty", qtyValue[0]], ["==", "month", 11]]}
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
        <div style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <div style={navStyle}>
          <NavigationControl />
        </div>
        <div style={scaleControlStyle}>
          <ScaleControl />
        </div>

        <Slider
          style={{ width: 300 }}
          defaultValue={2019}
          // valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          aria-labelledby="discrete-slider-restrict"
          step={1}
          //valueLabelDisplay="auto"
          marks={marks}
          // onChange={handleChange}
          min={2017}
          max={2020}
        />
      </MapGL>
      <Slider
        style={{ width: 300 }}
        value={qtyValue}
        onChange={handleChangeQty}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valueqty}
        min={0}
        max={150}
      />
    </>
  );
};

export default Map;
