import React from "react";

const UserInfoPage = () => {
  
  return (
    <>
      <div className="justify-content-center row">
        <div className="col-md-8">
          <h1 id="register-title">
            <span>User settings for [xxxxxxx]</span>
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
    </>
  );
};

export default UserInfoPage;
