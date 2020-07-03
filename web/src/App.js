import React from 'react';
import Header from './Header';
import Search from './Search';
import Results from './Results';
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles"
import { makeStyles } from '@material-ui/core';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Raleway',

    body2: {
      fontSize: ".7rem",
      color: "grey"
    }
  }
})

const useStyles = makeStyles({
  App: {
    display: 'flex',
    flexDirection: 'column',
    textAlign:'center',
    alignItems: 'center',
    margin: '5rem',
    fontFamily: "Raleway",
  },

  })

function App() {
  const classes = useStyles()
  return (
    <>
    <Router>
      <ThemeProvider theme={theme}>
    <div className={classes.App}>
      <Header />
      <Switch>
      <Route path="/" exact component={Search} />
      <Route path="/results" component={Results} />
      </Switch>
    </div>
    </ThemeProvider>
    </Router>
    </>
  );
}

export default App;
