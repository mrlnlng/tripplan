import React from 'react';
// import Header from './Header';
import Search from './Search';
import Results from './Results';
import Undefined from './Undefined'
import {BACKEND} from './Configuration'
// import useFetch, { withFetch } from "./withFetch"
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"
import { makeStyles } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


const theme = createMuiTheme({
  typography: {
    fontFamily: 'Raleway',

    body2: {
      fontSize: ".7rem",
      color: "grey"
    }
  },

  palette: {
    primary: {
      main: "#429a8f"

    },
    secondary: {
      main: "#86C3B9"
    },
    // info: {
    //   main: "linear-gradient(45deg, #429A8F 30%, #48B09E 90%)",
    // }
  },

}
)

const useStyles = makeStyles({
  App:  props => ({
    // display: 'flex',
    // flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    // margin: '5vmin',
    fontFamily: "Raleway",
    margin: "0",
    // overflowX : props.overflow ? "hidden" : "auto"
    // overflowX : props.overflow ? "hidden" : "auto"
    // overflowX: "hidden"
  }), 

})

function App() {
  const routeName = window.location.pathname
  const shouldOverflow = (routeName === "/results" )
  const classes = useStyles({overflow : shouldOverflow})
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          {/* <Link to={{pathname : "/restaurants", state : {location : "new york"}}}>Please click me...</Link> */}
          <div className={classes.App}>
            {/* <Header /> */}
            <Switch>
              <Route path="/" exact component={Search} />
              {/* <Route path="/results" component={Results} /> */}
              {/* <Route path="/results" component={(props) => { */}
              <Route path="/results" component={Results} />
              <Route component={Undefined} />
                

              {/* <Route path="/marlene" component={() => (<Restaurants2 data={data2} />)} /> */}
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
