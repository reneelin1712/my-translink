import React, { useState, useContext } from "react";
import MapGL, { Source, Layer } from "react-map-gl";
import DeckGL, { ArcLayer, HexagonLayer } from "deck.gl";
import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";
import {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  Marker
} from "react-map-gl";
// import { json201912 } from "./deckData";
import Icon from "@material-ui/core/Icon";
import { orange } from "@material-ui/core/colors";
import { SelectionContext } from "../context/SelectionProvider";
import { DataContext } from "../context/DataProvider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import MaterialTable from "material-table";
import Grid from "@material-ui/core/Grid";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import { DataFilterExtension } from "@deck.gl/extensions";
import Button from "@material-ui/core/Button";
import Slider from "@material-ui/core/Slider";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const AirbnbSlider = withStyles({
  root: {
    color: "#3a8589",
    position: "absolute",
    //bottom: 10,
    top: 200,
    right: 27,
    height: 3,
    width: 150,
    zIndex: 9999
    // padding: "13px 0"
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    marginTop: -12,
    marginLeft: -13,
    boxShadow: "#ebebeb 0px 2px 2px",
    "&:focus, &:hover, &$active": {
      boxShadow: "#ccc 0px 2px 3px 1px"
    },
    "& .bar": {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1
    }
  },
  active: {},
  track: {
    height: 3
  },
  rail: {
    color: "#d8d8d8",
    opacity: 1,
    height: 3
  }
})(Slider);

const shapeData =
  "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/shapes_to_uq_PointsToLine.json";

const arcData08 =
  "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/deckgldata/trips2uq201908am.json";

const arcData08v2 =
  "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/deckgldata/trips2uq201908amv2.json";
const arcData12 =
  "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/deckgldata/trips2uq201912am.json";

const arcData12v2 =
  "https://cors-anywhere.herokuapp.com/https://storage.googleapis.com/geojson_translink/deckgldata/trips2uq201912amv2.json";

const TOKEN =
  "pk.eyJ1IjoicmVuZWVsaW4iLCJhIjoiY2s2bGdsM294MGFyNDNkcGZxdjRiamVtZCJ9.NXBRh4xFGeNFfqikqH97bA"; // Set your mapbox token here

const titleStyle = {
  position: "absolute",
  top: 0,
  left: 100
};

const fullscreenControlStyle = {
  position: "absolute",
  top: 0,
  left: 20,
  padding: "10px",
  zIndex: 99
};

const navStyle = {
  position: "absolute",
  top: 36,
  left: 20,
  padding: "10px",
  zIndex: 99
};

const scaleControlStyle = {
  position: "absolute",
  bottom: 36,
  left: 20,
  padding: "10px",
  zIndex: 99
};
const radioStyle = {
  position: "absolute",
  top: 10,
  right: 10
};

const UQ = () => {
  const [range, setRange] = useState([0, 60]);
  const [data, setData] = useContext(DataContext);
  const [value, setValue] = React.useState();
  const [month, setMonth] = useState();

  const months = {
    aug: data.trips2uq08,
    dec: data.trips2uq12
  };

  const [viewport, setViewport] = useState({
    longitude: 153.0137,
    latitude: -27.4975,
    zoom: 11,
    pitch: 45,
    bearing: 0
  });

  const [tooltipInfo, setTooltipInfo] = useState({
    stopQty: null,
    ori: null,
    des: null,
    pointerX: null,
    pointerY: null
  });

  const _renderTooltip = () => {
    const { stopQty, ori, des, pointerX, pointerY } = tooltipInfo || {};
    return (
      stopQty && (
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            pointerEvents: "none",
            left: pointerX,
            top: pointerY
          }}
        >
          <div>Qty: {stopQty}</div>
          <div>From: {ori}</div>
          <div>To: {des}</div>
        </div>
      )
    );
  };

  const handleChangeTime = event => {
    setValue(event.target.value);
    setMonth(months[event.target.value]);
  };

  // const handleClick = () => {
  //   setTemp([50, 500]);
  // };

  const handleChange = (event, newValue) => {
    setRange(newValue);
  };

  const AirbnbThumbComponent = props => {
    return (
      <span {...props}>
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </span>
    );
  };

  function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
      <Tooltip
        open={open}
        enterTouchDelay={0}
        placement="top"
        title={value * 100}
      >
        {children}
      </Tooltip>
    );
  }

  return (
    <div>
      <AirbnbSlider
        ThumbComponent={AirbnbThumbComponent}
        getAriaLabel={index =>
          index === 0 ? "Minimum price" : "Maximum price"
        }
        defaultValue={[1, 100]}
        ValueLabelComponent={ValueLabelComponent}
        onChange={handleChange}
      />

      <MapGL
        {...viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={nextViewport => setViewport(nextViewport)}
        mapboxApiAccessToken={TOKEN}
      >
        <div style={fullscreenControlStyle}>
          <FullscreenControl />
        </div>
        <div style={navStyle}>
          <NavigationControl onViewportChange={setViewport} />
        </div>
        <div style={scaleControlStyle}>
          <ScaleControl />
        </div>
        <h1 style={titleStyle}>Bus to UQ (2019)</h1>
        <Source id="uq" type="geojson" data={shapeData}>
          <Layer
            id="uq"
            type="line"
            source="uq"
            layout={{
              "line-join": "round",
              "line-cap": "round"
            }}
            paint={{
              // "line-color": "#FF4500",
              // "line-color": [
              //   "match",
              //   ["get", "route_id"],
              //   "412",
              //   "#fbb03b",
              //   "Black",
              //   "#223b53",
              //   "Hispanic",
              //   "#e55e5e",
              //   "Asian",
              //   "#3bb2d0",
              //   /* other */ "#ccc"
              // ],
              "line-color": {
                property: "route_id",
                stops: [
                  [28, "#82E0AA"],
                  [29, "#D7BDE2 "],
                  [66, "#AED6F1 "],
                  [139, "#F9E79F"],
                  [169, "#F5B041"],
                  [192, "#FCF3CF "],
                  [209, "#D7BDE2 "],
                  [402, "#A569BD "],
                  [411, "#2E86C1"],
                  [412, "#9B59B6"],
                  [414, "pink"],
                  [427, "#B2BABB"],
                  [428, "#45B39D"],
                  [432, "#fff"]
                ]
              },
              "line-width": 2
            }}
          />
        </Source>

        {/* <Button variant="contained" onClick={handleClick} style={buttonStyle}>
          Default
        </Button> */}

        <div style={radioStyle}>
          <Paper style={{ padding: 10, paddingBottom: 40 }}>
            <FormControl component="fieldset">
              {/* <FormLabel component="legend">Gender</FormLabel> */}
              <RadioGroup
                aria-label="month"
                name="month"
                value={value}
                onChange={handleChangeTime}
              >
                <FormControlLabel
                  value="aug"
                  control={<Radio color="black" />}
                  label="August 8:30AM"
                />
                <FormControlLabel
                  value="dec"
                  control={<Radio color="primary" />}
                  label="December 8:30AM"
                />
              </RadioGroup>
              <div
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <Brightness1Icon style={{ color: "#0000FF" }}></Brightness1Icon>
                <p>Origin_</p>
                <Brightness1Icon style={{ color: "#00FF00" }}></Brightness1Icon>
                <p>Destination</p>
              </div>
            </FormControl>
          </Paper>
        </div>

        <DeckGL
          viewState={viewport}
          layers={[
            new ArcLayer({
              data: month,
              strokeWidth: 4,
              getWidth: d => d.qty / 500,
              // dataTransform: d =>
              //   d.filter(
              //     f => f.desname == temp
              //     //   &&
              //     // f.orgname == "Benson St at Toowong, stop 14"
              //   ),

              // props added by DataFilterExtension
              getFilterValue: f => f.qty / 100, // in seconds
              filterRange: range, // 12:00 - 13:00

              // Define extensions
              extensions: [new DataFilterExtension({ filterSize: 1 })],

              getSourcePosition: d => d.org,
              getTargetPosition: d => d.des,
              getSourceColor: x => [0, 0, 255],
              getTargetColor: x => [0, 255, 0],

              pickable: true,
              onHover: info => {
                console.log(info);
                if (info.object) {
                  setTooltipInfo({
                    stopQty: info.object.qty,
                    ori: info.object.orgname,
                    des: info.object.desname,
                    pointerX: info.x,
                    pointerY: info.y
                  });
                } else {
                  setTooltipInfo({
                    stopQty: null
                  });
                }
              }
            })
          ]}
        >
          {_renderTooltip()}
        </DeckGL>
      </MapGL>
      {/* </Grid>
      </Grid> */}
    </div>
  );
};

export default UQ;

// <DeckGL
// controller={true}
// viewState={viewport}
// // effects={[lightingEffect]}
// layers={[
//   new HexagonLayer({
//     data:
//       //try11,
//       // sourceData,
//       data.hexagonData,
//     getPosition: d => [d.lon, d.lat],
//     // strokeWidth: 4,
//     //getElevationWeight: d => d.n_killed * 2 + d.n_injured,
//     getElevationWeight: d => d.qty,
//     elevationScale: 50,
//     radius: 100,
//     extruded: true,
//     // onHover: info => {
//     //   // console.log(info);
//     //   if (info.object) {
//     //     console.log(info.object);
//     //     setTooltipInfo({
//     //       stopName: info.object.points[0].stopName,
//     //       stopQty: info.object.points[0].qty,
//     //       pointerX: info.x,
//     //       pointerY: info.y
//     //     });
//     //   } else {
//     //     setTooltipInfo({
//     //       stopQty: null
//     //     });
//     //   }
//     // },
//     pickable: true,
//     opacity: 0.6,
//     coverage: 0.88,
//     // material,
//     // colorRange,
//     upperPercentile: 100
//     // elevationRange: [0, 3000],
//     // transitions: {
//     //   elevationScale: 3000
//     // }
//     // lowerPercentile: 50
//     // getSourceColor: x => [0, 0, 255],
//     // getTargetColor: x => [0, 255, 0]
//   })
// ]}
// >
// {/* {_renderTooltip()} */}
// </DeckGL>
