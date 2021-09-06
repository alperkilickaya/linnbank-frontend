import React from "react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";

import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../store/actions/auth.js";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import { useHistory } from "react-router";



const validationSchema = Yup.object({
  ssn: Yup.string()
    .required("SSN required")
    .length(11, "SSN number can be 11 digit")
    .matches("^[0-9-]*$", "only numbers accepted"),
  password: Yup.string()
    .required("Password required")
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "Minimum eight, at least one uppercase letter, one lowercase letter, one number and one special character:"
    ),
});

const initialValues = {
  ssn: "",
  password: "",
};

const SignInPage = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  //const {isLoggedIn} = useSelector((state)=>state.auth)
  //const {message} = useSelector((state)=>state.message)

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

  const formik = useFormik({
    initialValues,
    validationSchema,
  });
/*
  if(isLoggedIn){
    return <Redirect to='/profile'/>;
  }
*/
  const SendData = (e) => {
    console.log("data has gone2");
    e.preventDefault();

    setLoading(true);

    dispatch(login(formik.values.ssn, formik.values.password))
      .then((e) => {
        //   //props.history.push("/profile");
        //window.location.reload();

        toast.success("You Have Successfully Loged In", {
          position: toast.POSITION.TOP_CENTER,
        });
        setTimeout(() => {
          history.push("/userinfo");
        }, 5000);
      })
      .catch(() => {
        toast.error("Loged In Denied", {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
      });
  };

  console.log(formik.values);
  return (
    <>
      <div className="justify-content-center row">
        <div className="col-md-8">
          <h1 id="register-title">
            <span>Signin</span>
          </h1>
        </div>
      </div>

      <div className="container-fluid row d-flex justify-content-center  ">
        <div className=" container row d-flex justify-content-center  ">
          <form className="col-md-8">
            <div className="text-secondary fw-bold form-group ">
              <label htmlFor="ssn" className="d-flex justify-content-start">
                SSN
              </label>
              <input
                name="ssn"
                type="text"
                placeholder="000-00-0000"
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
                htmlFor="password"
                className="d-flex justify-content-start fw-bold"
              >
                Password
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

            <button
              type="submit"
              id="register-submit"
              className="btn btn-round"
              onClick={(e) => SendData(e)}
              //disabled={loading}
            >
              <>
                <ToastContainer autoClose={6000} transition={Zoom} />
              </>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>LOG iN</span>
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
                  &nbsp; <b> password ?</b>
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
