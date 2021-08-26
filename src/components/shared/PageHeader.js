import React from "react";
import { Link, useLocation } from "react-router-dom";
// import "./ContactForm.css";
const PageHeader = (props) => {
  // useLocation ile url i alip  page ismini calisan link haline getirdim
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="breadcrumb_area ">
      <div className="breadcrumb_inner d-flex align-items-center">
        <div className="container ">
          <div className="breadcrumb_content">
            <h2>{props.title}</h2>
            <div className="page_link">
              <Link to="/">HOME</Link>
              <Link to={path}> {props.page} </Link>
              {/* <a>{props.page}</a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PageHeader;
