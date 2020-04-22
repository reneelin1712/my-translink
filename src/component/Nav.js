import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
}));

const Nav = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="primary"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Link
            to="/overall"
            style={{ textDecoration: "none", marginRight: "1%" }}
          >
            <Typography variant="h6" color="primary">
              Overall
            </Typography>
          </Link>

          <Link
            to="/station"
            style={{ textDecoration: "none", marginRight: "1%" }}
          >
            <Typography variant="h6" color="primary">
              Stations
            </Typography>
          </Link>

          <Link
            to="/route"
            style={{ textDecoration: "none", marginRight: "1%" }}
          >
            <Typography variant="h6" color="primary">
              Routes
            </Typography>
          </Link>

          <Link
            to="/origdes"
            style={{ textDecoration: "none", marginRight: "1%" }}
          >
            <Typography variant="h6" color="primary">
              Orin-Des
            </Typography>
          </Link>

          <Link
            to="/threed"
            style={{ textDecoration: "none", marginRight: "1%" }}
          >
            <Typography variant="h6" color="primary">
              3D Brisbane
            </Typography>
          </Link>

          <Link
            to="/realtime"
            style={{ textDecoration: "none", marginRight: "1%" }}
          >
            <Typography variant="h6" color="primary">
              Realtime
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
