import React, { useState, useContext, useEffect } from "react";
import DeckGL, { ArcLayer } from "deck.gl";
import MapGL, {
  Marker,
  NavigationControl,
  FullscreenControl,
  ScaleControl
} from "react-map-gl";
import { trips03 } from "./tripData";
import { trips01 } from "./tripData01";
import Icon from "@material-ui/core/Icon";
import { orange } from "@material-ui/core/colors";
import { StopContext } from "../context/StopProvider";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const TOKEN =
  "pk.eyJ1IjoicmVuZWVsaW4iLCJhIjoiY2s2bGdsM294MGFyNDNkcGZxdjRiamVtZCJ9.NXBRh4xFGeNFfqikqH97bA"; // Set your mapbox token here
const fullscreenControlStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px",
  zIndex: 99
};

const navStyle = {
  position: "absolute",
  top: 36,
  left: 0,
  padding: "10px",
  zIndex: 99
};

const scaleControlStyle = {
  position: "absolute",
  bottom: 36,
  left: 0,
  padding: "10px",
  zIndex: 99
};

const radioStyle = {
  position: "absolute",
  top: 10,
  right: 10
};

const timeIntervals = {
  morning: trips01,
  afternoon: trips03
};

const OriginDes = () => {
  const [value, setValue] = React.useState("morning");
  const [timeInterval, setTimeInterval] = useState(trips01);
  const [viewport, setViewport] = useState({
    // width: 400,
    // height: 400,
    longitude: 153.019079,
    latitude: -27.467834,
    zoom: 9,
    bearing: 0,
    pitch: 30
    // transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
    // transitionDuration: "auto"
  });

  const [stop, setStop] = useContext(StopContext);
  const [tooltipInfo, setTooltipInfo] = useState({
    stopQty: null,
    ori: null,
    des: null,
    pointerX: null,
    pointerY: null
  });

  const _onViewportChange = viewport => {
    setViewport(viewport);
  };

  useEffect(() => {
    setViewport({ ...viewport, latitude: stop.lat, longitude: stop.lon });
    // setLat(stop.lat);
    // setLon(stop.lon);
  }, [stop.lat]);

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
    setTimeInterval(timeIntervals[event.target.value]);
  };

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
      <Marker
        latitude={stop.lat}
        longitude={stop.lon}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <Icon style={{ color: orange[500] }}>train</Icon>
      </Marker>

      <div style={fullscreenControlStyle}>
        <FullscreenControl />
      </div>
      <div style={navStyle}>
        <NavigationControl onViewportChange={setViewport} />
      </div>
      <div style={scaleControlStyle}>
        <ScaleControl />
      </div>
      <div style={radioStyle}>
        <FormControl component="fieldset">
          {/* <FormLabel component="legend">Gender</FormLabel> */}
          <RadioGroup
            aria-label="time"
            name="time"
            value={value}
            onChange={handleChangeTime}
          >
            <FormControlLabel
              value="morning"
              control={<Radio color="primary" />}
              label="0AM-9AM"
            />
            <FormControlLabel
              value="afternoon"
              control={<Radio color="primary" />}
              label="3PM-7PM"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <DeckGL
        viewState={viewport}
        layers={[
          new ArcLayer({
            data: timeInterval,
            strokeWidth: 4,
            getWidth: d => d.qty / 500,
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
  );
};

export default OriginDes;
