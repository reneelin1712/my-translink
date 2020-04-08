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
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Link to="/overall">
            <Typography variant="h6" color="inherit">
              Overall
            </Typography>
          </Link>

          <Link to="/station">
            <Typography variant="h6" color="inherit">
              Stations
            </Typography>
          </Link>

          <Link to="/route">
            <Typography variant="h6" color="inherit">
              Routes
            </Typography>
          </Link>

          <Link to="/threed">
            <Typography variant="h6" color="inherit">
              3D Brisbane
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
