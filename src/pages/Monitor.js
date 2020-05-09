import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const Monitor = () => {
  const [urls, setUrls] = useState([
    {
      origin: "https://storage.googleapis.com/thesis-prac/drive.mp4",
      yolo: "https://storage.googleapis.com/thesis-prac/drive(1).mp4"
    },
    {
      origin: "https://storage.googleapis.com/thesis-prac/people.mp4",
      yolo: "https://storage.googleapis.com/thesis-prac/people(1).mp4"
    },
    {
      origin: "https://storage.googleapis.com/thesis-prac/puppy.mp4",
      yolo: "https://storage.googleapis.com/thesis-prac/puppy(1).mp4"
    }
  ]);

  return (
    <>
      <h1>Pre-made Videos, next step: real time videos</h1>
      <Grid container spacing={3}>
        {urls.map(url => (
          <Grid item xs={4}>
            <div>
              <Paper>
                <Video src={url.origin} />
                <Video src={url.yolo} />
              </Paper>
            </div>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

const Video = props => {
  return (
    <div>
      <video controls autoPlay src={props.src} width="400" loop />
    </div>
  );
};

export default Monitor;
