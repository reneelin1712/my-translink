import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { Link } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  tab: {
    minWidth: 70,
    width: 120
  }
}));

const Nav = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const setHome = () => {
    setValue(0);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="primary"
            aria-label="logo"
            onClick={setHome}
          >
            <Icon>train</Icon>
          </IconButton>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab
              label="Stations"
              className={classes.tab}
              component={Link}
              to="/station"
            ></Tab>
            <Tab
              label="3D hexagon"
              className={classes.tab}
              component={Link}
              to="/route"
            ></Tab>
            <Tab
              label="origin-des"
              className={classes.tab}
              component={Link}
              to="/origdes"
            >
              {/* <Link
                to="/origdes"
                style={{ textDecoration: "none", marginRight: "1%" }}
              >
                <Typography variant="h6" color="primary">
                  Orin-Des
                </Typography>
              </Link> */}
            </Tab>

            <Tab
              label="real-time"
              className={classes.tab}
              component={Link}
              to="/realtime"
            ></Tab>
            <Tab
              label="overall"
              className={classes.tab}
              component={Link}
              to="/overall"
            ></Tab>
            <Tab
              label="3D"
              className={classes.tab}
              component={Link}
              to="/threed"
            ></Tab>
          </Tabs>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Nav;
