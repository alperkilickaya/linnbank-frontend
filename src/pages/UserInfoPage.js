import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";
import service from "../service/registerLoginService";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInfo } from "../store/actions/auth.js";
import axios from "axios";




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
  mobilePhoneNumber: Yup.string()
    .required("Mobile Phone Number required")
    .matches("^[0-9-]*$", "lastname can contain only alphabetic characters")
    .length(12, "wrong format for US telephone number"),
  email: Yup.string().email("Invalid email").required("Email required"),
});

  const initialValues = {
    ssn: "",
    firstName: "",
    lastName: "",
    address: "",
    mobilePhoneNumber: "",
    email: ""
  };

const UserInfoPage = () => {
  const [message, setMessage] = useState("");
  const history = useHistory();
  const [data,setData] = useState({});
  const formik = useFormik({
    initialValues,
    validationSchema,
  });
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getInfo())
    //console.log('xxxxx',localStorage.getItem('user'));
    setData(localStorage.getItem('user'));
    console.log('data',data);
  },[] );
  






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
  const name = localStorage.getItem('firstName').substring(1,localStorage.getItem('firstName').length-1)
  const lastname = localStorage.getItem('lastName').substring(1,localStorage.getItem('lastName').length-1)

  
  return (
    <> 
    
      <div className="justify-content-center row">
        <div className="col-md-8">
          <h1 id="register-title">
            <span>Hos Geldiniz {name} {lastname} ...</span>
          </h1>
        </div>
      </div>

        <div className="justify-content-center row">
        <div className="col-md-8">
        
        <form
              id="register-form"              
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
                  htmlFor="firstname"
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
                  htmlFor="lastname"
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
              

              <button
                type="submit"
                id="register-submit"
                className="btn btn-round"
                onClick={(e) => SendData(e)}
              >
                <span>Update</span>
              </button>
              <>
              <ToastContainer autoClose={10000} transition={Zoom} />
            </>
            </form>
          
        </div>
      </div>
    </>
  );
};

export default UserInfoPage;
