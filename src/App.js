import React, { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "./components/shared/Header";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Routes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "./store";
import ApiService from "./utils/api-service";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  const loadCurrentUser = () => {
    if (!localStorage.getItem("token")) return;
    let token = JSON.parse(localStorage.getItem("token").trim());

    ApiService.post("auth/user", { token })
      .then((res) => {
        console.log(res);
        setCurrentUser(res.data);
        console.log(currentUser);
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  return (
    <Store.Provider value={{ currentUser, setCurrentUser }}>
      <Router>
        <ToastContainer autoClose={8000} />
        <Header />
        <Navbar />
        <Routes />

        <Footer />
      </Router>
    </Store.Provider>
  );
}

export default App;
