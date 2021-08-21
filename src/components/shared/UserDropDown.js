import React from "react";
import { Link } from "react-router-dom";

const UserDropDown = () => {

    return(
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Login User
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <Link class="dropdown-item" to="/userinfo">
                  My Accounts
                </Link>
                <Link class="dropdown-item" to="/">
                  Transfer Money
                </Link>
                <hr class="dropdown-divider" />{" "}
                <Link class="dropdown-item" to="/userinfo">
                  User Info
                </Link>
                <Link class="dropdown-item" to="/change-password">
                  Change Password
                </Link>
                <Link class="dropdown-item" href="/">
                  Log Out
                </Link>
            </div>
        </div>
    )
}

export default UserDropDown;