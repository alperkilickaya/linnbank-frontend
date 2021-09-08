import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ApiService from "../utils/api-service";
import { toast } from "react-toastify";
// import { toast } from "react-toastify";

const schema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("*Current password is required")
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.+_]).{8,}$",
      "*Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!"
    ),
  newPassword: yup
    .string()
    .required("*New password is required")
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.+_]).{8,}$",
      "*Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("*Confirm Password is required"),
});

const ChangePasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleChangePassword = (data) => {
    console.log("data", data);
    ApiService.put("/user/changePassword", data)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message, {
            position: "top-center",
          });
        } else {
          toast.warning(res.data.message, {
            position: "top-center",
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(err.response?.data?.message, {
          position: "top-center",
        });
      });
  };

  return (
    <>
      <div className="justify-content-center row">
        <div className="col-md-8">
          <h1 id="register-title">
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

          <form
            className="col-md-8"
            method="post"
            onSubmit={handleSubmit(handleChangePassword)}
            noValidate
          >
            <div className="text-secondary fw-bold form-group ">
              <label
                for="currentPassword"
                className="d-flex justify-content-start"
              >
                Current Password *
              </label>
              <input
                name="currentPassword"
                // type="password"
                type="text"
                className={`${
                  errors.currentPassword && "is-invalid"
                } form-control`}
                {...register("currentPassword")}
              />
              <div className="invalid-feedback">
                {errors.currentPassword?.message}
              </div>
            </div>

            <div className="text-secondary fw-bold form-group ">
              <label for="newPassword" className="d-flex justify-content-start">
                New Password *
              </label>
              <input
                name="newPassword"
                // type="password"
                className={`${errors.newPassword && "is-invalid"} form-control`}
                {...register("newPassword")}
              />
              <div className="invalid-feedback">
                {errors.newPassword?.message}
              </div>
            </div>

            <div className="text-secondary fw-bold form-group ">
              <label
                for="confirmPassword"
                className="d-flex justify-content-start"
              >
                Confirm Password
              </label>
              <input
                name="confirmPassword"
                // type="password"
                type="text"
                className={`${
                  errors.confirmPassword && "is-invalid"
                } form-control`}
                {...register("confirmPassword")}
              />
              <div className="invalid-feedback">
                {errors.confirmPassword?.message}
              </div>
            </div>

            <button type="submit" className="btn btn-primary mx-2">
              <span>Change Password</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordPage;
