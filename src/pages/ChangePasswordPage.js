import React from "react";
import * as Yup from "yup";
import { useHistory } from "react-router";
import { useFormik } from "formik";
import { useState } from "react";
import ApiService from "../utils/api-service";
import { toast } from "react-toastify";
import { useContext, useEffect } from "react";
import { Store } from ".././store/index2";

let onSubmit = {};

const validationSchema = Yup.object({
  currentPassword: Yup.string()
    .required("These Area Cannot Leaved Blank")
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "Minimum eight, at least one uppercase letter, one lowercase letter, one number and one special character:"
    ),
  newPassword: Yup.string()
    .required("These Area Cannot Leaved Blank")
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "Minimum eight, at least one uppercase letter, one lowercase letter, one number and one special character:"
    ),
  newPassword2: Yup.string()
    .required("These Area Cannot Leaved Blank")
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "Minimum eight, at least one uppercase letter, one lowercase letter, one number and one special character:"
    ),
});
const initialValues = {
  currentPassword: "",
  newPassword: "",
  newPassword2: "",
};

const ChangePasswordPage = () => {
  const context = useContext(Store);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const SendData = (e) => {
    setLoading(true);
    ApiService.post("/api/changePassword", {
      currentPassword: formik.values.currentPassword,
      newPassword: formik.values.newPassword,
      newPassword2: formik.values.newPassword2,
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success("You Have Successfully updated data", {
            position: toast.POSITION.TOP_CENTER,
          });
          setTimeout(() => {
            history.push("/");
          }, 3000);
          setLoading(false);
        }
      })
      .catch((err) => {
        //console.log(err?.response?.data?.message);
        toast.error(err?.response?.data?.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
      });
  };

  return (
    <>
      <div className="justify-content-center row">
        <div className="col-md-8">
          <h1 id="register-title">
          <div>
              Sayin {context?.user?.firstName}{" "}
              {context?.user?.lastName} ...
            </div>
            <span>Change your password</span>
          </h1>
        </div>
      </div>

      <div className="container-fluid row d-flex justify-content-center  ">
        <div className=" container row d-flex justify-content-center  ">
          <div className="col-md-8">
            <div
              className="alert alert-warning fade show d-flex justify-content-center my-3"
              role="alert"
            >
              <p>
                Enter your current password and the new one to change your
                password.
              </p>
            </div>
          </div>

          <form className="col-md-8">
            <div className="text-secondary fw-bold form-group ">
              <label
                htmlFor="currentPassword"
                className="d-flex justify-content-start"
              >
                Current Password *
              </label>
              <input
                name="currentPassword"
                placeholder="New password"
                id="currentPassword"
                className={`${
                  formik.touched.currentPassword &&
                  formik.errors.currentPassword &&
                  "is-invalid"
                } form-control`}
                onChange={formik.handleChange}
                value={formik.values.currentPassword}
                onBlur={formik.handleBlur}
              />
              {formik.touched.currentPassword &&
              formik.errors.currentPassword ? (
                <div className="error-message">
                  {formik.errors.currentPassword}
                </div>
              ) : null}
            </div>

            <div className="text-secondary fw-bold form-group ">
              <label
                htmlFor="currentPassword"
                className="d-flex justify-content-start"
              >
                New Password *
              </label>
              <input
                name="newPassword"
                placeholder="New password"
                id="newPassword"
                className={`${
                  formik.touched.newPassword &&
                  formik.errors.newPassword &&
                  "is-invalid"
                } form-control`}
                onChange={formik.handleChange}
                value={formik.values.newPassword}
                onBlur={formik.handleBlur}
              />
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div className="error-message">{formik.errors.newPassword}</div>
              ) : null}
            </div>

            <div className="text-secondary fw-bold form-group ">
              <label
                htmlFor="confirmPassword"
                className="d-flex justify-content-start"
              >
                Confirm Password
              </label>
              <input
                name="newPassword2"
                placeholder="New password"
                id="newPassword2"
                className={`${
                  formik.touched.newPassword2 &&
                  formik.errors.newPassword2 &&
                  "is-invalid"
                } form-control`}
                onChange={formik.handleChange}
                value={formik.values.newPassword2}
                onBlur={formik.handleBlur}
              />
              {formik.touched.newPassword2 && formik.errors.newPassword2 ? (
                <div className="error-message">
                  {formik.errors.newPassword2}
                </div>
              ) : null}
            </div>

            <button
              type="submit"
              className="btn btn-primary mx-2"
              onClick={(e) => SendData(e)}
              disabled={loading}
            >
              <span>Change Password</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordPage;
