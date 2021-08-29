import { useFormik, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
const Slasheye = <FontAwesomeIcon icon={faEyeSlash} />;

const initialValues = {
  ssn: "",
  password: "",
};

const validationSchema = Yup.object({
  ssn: Yup.string()
    .matches("^[0-9]{3}-[0-9]{2}-[0-9]{4}$", "*SSN is not valid!")
    .required("*Required!"),
  password: Yup.string()
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "*Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!"
    )
    .required("*Required!"),
});

const onSubmit = (values) => {
  console.log("Form Data", values);
};

const SignInPage = (props) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  const [type, setType] = useState("password");

  const showHide = (e) => {
    let currentType = type === "input" ? "password" : "input";
    setType(currentType);
  };
  return (
    <>
      <div className="justify-content-center row">
        <div className="col-md-8">
          <h1 id="register-title">
            <span>Sign-In</span>
          </h1>
        </div>
      </div>
      <div className="container-fluid row d-flex justify-content-center  ">
        <div className=" container row d-flex justify-content-center  ">
          <form className="col-md-8" method="post" noValidate>
            <div className="text-secondary fw-bold form-group ">
              <label htmlFor="ssn" className="d-flex justify-content-start">
                SSN
              </label>
              <input
                name="ssn"
                type="text"
                id="ssn"
                className="form-control"
                placeholder="000-00-0000"
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
                htmlFor="password"
                className="d-flex justify-content-start fw-bold"
              >
                Password
              </label>
              <input
                name="password"
                className="form-control"
                placeholder="Your password"
                type={type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <span className="show-password" onClick={showHide}>
                {type === "password" ? <i>{Slasheye}</i> : <i>{eye}</i>}
              </span>
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>

            <button type="submit" className="btn btn-round mx-2 px-3">
              <span>Sign-in</span>
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
                  &nbsp;{" "}
                  <b>
                    <Link to="/change-password"> password ?</Link>
                  </b>
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
                  <b>
                    <Link to="register">Register a new account</Link>
                  </b>
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
