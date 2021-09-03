import React from "react";
import "./RegisterPage.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import PasswordStrengthBar from "react-password-strength-bar";
import service from "../service/registerLoginService";
import { useHistory } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";

const validationSchema = Yup.object({
  ssn: Yup.string()
    .required("SSN required")
    .length(11, "SSN number can be 11 digit")
    .matches("^[0-9-]*$", "only numbers accepted"),
  firstName: Yup.string()
    .required("Firstname required")
    .max(20)
    .min(2)
    .matches("^[A-Za-z ]+$", "name can contain only alphabetic characters"),
  lastName: Yup.string()
    .required("Lastname required")
    .max(20)
    .min(2)
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
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "Minimum eight, at least one uppercase letter, one lowercase letter, one number and one special character:"
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

const RegisterPage = () => {
  const history = useHistory();
  const [message, setMessage] = useState("");

  const formik = useFormik({
    initialValues,
    validationSchema,
  });

  const SendData = (e) => {
    console.log("data has gone2");
    e.preventDefault();

    service
      .login(formik.values)
      .then((res) => {
        setMessage(res);
        console.log("response", res);
        if (res.status === 200) {
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setTimeout(() => {
            history.push("/");
          }, 10000);
        }
      })
      .catch((e) => {
        setMessage(e.response.data.message);
        console.log("message:", message);
        toast.error(`👎 ${e.response.data.message}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  };

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

    if (
      e.keyCode !== 8 &&
      (currentSsn.length === 3 || currentSsn.length === 6)
    ) {
      formik.setFieldValue("ssn", `${currentSsn}-`);
    }
  };

  const handleMobileNumber = (e) => {
    const currentMobile = formik.values.mobilePhoneNumber;
    if (
      e.keyCode !== 8 &&
      (currentMobile.length === 3 || currentMobile.length === 7)
    ) {
      formik.setFieldValue("mobilePhoneNumber", `${currentMobile}-`);
    }
  };

  console.log("data:", formik.values);

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
            //onSubmit={SendData}
            id="register-form"
            className="av-invalid"
          >
            <div className="form-group">
              <label htmlFor="ssn">SSN</label>
              <input
                name="ssn"
                placeholder="000-00-0000"
                id="ssn"
                type="text"
                className={`${
                  formik.touched.ssn && formik.errors.ssn && "is-invalid"
                } form-control`}
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
                className={`${
                  formik.touched.firstName &&
                  formik.errors.firstName &&
                  "is-invalid"
                } form-control`}
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
                className={`${
                  formik.touched.lastName &&
                  formik.errors.lastName &&
                  "is-invalid"
                } form-control`}
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
                className={`${
                  formik.touched.address &&
                  formik.errors.address &&
                  "is-invalid"
                } form-control`}
                onChange={formik.handleChange}
                value={formik.values.address}
                onBlur={formik.handleBlur}
                maxLength="5"
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
                className={`${
                  formik.touched.mobilePhoneNumber &&
                  formik.errors.mobilePhoneNumber &&
                  "is-invalid"
                } form-control`}
                onChange={formik.handleChange}
                maxLength="12"
                value={formik.values.mobilePhoneNumber}
                onBlur={formik.handleBlur}
                onKeyDown={handleMobileNumber}
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
                className={`${
                  formik.touched.email && formik.errors.email && "is-invalid"
                } form-control`}
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
                  className={`${
                    formik.touched.password &&
                    formik.errors.password &&
                    "is-invalid"
                  } form-control`}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                />
              </div>

              {formik.touched.password && formik.errors.password ? (
                <div className="error-message">{formik.errors.password}</div>
              ) : null}
            </div>
            <div id="strength">
              <small>
                <span>Password strength:</span>
              </small>
              <PasswordStrengthBar
                className="mt-1 mb-3 bar"
                password={formik.values.password}
                shortScoreWord=""
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
                className={`${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword &&
                  "is-invalid"
                } form-control`}
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
              onClick={(e) => SendData(e)}
            >
              <span>Register</span>
            </button>
            <>
              <ToastContainer autoClose={10000} transition={Zoom} />
            </>
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
