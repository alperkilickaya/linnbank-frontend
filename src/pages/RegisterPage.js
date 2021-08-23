import React from "react";
import "./RegisterPage.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";

const validationSchema = Yup.object({
  ssn: Yup.string()
    .required("SSN required")
    .length(11, "SSN number can be 11 digit")
    .matches("^[0-9-]*$", "only numbers accepted"),
  firstName: Yup.string()
    .required("Firstname required")
    .matches("^[A-Za-z ]+$", "name can contain only alphabetic characters"),
  lastName: Yup.string()
    .required("Lastname required")
    .matches("^[A-Za-z ]+$", "lastname can contain only alphabetic characters"),
  address: Yup.string()
    .required("Adress required")
    .matches(
      "^([0-9]{5}|[A-Z][0-9][A-Z] ?[0-9][A-Z][0-9])$",
      "invalid address for US"
    ),
  password: Yup.string()
    .required("Password required")
    .matches(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{6,10}$",
      "Minimum six and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
    ),
  mobilePhoneNumber: Yup.string()
    .required("Mobile Phone Number required")
    .matches("^[0-9-]*$", "lastname can contain only alphabetic characters")
    .length(12, "wrong format for US telephone number"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match"
  ),
  email: Yup.string().email("Invalid email").required("Email required"),
});

const initialValues = {
  ssn: "",
  firstName: "",
  lastName: "",
  address: "",
  mobilePhoneNumber: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const onSubmit = (values) => {
  console.log(values);
};
/*
const validate = (values) => {
  //values.name......
  let errors = {};

  if (!values.ssn) {
    errors.ssn = "ssn required";
  } else if (!/^[0-9-]*$/.test(values.ssn)) {
    errors.ssn = "only numbers accepted";
  } else if (values.ssn.charAt(3) !== "-" && values.ssn.charAt(6) !== "-") {
    errors.ssn = "SSN format is false";
  } else if (values.ssn.length !== 11) {
    errors.ssn = "wrong SSN number";
  }
  if (!values.firstName) {
    errors.firstName = "First Name required";
  } else if (!/^[A-Za-z]+$/.test(values.firstName)) {
    errors.firstName = "only alphabetic characters are accepted";
  }
  if (!values.lastName) {
    errors.lastName = "Last Name required";
  } else if (!/^[A-Za-z]+$/.test(values.lastName)) {
    errors.lastName = "only alphabetic characters are accepted";
  }
  if (!values.address) {
    errors.address = "Adress required";
  } else if (
    !/^([0-9]{5}|[A-Z][0-9][A-Z] ?[0-9][A-Z][0-9])$/.test(values.address)
  ) {
    errors.address = "wrong postal code for US";
  }
  if (!values.mobilePhoneNumber) {
    errors.mobilePhoneNumber = "Mobile Phone Number required";
  } else if (!/^[0-9-]*$/.test(values.mobilePhoneNumber)) {
    errors.mobilePhoneNumber = "only numbers accepted";
  } else if (
    values.mobilePhoneNumber.charAt(3) !== "-" &&
    values.mobilePhoneNumber.charAt(7) !== "-"
  ) {
    errors.mobilePhoneNumber = "Phone number format is false (000-000-0000)";
  } else if (values.mobilePhoneNumber.length !== 12) {
    errors.mobilePhoneNumber = "wrong phone number number";
  }
  if (!values.email) {
    errors.email = "E-mail required";
  } else if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
      values.email
    )
  ) {
    errors.email = "wrong format";
  }
  if (!values.password) {
    errors.password = "Password required";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Password required";
  }
  if (values.password !== values.confirmPassword) {
    errors.password = "Passwords does not match";
    errors.confirmPassword = "Passwords does not match";
  }

  return errors;
};
*/
const RegisterPage = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const [type, setType] = useState(() => {
    return "input";
  });

  const show = (e) => {
    setType("input");
  };
  const hide = (e) => {
    setType("password");
  };

  const handleSsn = (e) => {
    const currentSsn = formik.values.ssn;
    //console.log(currentSsn);
    if (
      e.keyCode !== 8 &&
      (currentSsn.length === 3 || currentSsn.length === 6)
    ) {
      formik.setFieldValue("ssn", `${currentSsn}-`);
    }
  };



  console.log("passs:", formik.values.password);
  console.log("data:", formik.values);
  console.log("error:", formik.errors);
  //console.log(passwordStrenght(formik.values));

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
            onSubmit={formik.onChange}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onKeyDown={handleSsn}
                maxLength="11"
                value={formik.values.ssn}
              />
              {formik.touched.ssn && formik.errors.ssn ? (
                <div className="error-message">{formik.errors.ssn}</div>
              ) : null}
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
                onChange={formik.handleChange}
                value={formik.values.firstName}
                onBlur={formik.handleBlur}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="error-message">{formik.errors.firstName}</div>
              ) : null}
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
                onChange={formik.handleChange}
                value={formik.values.lastName}
                onBlur={formik.handleBlur}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="error-message">{formik.errors.lastName}</div>
              ) : null}
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
                onChange={formik.handleChange}
                value={formik.values.address}
                onBlur={formik.handleBlur}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="error-message">{formik.errors.address}</div>
              ) : null}
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
                onChange={formik.handleChange}
                value={formik.values.mobilePhoneNumber}
                onBlur={formik.handleBlur}
              />
              {formik.touched.mobilePhoneNumber &&
              formik.errors.mobilePhoneNumber ? (
                <div className="error-message">
                  {formik.errors.mobilePhoneNumber}
                </div>
              ) : null}
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
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-message">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="form-group">
              <label
                htmlFor="password"
                className="d-flex justify-content-start fw-bold"
              >
                New password
              </label>
              <div onMouseEnter={show} onMouseLeave={hide}>
                <input
                  name="password"
                  placeholder="New password"
                  id="password"
                  type={type}
                  className="form-control"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}                  
                />                
              </div >
             

              {formik.touched.password && formik.errors.password ? (
                <div className="error-message">{formik.errors.password}</div>
              ) : null}
            </div>
            <div id="strength">
              <small>
                <span>Password strength:</span>
              </small>
              <PasswordStrengthBar
                className="mt-3 mb-4 bar"
                password={formik.values.password}
              />
            
            </div>
            <div className="form-group">
              <label
                htmlFor="confirmPassword"
                className="d-flex justify-content-start fw-bold"
              >
                New password confirmation
              </label>
              <input
                name="confirmPassword"
                placeholder="Confirm the new password"
                id="confirmPassword"
                type="password"
                className="form-control"
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                onBlur={formik.handleBlur}
                onPaste={(e) => e.preventDefault()}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="error-message">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
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
