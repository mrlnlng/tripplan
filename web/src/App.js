import React from 'react';
import Header from './Header';
import Search from './Search';
import Results from './Results';
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
      main: "#83CFC8"
    }
  },

}
)

const useStyles = makeStyles({
  App: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
    margin: '5vmin',
    fontFamily: "Raleway",
  },

})

function App() {
  const classes = useStyles()
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          {/* <Link to={{pathname : "/restaurants", state : {location : "new york"}}}>Please click me...</Link> */}
          <div className={classes.App}>
            <Header />
            <Switch>
              <Route path="/" exact component={Search} />
              {/* <Route path="/results" component={Results} /> */}
              {/* <Route path="/results" component={(props) => { */}
              <Route path="/results" component={Results} />
                
                 {/* if (props.location.state.selectedButtons.hotel) {
                  const url = "http://127.0.0.1:5000/hotels?location=" + props.location.state.location
                  let Component = withFetch(Results, url)
                  return <Component {...props}></Component>
                } 

                 else {
                  const url = "http://127.0.0.1:5000/restaurants?location=" + props.location.state.location
                  let Component = withFetch(Results, url)
                  return <Component {...props}></Component>
                } */}

              

              {/* <Route path="/hotels" component={(props) => {
                const url = "http://127.0.0.1:5000/hotels?location=" + props.location.state.location
                let Component = withFetch(Results, url)
              }} /> */}

              {/* <Route path="/marlene" component={() => (<Restaurants2 data={data2} />)} /> */}
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
