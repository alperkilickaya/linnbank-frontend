import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useState, useContext } from "react";
import { Store } from "../../store/index2";

const UserDropDown = () => {
  const history = useHistory();
  const context = useContext(Store);

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span>
          {context?.user?.userDAO?.firstName} {context?.user?.userDAO?.lastName}
        </span>
      </button>

      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <Link className="dropdown-item" to="/userinfo">
          My Accounts
        </Link>
        <Link className="dropdown-item" to="/">
          Transfer Money
        </Link>
        <hr className="dropdown-divider" />{" "}
        <Link className="dropdown-item" to="/userinfo">
          User Info
        </Link>
        <Link className="dropdown-item" to="/change-password">
          Change Password
        </Link>
        <Link
          className="dropdown-item"
          onClick={() => {
            localStorage.clear();
            history.push("/");
            window.location.reload();
          }}
          to="/"
        >
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default UserDropDown;
