import React, { useState } from "react";
import "./RegisterPage.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  ssn: yup
    .string()
    .matches(
      /^(?!219-09-9999|078-05-1120)(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/,
      "Please enter a valid SSN"
    )
    .max(11)
    .required(),
  firstName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .max(40)
    .nullable(false)
    .required(),
  lastName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .max(40)
    .required(),
  address: yup.string().min(2).required(),
  email: yup.string().email().required(),
  mobilePhoneNumber: yup.string().matches(new RegExp("[0-9]{7}")).required(),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",
      "*Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character!"
    ),
  secondPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    console.log(data);
  };
  const [key, setKey] = useState(0);
  const handleKeyDown = (e) => {
    setKey(e.keyCode);
  };

  let ssnFormatted = register("ssn");

  const handleOnChange = (e) => {
    let value = e.target.value;
    ssnFormatted.onChange(e);
    setValue("ssn", value);
    if (key !== 8 && (value.length === 3 || value.length === 6)) {
      setValue("ssn", value + "-");
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
          <form
            noValidate
            id="register-form"
            method="post"
            className="av-invalid"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-group">
              <label htmlFor="ssn">SSN</label>
              <input
                name="ssn"
                placeholder="000-00-0000"
                id="ssn"
                type="text"
                className="form-control"
                maxLength="11"
                // {...register("ssn")}
                {...ssnFormatted}
                onChange={(e) => handleOnChange(e)}
                onKeyDown={handleKeyDown}
              />
              <p>{errors.ssn?.message}</p>
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
                {...register("firstName")}
              />
              <p>{errors.firstName?.message}</p>
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
                {...register("lastName")}
              />
              <p>{errors.lastName?.message}</p>
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
                {...register("address")}
              />
              <p>{errors.address?.message}</p>
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
                {...register("mobilePhoneNumber")}
              />
              <p>{errors.mobilePhoneNumber?.message}</p>
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
                {...register("email")}
              />
              <p>{errors.email?.message}</p>
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
                {...register("password", {
                  required: "You must specify a password",
                  minLength: {
                    value: 7,
                    message: "Password must have at least 8 characters",
                  },
                })}
              />
              {errors.password && <p>{errors.password.message}</p>}
            </div>
            {/* <PasswordStrength password={watch("password")} /> */}
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
                htmlFor="secondPassword"
                className="d-flex justify-content-start fw-bold"
              >
                New password confirmation
              </label>
              <input
                name="secondPassword"
                placeholder="Confirm the new password"
                id="secondPassword"
                type="password"
                className="form-control"
                {...register("secondPassword", {
                  validate: (value) =>
                    value === watch("password") || "The passwords do not match",
                })}
              />
              {errors.secondPassword && <p>{errors.secondPassword.message}</p>}
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
