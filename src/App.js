import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";

import Header from "./components/shared/Header";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Routes from "./routes";
import { Store } from "./store/index2";
import { useState,useEffect } from "react";
import ApiService from "./utils/api-service/index.js";

function App() {

  const [user,setUser] = useState({});

  const loadCurrentUser = () => {
  if (!localStorage.getItem("token")) return;
  
  ApiService.get("api/getUserInfo").then(
    (response) => {
      setUser(response.data.userDAO)
      localStorage.setItem('token', JSON.stringify(response.data.token))
    }
  );  
  }

  useEffect(() => {
    loadCurrentUser();
  }, [])

  return (
    <Store.Provider value={{user,setUser}}>
      <Router>
        <>
          <ToastContainer autoClose={6000} transition={Zoom} />
        </>
        <Header />
        <Navbar />
        <Routes />
        <Footer />
      </Router>
    </Store.Provider>
  );
}

export default App;
