import React from "react";
import "react-pro-sidebar/dist/css/styles.css";
import AppRouter from "./Components/AppRouter";
import AppSideBar from "./Components/AppSideBar";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
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
