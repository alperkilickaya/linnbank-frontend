import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";

import Header from "./components/shared/Header";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Routes from "./routes";

function App() {
  return (
    <Router>
      <>
        <ToastContainer autoClose={6000} transition={Zoom} />
      </>
      <Header/>
      <Navbar/>
      <Routes/>
      <Footer/>
    </Router>
  );
}

export default App;
