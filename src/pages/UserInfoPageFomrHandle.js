import React, { useContext, useState } from "react";
import { Store } from "../store";
import { capitalize } from "../utils/TextUtils";
import { useHistory } from "react-router";
import * as yup from "yup";

const schema = yup.object().shape({
  ssn: yup
    .string()
    .matches(
      /^(?!219-09-9999|078-05-1120)(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/,
      "Please enter a valid SSN"
    )
    .max(11)
    .required("*SSN required"),
  firstName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter a valid firstname")
    .min(2)
    .max(40)
    .nullable(false)
    .required("*Firstname required"),
  lastName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter a valid lastname")
    .min(2)
    .max(40)
    .required("*Lastname required"),
  address: yup
    .string()
    .min(2, "Address must be at least 2 characters")
    .required("*Address required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("*Email required"),
  mobilePhoneNumber: yup
    .string()
    .matches(
      "^[0-9]{3}-[0-9]{3}-[0-9]{4}$",
      "*Mobilphone format must be '000-000-0000'."
    )
    .required("*Phone number required"),
});

const UserInfoPage = () => {
  const { currentUser, setCurrentUser } = useContext(Store);
  const handleOnChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setCurrentUser(() => {
      return { ...currentUser, [name]: value };
    });
  };

  const history = useHistory();
  return (
    <React.Fragment>
      {(!currentUser || !currentUser.role) && history.push("/")}
      {currentUser && (
        <React.Fragment>
          <div className="justify-content-center row">
            <div className="col-md-8">
              <h1 id="register-title">
                <span>User settings for [ {currentUser.firstname} ]</span>
              </h1>
            </div>
          </div>
          <div className="justify-content-center row">
            <div className="col-md-8">
              <form
                noValidate
                id="register-form"
                method="post"
                className="av-invalid"
              >
                <div className="form-group">
                  <label htmlFor="ssn">SSN</label>
                  <input
                    name="ssn"
                    placeholder="000-00-0000"
                    id="ssn"
                    type="text"
                    className="form-control"
                    value={currentUser.ssn}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="firstname"
                    className="d-flex justify-content-start fw-bold"
                  >
                    First Name
                  </label>
                  <input
                    name="firstname"
                    id="firstname"
                    type="text"
                    className="form-control"
                    value={currentUser.firstname}
                    onChange={handleOnChange}
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="lastname"
                    className="d-flex justify-content-start fw-bold"
                  >
                    Last Name
                  </label>
                  <input
                    name="lastname"
                    id="lastname"
                    type="text"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="address"
                    className="d-flex justify-content-start fw-bold"
                  >
                    Address
                  </label>
                  <input
                    name="address"
                    id="address"
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label
                    htmlFor="mobilePhoneNumber"
                    className="d-flex justify-content-start fw-bold"
                  >
                    Mobile Phone Number
                  </label>
                  <input
                    name="mobilePhoneNumber"
                    placeholder="000-000-0000"
                    id="mobilePhoneNumber"
                    type="text"
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label
                    htmlFor="email"
                    className="d-flex justify-content-start fw-bold"
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    placeholder="Your email"
                    id="email"
                    type="email"
                    className="form-control"
                    value={currentUser?.email}
                    onChange={handleOnChange}
                  />
                </div>

                <button
                  type="submit"
                  id="register-submit"
                  className="btn btn-round"
                >
                  <span>Update</span>
                </button>
              </form>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default UserInfoPage;
