import React from "react";
import { Link } from "react-router-dom";
import UserDropDown from "./UserDropDown";

const Navbar = () => {

  return (
    <>
      {/* <!-- navbar start --> */}
      <div className="navbar-area bg-one">
        <nav className="navbar navbar-area navbar-expand-lg">
          <div className="container nav-container">
            <div className="responsive-mobile-menu">
              <button
                className="menu toggle-btn d-block d-lg-none"
                data-target="#banlank_main_menu"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon-left"></span>
                <span className="icon-right"></span>
              </button>
            </div>
            <div className="logo d-block d-lg-none">
              <Link to="/">
                <img src="assets/img/logo.png" alt="img" />
              </Link>
            </div>
            <div className="nav-right-part nav-right-part-mobile">
              <span className="btn btn-round">
            
                  {/* <UserDropDown/> */}
                 
                    <Link to="/register">Register</Link> &nbsp; | &nbsp;
                    <Link to="/signin">Signin</Link>
                
              </span>
            </div>
            <div className="collapse navbar-collapse" id="banlank_main_menu">
              <ul className="navbar-nav menu-open">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/loans">Loans</Link>
                </li>
                <li>
                  <Link to="/about">About Us</Link>
                </li>
                <li>
                  <Link to="/services">Services</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      {/* <!-- navbar end --> */}
    </>
  );
};

export default Navbar;
