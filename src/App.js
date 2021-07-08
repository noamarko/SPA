import React, { Component } from 'react';
import ToolBar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/Appbar';
import 'react-pro-sidebar/dist/css/styles.css';
import AppRouter from './Components/AppRouter';
import AppSideBar from './Components/AppSideBar';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

/*App handles the changes between the two pages.
  Uses ProSidebar and it's components to present the links
  and with Router components switches between the two pages.*/

export class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      delCountry: ''
    }
  }
  render() {

    return (
      <Router>
        <div>
          <AppBar position='fixed' color='default'>
            <ToolBar>
            </ToolBar>
            <img alt='' style={{ height: '65px', alignSelf: 'flex-start', position: 'fixed', width: '150px', left: '-1%' }} src='BigID_logo.png' />
          </AppBar>
          <br />
          <div style={{ position: 'sticky', height: 'fit-content' }}>
            <AppSideBar />
          </div>
          <br />
          <AppRouter />
        </div>
      </Router>
    );
  }
}

export default App;
