import React from "react";

const ResetPasswordPage = () => {
  return (
    <>
      <div className="justify-content-center row">
        <div className="col-md-8">
          <h1 id="register-title">
            <span>Reset your password</span>
          </h1>
        </div>
      </div>

      <div className="container-fluid row d-flex justify-content-center  ">
        <div className=" container row d-flex justify-content-center  ">
          <div className="col-md-8">
            <div
              className="alert alert-warning fade show d-flex justify-content-center my-3"
              role="alert"
            >
              <p>Enter the email address you used to register</p>
            </div>
          </div>

          <form className="col-md-8">
            <div className="text-secondary fw-bold form-group ">
              <label for="firstname" className="d-flex justify-content-start">
                Email
              </label>
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Your email"
              />
            </div>

            <button type="submit" className="btn btn-primary mx-2 ">
              <span>Reset password</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
