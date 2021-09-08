import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { Store } from "../../store";
import { capitalize } from "../../utils/TextUtils";

const UserDropDown = () => {
  const { currentUser, setCurrentUser } = useContext(Store);
  const history = useHistory();
  const firstname = currentUser.firstname;
  const handleLogOut = () => {
    history.push("/signin");
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    <div class="dropdown">
      <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {/* Login User */}
        {capitalize(currentUser.firstname, "User")}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <Link className="dropdown-item" to="/loans">
          My Accounts
        </Link>
        <Link className="dropdown-item" to="/">
          Transfer Money
        </Link>
        <hr className="dropdown-divider" />
        <Link className="dropdown-item" to="/userinfo">
          User Info
        </Link>
        <Link className="dropdown-item" to="/change-password">
          Change Password
        </Link>
        <Link className="dropdown-item" to="/" onClick={handleLogOut}>
          Log Out
        </Link>
      </div>
    </div>
  );
};

export default UserDropDown;
