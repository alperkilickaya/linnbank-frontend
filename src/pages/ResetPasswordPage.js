import React, { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ApiService from "../utils/api-service";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("*Email required"),
});

const ResetPasswordPage = () => {
  const [sentSuccess, setSentSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleResetEmail = (data) => {
    ApiService.post("/auth/forgot_password", null, {
      params: { email: data.email },
    })
      .then((res) => {
        console.log("res", res);
        if (res.status === 200) {
          toast.success(res.data.message, {
            position: "top-center",
          });
          setSentSuccess(true);
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
    <React.Fragment>
      {sentSuccess ? (
        <div className="row d-flex justify-content-center  ">
          <div className=" container row d-flex justify-content-center  ">
            <div className="col-md-8">
              <div
                className="alert alert-warning fade show d-flex justify-content-center my-3"
                role="alert"
              >
                <p>Please check your mail. We sent a password reset link . </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <React.Fragment>
          <div className="justify-content-center row">
            <div className="col-md-8">
              <h1 id="register-title">
                <span>Forgot your password</span>
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
                  <p>Enter your email to reset your password.</p>
                </div>
              </div>

              <form
                className="col-md-8"
                method="post"
                onSubmit={handleSubmit(handleResetEmail)}
                noValidate
              >
                <div className="text-secondary fw-bold form-group ">
                  <label
                    htmlFor="email"
                    className="d-flex justify-content-start fw-bold"
                  >
                    *Email
                  </label>
                  <input
                    name="email"
                    placeholder="Your email"
                    id="email"
                    type="email"
                    className={`${errors.email && "is-invalid"} form-control`}
                    {...register("email")}
                  />
                  <div className="invalid-feedback">
                    {errors.email?.message}
                  </div>
                </div>
                <button type="submit" className="btn btn-primary mx-2">
                  <span>Send </span>
                </button>
              </form>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ResetPasswordPage;
