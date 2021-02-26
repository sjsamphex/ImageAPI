import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EmojiFoodBeverageIcon from '@material-ui/icons/EmojiFoodBeverage';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '1rem',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = ({ handleClick, isLoggedIn }) => {
  const classes = useStyles();
  return (
    <div>
      <nav>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <EmojiFoodBeverageIcon
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              />

              <Typography variant="h4" className={classes.title}>
                Is it Recalled?
              </Typography>
              {isLoggedIn ? (
                <div>
                  <Button color="inherit" component={Link} to="/home">
                    Home
                  </Button>
                  <Button color="inherit" component={Link} to="/products">
                    Products
                  </Button>
                  <a href="#" onClick={handleClick}>
                    <Button color="inherit">Logout</Button>
                  </a>
                </div>
              ) : (
                <div>
                  <Button color="inherit" component={Link} to="/login">
                    Login
                  </Button>
                  <Button color="inherit" component={Link} to="/signup">
                    Sign Up
                  </Button>
                </div>
              )}
            </Toolbar>
          </AppBar>
        </div>
      </nav>
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
