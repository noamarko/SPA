import React from 'react';
import {Link} from 'react-router-dom'
import { ProSidebar, Menu, MenuItem} from 'react-pro-sidebar';

export function AppSideBar(){

    return(
      <div style={{position:'fixed'}}>
        <ProSidebar width='fit-content' style={{ position: 'fixed'}}>
            <Menu popperArrow={true}>
              <br/>
              <MenuItem>
                <Link to='/OverView'/>Overview</MenuItem>
              <MenuItem>
                <Link to='/InputDetails'/>Input Details</MenuItem>
            </Menu>
          </ProSidebar>
        </div>
    );
}
export default AppSideBar;