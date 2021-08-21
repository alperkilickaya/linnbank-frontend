import React from "react";

const ChangePasswordPage = () => {
  


  return (
    <>
      <div className="justify-content-center row">
        <div className="col-md-8">
          <h1 id="register-title">
            <span>Change your password</span>
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
              <p>Enter your current password and the new one to change your password.</p>
            </div>
          </div>

          <form className="col-md-8" method="post" noValidate>
            <div className="text-secondary fw-bold form-group ">
              <label for="currentPassword" className="d-flex justify-content-start">
                Current Password *
              </label>
              <input
                name="currentPassword"
                type="password"
                className="form-control"
              />
            </div>

            <div className="text-secondary fw-bold form-group ">
              <label for="currentPassword" className="d-flex justify-content-start">
                New Password *
              </label>
              <input
                name="newPassword"
                type="password"
                className="form-control"
              />
            </div>
            
            <div className="text-secondary fw-bold form-group ">
              <label for="confirmPassword" className="d-flex justify-content-start">
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                type="password"
                className="form-control"
              />
            </div>
              
              <button type="submit" 
              className="btn btn-primary mx-2"
              >
              <span>Change Password</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordPage;
