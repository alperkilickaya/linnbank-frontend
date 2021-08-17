import React from "react";
import "./RegisterPage.css";

const RegisterPage = () => {

  return (
    <>
      <div className="justify-content-center row">
        <div className="col-md-8">
          <h1 id="register-title">
            <span>Registration</span>
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
                <label
                  htmlFor="ssn">
                  SSN
                </label>
                <input
                  name="ssn"
                  placeholder="000-00-0000"
                  id="ssn"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="firstName"
                  className="d-flex justify-content-start fw-bold"
                >
                  First Name
                </label>
                <input
                  name="firstName"
                  id="firstName"
                  type="text"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="lastName"
                  className="d-flex justify-content-start fw-bold"
                >
                  Last Name
                </label>
                <input
                  name="lastName"
                  id="lastName"
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
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="password"
                  className="d-flex justify-content-start fw-bold"
                >
                  New password
                </label>
                <input
                  name="password"
                  placeholder="New password"
                  id="password"
                  type="password"
                  className="form-control"
                />
              </div>
              <div id="strength">
                <small>
                  <span>Password strength:</span>
                </small>
                <ul id="strengthBar w-25">
                  <li
                    className="point"
                    style={{ backgroundColor: "#FF0000" }}
                  ></li>
                  <li
                    className="point"
                    style={{ backgroundColor: "#99FF00" }}
                  ></li>
                  <li
                    className="point"
                    style={{ backgroundColor: "#99FF00" }}
                  ></li>
                  <li
                    className="point"
                    style={{ backgroundColor: "#99FF00" }}
                  ></li>
                  <li
                    className="point"
                    style={{ backgroundColor: "#DDDDDD" }}
                  ></li>
                </ul>
              </div>
              <div className="form-group">
                <label
                  htmlFor="secondPassword"
                  className="d-flex justify-content-start fw-bold"
                >
                  New password confirmation
                </label>
                <input
                  name="secondPassword"
                  placeholder="Confirm the new password"
                  id="secondPassword"
                  type="password"
                  className="form-control"
                />
              </div>
              

              <button
                type="submit"
                id="register-submit"
                className="btn btn-round"
              >
                <span>Register</span>
              </button>
              
            </form>
          

          <p>&nbsp;</p>

          <div
            className="alert alert-warning fade show d-flex justify-content-center my-3 mx-3 w-75"
            role="alert"
          >
            <p className="d-flex flex-start ">
              <span>
                If you want to sign in, you can try the default accounts:
              </span>
              <br />
              <span>- Administrator (login="admin" and password="admin")</span>
              <br />
              <span>- User(login="user" and password="user").</span>
            </p>
          </div>
        </div>
      </div>
    
    </>
  );
};

export default RegisterPage;
