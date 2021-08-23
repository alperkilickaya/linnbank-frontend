import React from "react";
import { BrowserRouter as Router  } from "react-router-dom";


import Header from "./components/shared/Header";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Routes from "./routes";


function App() {

  return (
    <Router>
      <Header />
      <Navbar />
      <Routes/>

      <Footer />
    </Router>
  );
}

export default App;
