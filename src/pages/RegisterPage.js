import React, { useState } from "react";
import "./RegisterPage.css";
import * as yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import JHipPasswordBar from "../utils/JHipPAsswordBar";
import ApiService from "../utils/api-service";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
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
  password: yup
    .string()
    .required("*Password is required")
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "*Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!"
    ),
  secondPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("*Confirm Password is required"),
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

  const handleOnChangePhone = (e) => {
    const value = props.values.mobilePhoneNumber;
    if (e.keyCode !== 8 && (value.length === 3 || value.length === 7)) {
      props.setFieldValue("mobilePhoneNumber", `${value}-`);
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
                className={`${props.errors.ssn && "is-invalid"} form-control`}
                maxLength="11"
                // onChange={(e) => handleOnChange(e)}
                onKeyDown={handleOnChange}
              />

              <div className="invalid-feedback">
                <ErrorMessage name="ssn" />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="firstName"
                className="d-flex justify-content-start fw-bold"
              >
                First Name
              </label>
              <Field
                name="firstname"
                id="firstName"
                type="text"
                className={`${
                  props.errors.firstName && "is-invalid"
                } form-control`}
              />
              <div className="invalid-feedback">
                <ErrorMessage name="firstName" />
              </div>
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
                className={`${
                  props.errors.lastName && "is-invalid"
                } form-control`}
              />

              <div className="invalid-feedback">
                <ErrorMessage name="lastName" />
              </div>
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
                className={`${
                  props.errors.address && "is-invalid"
                } form-control`}
              />
              <div className="invalid-feedback">
                <ErrorMessage name="address" />
              </div>
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
                onKeyDown={handleOnChangePhone}
                maxLength="12"
                className={`${
                  props.errors.mobilePhoneNumber && "is-invalid"
                } form-control`}
              />

              <div className="invalid-feedback">
                <ErrorMessage name="mobilePhoneNumber" />
              </div>
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
                className={`${props.errors.email && "is-invalid"} form-control`}
              />
              <div className="invalid-feedback">
                <ErrorMessage name="email" />
              </div>
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
                  className={`${
                    props.errors.password && "is-invalid"
                  } form-control`}
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
              <div className="invalid-feedback d-block">
                <ErrorMessage name="password" />
              </div>
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
                className={`${
                  props.errors.secondPassword && "is-invalid"
                } form-control`}
              />

              <div className="invalid-feedback">
                <ErrorMessage name="secondPassword" />
              </div>
            </div>

            <button
              type="submit"
              id="register-submit"
              className="btn btn-round"
              // onClick={props.submitForm}
              disabled={props.isSubmitting}
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
  const history = useHistory();
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
          // alert(JSON.stringify(values));
          // console.log(values);
          // actions.resetForm();
          ApiService.post("auth/register", values)
            .then((res) => {
              if (res.status === 200) {
                toast.success(
                  "👍 Register Successful. Please signin with your valid credential.",
                  {
                    position: "top-center",
                  }
                );
                history.push("/signin");

                // actions.resetForm();
                actions.setSubmitting(false);
              }
            })
            .catch((err) => {
              toast.error(`👎 ${err.response.data.message}`, {
                position: toast.POSITION.TOP_CENTER,
              });
              // actions.setSubmitting(true);
              // console.log(err);
            });
          actions.setSubmitting(false);
        }}
        component={RegisterForm}
      ></Formik>
    </div>
  );
};

export default RegisterPage;
