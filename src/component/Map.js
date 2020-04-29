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
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";

const REACT_APP_MAPBOX_TOKEN =
  "pk.eyJ1IjoicmVuZWVsaW4iLCJhIjoiY2s2bGdsM294MGFyNDNkcGZxdjRiamVtZCJ9.NXBRh4xFGeNFfqikqH97bA";

const links = {
  2017: "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/geoJson2017cut.json",
  2018: "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/geoJson2018cut.json",
  2019: "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/geoJson2019cut.json"
};
const Map = ({ link, style_height, line }) => {
  const [qtyValue, setQtyValue] = useState([0, 30]);
  const [yearValue, setYearValue] = React.useState("2019");
  const [monthValue, setMonthValue] = React.useState(11);
  const [stop, setStop] = useContext(StopContext);
  const [jsonLink, setJsonLink] = useState(links["2019"]);
  console.log(stop.lat);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

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
    // bottom: 0,
    // left: 0,
    right: 0,
    padding: "15px",
    width: 350
  };

  const toggleButton = {
    position: "absolute",
    top: 0,
    // left: 0,
    right: 0,
    backgroundColor: "orange"
  };

  const handleChangeQty = (event, newValue) => {
    setQtyValue(newValue);
    console.log(qtyValue[0]);
  };

  const handleChangeYear = event => {
    setYearValue(event.target.value);
    console.log(event.target.value);
    console.log();
    setJsonLink(links[event.target.value.toString()]);
  };

  const handleChangeMonth = (e, v) => {
    setMonthValue(v);
    console.log(v);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

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
          id="my-stop"
          type="geojson"
          // data={
          //   "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/temp.json"
          // }
          // data={
          //   "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/temp201912.json"
          // }
          data={jsonLink}

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
          <NavigationControl onViewportChange={setViewport} />
        </div>
        <div style={scaleControlStyle}>
          <ScaleControl />
        </div>
        <div style={toggleButton}>
          <Button
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            Filter
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
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
              </Grow>
            )}
          </Popper>
        </div>
      </MapGL>
    </>
  );
};

export default Map;
