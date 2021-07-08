import React, { Component } from 'react';
import ToolBar from '@material-ui/core/Toolbar';
import InputDetails from './Components/Users/InputDetailsComponent';
import OverView from './Components/OverView/OverViewComponent';
import AppBar from '@material-ui/core/Appbar';
import { ProSidebar, Menu, MenuItem} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

/*App handles the changes between the two pages.*/

export class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      delCountry:''
    }
  }
  render() {
    var {delCountry} = this.state;
    const upDateCountry = (name) =>{
      delCountry = name;
    }
    return (
      <div>
          <AppBar position='fixed'  color='default'>
          <ToolBar>
          </ToolBar>
        </AppBar>
        <br/>
        <Router>
          <div style={{position:'sticky', height:'fit-content'}}>
          <ProSidebar width='fit-content' style={{ position: 'fixed'}}>
            <Menu iconShape='round'>
              <br/>
              <MenuItem>
                <Link to='/OverView' activestyle={{
                  color: 'white'
                }} />Overview</MenuItem>
              <MenuItem>
                <Link to='/InputDetails' activestyle={{
                  color: 'white',
                }} />Input Details</MenuItem>
            </Menu>
          </ProSidebar>
          </div>
          <br/>
          <Switch>
            <Route path="/" exact={true}>
              <OverView />
            </Route>
            <Route path="/OverView" exact={true}>
              <OverView isUpdated={delCountry}/>
            </Route>
            <Route path="/InputDetails">
              <div style={{position: 'sticky', left: '15%', width:'300px' }}>
                <InputDetails update={upDateCountry}/>
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
