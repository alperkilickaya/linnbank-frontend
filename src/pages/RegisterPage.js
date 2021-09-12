import React from "react";
import "./RegisterPage.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import service from "../service/registerLoginservice";
// import passwordStrengthBar from "react-password-strength-bar";
// import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, zoom, Bounce } from "react-toastify";

const validationSchema = Yup.object({
  ssn: Yup.string()
    .required("SSN required")
    .length(11, "000-00-0000")
    .matches("^[0-9]*$", "only numbers accepted "),
  firstName: Yup.string()
    .required("FirtName required")
    .min(3)
    .max(20)
    .matches("^[A-Za-z]+$", "name can contain only alphabetic characters"),
  lastName: Yup.string()
    .required("lastName required")
    .min(3)
    .max(20)
    .matches("^[A-Za-z]+$", "name can contain only alphabetic characters"),
  address: Yup.string()
    .required("address required")
    .matches(
      "^([0-9]{5}|[A-Z][0-9][A-Z]?[0-9][A-Z][0-9])$",
      "invalid address for us"
    ),
  password: Yup.string()
    .required("password required")
    .matches(
      "^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9)(?=.*?[#?!@$%^&*-_]).{8,}$",
      "minimum eight characters,at least one uppercase letter, one lowercase letter,one number and one special character:"
    ),
  mobilePhoneNumber: Yup.string()
    .required("mobilePhoneNumber required")
    .matches("^[0-9]*$", "mobilePhoneNumber contain only numbers")
    .length(12, "Wrong format for us telephone number"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "password must match"
  ),
  email: Yup.string().email("invalid email").required("email required"),
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
    initialValues: initialValues,
    validationSchema,
    // onSubmit
  });

  const sendData = (e) => {
    console.log("Data has gone (sendData)");
    e.preventDefault();
  };
  service
    .login(formik.values)
    .then((res) => {
      setMessage(res);
      console.log("response", res);
      if (res.status == 200) {
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
      toast.error(`${e.response.data.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
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
    const currentSssn = formik.values.ssn;
    if (
      e.keyCode !== 8 &&
      (currentSssn.length === 3 || currentSssn.length === 6)
    ) {
      formik.setFieldValue("ssn", `$(currentSssn)-`);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center row">
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
              <label htmlFor="ssn">SSN</label>
              <input
                name="ssn"
                value={formik.values.ssn}
                placeholder="000-00-0000"
                id="ssn"
                type="text"
                className={`${
                  formik.touched.ssn && formik.errors.ssn && "is-invalid"
                }form-control`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onKeyDown={formik.handleSsn} //bak
                maxLength="11"
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
                value={formik.values.firstName}
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
                value={formik.values.lastName}
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
                value={formik.values.address}
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
                value={formik.values.mobilePhoneNumber}
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
                value={formik.values.email}
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
                value={formik.values.password}
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
                  formik.error.confirmPassword &&
                  "is-invalid"
                }form-control`}
                onchange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                onPaste={(e) => e.preventDefault()}
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
