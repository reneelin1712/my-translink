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
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

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
  const [qtyValue, setQtyValue] = useState([0, 30]);
  const [yearValue, setYearValue] = React.useState("2019");
  const [monthValue, setMonthValue] = React.useState(11);
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
    // if (features[0] && features[0].properties.qty == null) {
    //   setShowPopup(false);
    // } else {
    //   setShowPopup(true);
    //   setLat(features[0].geometry.coordinates[1]);
    //   setLon(features[0].geometry.coordinates[0]);
    //   setProperty(features[0].properties.qty);
    //   // console.log(features[0].properties.qty);
    //   // setStopID(features[0].properties.stopID);
    //   console.log(property);
    //   setStop({ ...stop, stopID: features[0].properties.stopID });
    // }
    if (features[0] && features[0].properties.qty) {
      setShowPopup(true);
      setLat(features[0].geometry.coordinates[1]);
      setLon(features[0].geometry.coordinates[0]);
      setProperty(features[0].properties.qty);
      // console.log(features[0].properties.qty);
      // setStopID(features[0].properties.stopID);
      console.log(property);
      setStop({ ...stop, stopID: features[0].properties.stopID });
    } else {
      setShowPopup(false);
    }
  };

  const marks = [
    {
      value: "1",
      label: "1"
    },
    {
      value: "2",
      label: "2"
    },
    {
      value: "3",
      label: "3"
    },
    {
      value: "4",
      label: "4"
    },
    {
      value: "5",
      label: "5"
    },
    {
      value: "6",
      label: "6"
    },
    {
      value: "7",
      label: "7"
    },
    {
      value: "8",
      label: "8"
    },
    {
      value: "9",
      label: "9"
    },
    {
      value: "10",
      label: "10"
    },
    {
      value: "11",
      label: "11"
    },
    {
      value: "12",
      label: "12"
    }
  ];

  function valueqty(value) {
    return `${value}*10000`;
  }

  function valueMonth(value) {
    return `${value}`;
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

  const timeFliter = {
    position: "absolute",
    bottom: 0,
    // left: 0,
    right: 0,
    padding: "10px",
    width: 350
  };

  const handleChangeQty = (event, newValue) => {
    setQtyValue(newValue);
    console.log(qtyValue[0]);
  };

  const handleChangeYear = event => {
    setYearValue(event.target.value);
    console.log(event.target.value);
  };

  const handleChangeMonth = (e, v) => {
    setMonthValue(v);
    console.log(v);
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
          // data={
          //   "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/temp.json"
          // }
          // data={
          //   "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/temp201912.json"
          // }
          data={
            "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/geoJson2019cut.json"
          }

          //data={temp}
        >
          <Layer
            id="point"
            type="circle"
            filter={[
              "all",
              [">", "qty", qtyValue[0]],
              ["<", "qty", qtyValue[1]],
              ["==", "month", monthValue.toString()]
            ]}
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
        <Paper style={timeFliter}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                {/* <FormLabel component="legend">labelPlacement</FormLabel> */}
                <RadioGroup
                  row
                  aria-label="year"
                  name="year"
                  defaultValue="2019"
                  value={yearValue}
                  onChange={handleChangeYear}
                >
                  <FormControlLabel
                    value="2017"
                    control={<Radio color="primary" />}
                    label="2017"
                    labelPlacement="End"
                  />

                  <FormControlLabel
                    value="2018"
                    control={<Radio color="primary" />}
                    label="2018"
                    labelPlacement="End"
                  />

                  <FormControlLabel
                    value="2019"
                    control={<Radio color="primary" />}
                    label="2019"
                    labelPlacement="End"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Slider
                style={{ width: 300 }}
                value={monthValue}
                defaultValue={11}
                // valueLabelFormat={valueLabelFormat}
                getAriaValueText={valueMonth}
                aria-labelledby="discrete-slider-restrict"
                step={1}
                marks={marks}
                valueLabelDisplay="auto"
                onChange={handleChangeMonth}
                min={1}
                max={12}
              />
            </Grid>

            <Grid item xs={12}>
              <Slider
                style={{ width: 300 }}
                value={qtyValue}
                onChange={handleChangeQty}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                getAriaValueText={valueqty}
                min={0}
                max={30}
              />
            </Grid>
          </Grid>
        </Paper>
      </MapGL>
    </>
  );
};

export default Map;
