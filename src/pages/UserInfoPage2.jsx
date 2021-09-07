import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useHistory } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { getInfo, infoUpdate } from "../store/actions/auth.js";
import { Store } from ".././store/index2";

const UserInfoPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [ssn, setSsn] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const context = useContext(Store);

  const SendData = (e) => {};

  return (
    <>

      <div className="justify-content-center row">
        <div className="col-md-8">
          <h1 id="register-title">
            <span>
              Hos Geldiniz Sayin {context.user.userDAO.firstName} {context.user.userDAO.lastName} ...
            </span>
          </h1>
        </div>
      </div>

      <div className="justify-content-center row">
        <div className="col-md-8">
          <form id="register-form" className="av-invalid">
            <div className="form-group">
              <label htmlFor="ssn">SSN</label>
              <input
                name="ssn"
                placeholder="000-00-0000"
                id="ssn"
                type="text"
                className={`${errors.ssn && "is-invalid"} form-control`}
                maxLength="11"
                value={context.user.userDAO.ssn}
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
                name="firstName"
                id="firstName"
                type="text"
                className={`${errors.firstName && "is-invalid"} form-control`}
                value={context.user.userDAO.firstName}
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
                name="lastName"
                id="lastName"
                type="text"
                className={`${errors.lastName && "is-invalid"} form-control`}
                value={context.user.userDAO.lastName}
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
                className={`${errors.address && "is-invalid"} form-control`}
                maxLength="5"
                value={context.user.userDAO.address}
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
                className={`${
                  errors.mobilePhoneNumber && "is-invalid"
                } form-control`}
                maxLength="12"
                value={context.user.userDAO.mobilePhoneNumber}
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
                className={`${errors.email && "is-invalid"} form-control`}
                value={context.user.userDAO.email}
              />
            </div>

            <button
              type="submit"
              id="register-submit"
              className="btn btn-round"
              onClick={(e) => SendData(e)}
              disabled={loading}
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
