import { useFormik } from "formik";
import React from "react";
import "./RegisterPage.css";
import * as Yup from "yup";

const initialValues = {
  ssn: "",
  firstName: "",
  lastName: "",
  address: "",
  mobilePhoneNumber: "",
  email: "",
  password: "",
  secondPassword: "",
};

const onSubmit = (values) => {
  console.log("Form Data", values);
};

const validationSchema = Yup.object({
  ssn: Yup.string()
    .matches("^[0-9]{3}-[0-9]{2}-[0-9]{4}$", "*SSN is not valid!")
    .required("*Required!"),
  firstName: Yup.string()
    .min(3, "*Firstname must be at least 3")
    .matches("^[A-Za-z ]*$", "*Firstname should be consist of letters")
    .required("*Required!"),
  lastName: Yup.string()
    .min(3, "*Lastname must be at least 3")
    .matches("^[A-Za-z ]*$", "*Lastname should be consist of letters")
    .required("*Required!"),
  address: Yup.string()
    .matches("^[A-Za-z0-9/. ]*$", "*Adress format is not valid!")
    .required("*Required!"),
  mobilePhoneNumber: Yup.string()
    .matches(
      "^[0-9]{3}-[0-9]{3}-[0-9]{4}$",
      "*Mobilphone format must be '000-000-0000'."
    )
    .required("*Required!"),
  email: Yup.string().email("*Invalid e-mail format!").required("*Required!"),
  password: Yup.string()
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "*Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!"
    )
    .required("*Required!"),
  secondPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "*Passwords must be match")
    .required("*Required"),
});

const RegisterPage = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  // console.log("Form values", formik.values);

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
            onSubmit={formik.handleSubmit} //to handle the form submission
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
                value={formik.values.ssn}
                maxLength="11"
              />
              {formik.touched.ssn && formik.errors.ssn ? (
                <div className="error">{formik.errors.ssn}</div>
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
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="error">{formik.errors.firstName}</div>
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
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="error">{formik.errors.lastName}</div>
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
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="error">{formik.errors.address}</div>
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
                onBlur={formik.handleBlur}
                value={formik.values.mobilePhoneNumber}
                maxLength="12"
              />
              {formik.touched.mobilePhoneNumber &&
              formik.errors.mobilePhoneNumber ? (
                <div className="error">{formik.errors.mobilePhoneNumber}</div>
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
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onPaste={(e) => e.preventDefault()}
                value={formik.values.secondPassword}
              />
              {formik.touched.secondPassword && formik.errors.secondPassword ? (
                <div className="error">{formik.errors.secondPassword}</div>
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
