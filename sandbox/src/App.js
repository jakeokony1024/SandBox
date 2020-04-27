import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import Item from './components/item'
import Jumbotron from "./components/Jumbotron"
import Nav from "./components/Navbar"

function App() {
  return(
    <Router>
      <div>
        <Jumbotron><Nav/></Jumbotron>
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Item />
        </ThemeProvider>

      </div>
    </Router>
  );
};
export default App;