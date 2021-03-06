import React from "react";
import { Link } from "react-router-dom";
import {
  ProSidebar,
  SidebarHeader,
  SidebarContent,
  Menu,
  MenuItem,
} from "react-pro-sidebar";

const sideBarStyle = {
  position: "fixed",
  color: "white",
};

function AppSideBar() {
  return (
    <ProSidebar width="14%" style={sideBarStyle}>
      <SidebarHeader>Menu</SidebarHeader>
      <SidebarContent>
        <Menu popperArrow={true}>
          <MenuItem>
            <Link to="/" />
            Overview
          </MenuItem>
          <MenuItem>
            <Link to="/InputDetails" />
            Input Details
          </MenuItem>
        </Menu>
      </SidebarContent>
    </ProSidebar>
  );
}
export default AppSideBar;
