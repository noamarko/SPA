import React from 'react';
import ToolBar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/Appbar';
import 'react-pro-sidebar/dist/css/styles.css';
import AppRouter from './Components/AppRouter';
import AppSideBar from './Components/AppSideBar';
import {
  BrowserRouter as Router,
} from "react-router-dom";

/*App handles the changes between the two pages.
  Uses ProSidebar and it's components to present the links
  and with Router components switches between the two pages.*/

// export class App extends Component {
export function App(){

  
  return (
    <Router>
      <div>
          <AppSideBar />
          <AppRouter />
      </div>
    </Router>
    );
  }

export default App;
