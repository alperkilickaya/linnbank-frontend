import React, { useState } from "react";
import "./RegisterPage.css";
import PasswordStrength from "../utils/PasswordStrength";
import * as yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import PasswordStrengthBar from "react-password-strength-bar";
import JHipPasswordBar from "../utils/JHipPAsswordBar";

const schema = yup.object().shape({
  ssn: yup
    .string()
    .matches(
      /^(?!219-09-9999|078-05-1120)(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/,
      "Please enter a valid SSN"
    )
    .max(11)
    .required(),
  firstName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .max(40)
    .nullable(false)
    .required(),
  lastName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .max(40)
    .required(),
  address: yup.string().min(2).required(),
  email: yup.string().email().required(),
  mobilePhoneNumber: yup.string().matches(new RegExp("[0-9]{7}")).required(),
  password: yup.string().required("Password is required"),
  secondPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const RegisterForm = (props) => {
  const [type, setType] = useState("password");

  const showHide = (e) => {
    let currentType = type === "input" ? "password" : "input";
    setType(currentType);
  };

  const handleOnChange = (e) => {
    const value = props.values.ssn;
    if (e.keyCode !== 8 && (value.length === 3 || value.length === 6)) {
      props.setFieldValue("ssn", `${value}-`);
    }
  };

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
          <Form
            noValidate
            id="register-form"
            method="post"
            className="av-invalid"
          >
            <div className="form-group">
              <label htmlFor="ssn">SSN</label>
              <Field
                name="ssn"
                placeholder="000-00-0000"
                id="ssn"
                type="text"
                className="form-control"
                maxLength="11"
                // onChange={(e) => handleOnChange(e)}
                onKeyDown={handleOnChange}
              />
              <ErrorMessage name="ssn" />
            </div>
            <div className="form-group">
              <label
                htmlFor="firstName"
                className="d-flex justify-content-start fw-bold"
              >
                First Name
              </label>
              <Field
                name="firstName"
                id="firstName"
                type="text"
                className="form-control"
              />
              <ErrorMessage name="firstName" />
            </div>
            <div className="form-group">
              <label
                htmlFor="lastName"
                className="d-flex justify-content-start fw-bold"
              >
                Last Name
              </label>
              <Field
                name="lastName"
                id="lastName"
                type="text"
                className="form-control"
              />
              <ErrorMessage name="lastName" />
            </div>

            <div className="form-group">
              <label
                htmlFor="address"
                className="d-flex justify-content-start fw-bold"
              >
                Address
              </label>
              <Field
                name="address"
                id="address"
                type="text"
                className="form-control"
              />
              <ErrorMessage name="address" />
            </div>
            <div className="form-group">
              <label
                htmlFor="mobilePhoneNumber"
                className="d-flex justify-content-start fw-bold"
              >
                Mobile Phone Number
              </label>
              <Field
                name="mobilePhoneNumber"
                placeholder="000-000-0000"
                id="mobilePhoneNumber"
                type="text"
                className="form-control"
              />
              <ErrorMessage name="mobilePhoneNumber" />
            </div>

            <div className="form-group">
              <label
                htmlFor="email"
                className="d-flex justify-content-start fw-bold"
              >
                Email
              </label>
              <Field
                name="email"
                placeholder="Your email"
                id="email"
                type="email"
                className="form-control"
              />
              <ErrorMessage name="email" />
            </div>
            <div className="form-group">
              <label
                htmlFor="password"
                className="d-flex justify-content-start fw-bold"
              >
                New password
              </label>
              <div className="input-group" id="show_hide_password">
                <Field
                  name="password"
                  placeholder="New password"
                  id="password"
                  type={type}
                  className="form-control"
                />
                <span
                  onClick={showHide}
                  className="input-group-text"
                  id="togglePassword"
                  style={{
                    cursor: "pointer",
                    borderRadius: "0px",
                  }}
                >
                  {type === "password" ? (
                    <img
                      src="assets/img/icon/password-show.svg"
                      alt="show-password"
                    />
                  ) : (
                    <img
                      src="assets/img/icon/password-hide.svg"
                      alt="hide-password"
                    />
                  )}
                </span>
              </div>
              <ErrorMessage name="password" style={{ display: "block" }} />
            </div>

            {/* <span className="show-password" onClick={showHide}>
              {type === "password" ? "Show Password" : "Hide"}
            </span> */}

            {/* Password PasswordStrength bar added  */}
            <JHipPasswordBar password={props.values.password} />
            <div className="form-group">
              <label
                htmlFor="secondPassword"
                className="d-flex justify-content-start fw-bold"
              >
                New password confirmation
              </label>
              <Field
                name="secondPassword"
                placeholder="Confirm the new password"
                id="secondPassword"
                type="password"
                className="form-control"
              />
              <ErrorMessage name="secondPassword" />
            </div>

            <button
              type="submit"
              id="register-submit"
              className="btn btn-round"
              onClick={props.submitForm}
              // disabled={props.isSubmitting}
            >
              <span>Register</span>
            </button>
          </Form>

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

const RegisterPage = () => {
  return (
    <div>
      <Formik
        initialValues={{
          ssn: "",
          firstName: "",
          lastName: "",
          address: "",
          email: "",
          mobilePhoneNumber: "",
          password: "",
          secondPassword: "",
        }}
        validationSchema={schema}
        onSubmit={(values, actions) => {
          alert(JSON.stringify(values));
          console.log(values);
          // actions.resetForm();
          // actions.setSubmitting(false);
        }}
        component={RegisterForm}
      ></Formik>
    </div>
  );
};

export default RegisterPage;
