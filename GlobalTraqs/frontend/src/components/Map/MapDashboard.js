import React, { Fragment } from 'react'
import Pins from './Pins'

import PinForm from './PinForm'
import SearchSidebar from "../layout/SidebarTest";

const sidebarStyle = {
    position: "absolute",
    top: "0",
    height: "100%",
    zIndex: "1000",
    overflow: "hidden",
    right: "0px",
    // z-index: 1000;
    // position: absolute;
    // height: 100%;
    // overflow: hidden;
    // width: 100%;
    // top: 0;
};

export default function MapDashboard() {
  return (
    <div id={"map-dashboard"}>
    <Fragment>
      <Pins />
      <div id={"sidebar-style"}>
      <SearchSidebar/>
      {/* <MapDisplay /> */}
      </div>
    </Fragment>
    </div>
  );
}
