import React from "react";
import { Link } from "react-router-dom";

const SignInPage = (props) => {
  

  return (
    <>
      <div className="justify-content-center row">
        <div className="col-md-8">
          <h1 id="register-title">
            <span>Signin</span>
          </h1>
        </div>
      </div>

      <div className="container-fluid row d-flex justify-content-center  ">
        <div className=" container row d-flex justify-content-center  ">
          <form className="col-md-8"  method="post" noValidate>
            <div className="text-secondary fw-bold form-group ">
              <label
                htmlFor="ssn"
                className="d-flex justify-content-start"
              >
                SSN
              </label>
              <input
                name="ssn"
                type="text"
                className="form-control"
                placeholder="000-00-0000"
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="password"
                className="d-flex justify-content-start fw-bold"
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Your password"
              />
            </div>

            
            <button
              type="submit"
              className="btn btn-round mx-2 px-3"
            >
              <span>Signin</span>
            </button>
          </form>

          <div className="col-md-8">
            <div
              className="alert alert-warning fade show d-flex justify-content-center my-3"
              role="alert"
            >
              <p>
                Did you forget your
                <span>
                  &nbsp; <b> password ?</b>
                </span>
              </p>
            </div>
          </div>

          <div className="col-md-8">
            <div
              className="alert alert-warning fade show d-flex justify-content-center my-3"
              role="alert"
            >
              <p>
                You don't have an account yet?&nbsp;
                <span>
                  <b><Link to="register">Register a new account</Link></b>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignInPage;
