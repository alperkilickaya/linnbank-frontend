import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from "react-router-dom";
import { Store } from "./store";

import Header from "./components/shared/Header";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import Routes from "./routes";
import ApiService from "./utils/api-service";

function App() {
  const [user, setUser] = useState({});

  const loadCurrentUser = () => {
    if (!localStorage.getItem("token")) return;

    ApiService.get("users/auth").then((resp) => {
      setUser(resp.data);
    });
  };

  useEffect(() => {
    loadCurrentUser();
  }, []);

  return (
    <Store.Provider value={{ user, setUser }}>
      <Router>
        <Header />
        <Navbar />
        <Routes />

        <Footer />
      </Router>
    </Store.Provider>
  );
}

export default App;
