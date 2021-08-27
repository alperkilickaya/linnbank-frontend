import React, { useState, useContext } from "react";
import { Store } from "../store";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import ApiService from "../utils/api-service";

const SignInPage = (props) => {
  const [ssn, setSsn] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const context = useContext(Store);
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setMessage("");
    ApiService.post("users/login", { ssn, password })
      .then((resp) => {
        const { id_token } = resp.data;
        localStorage.setItem("token", id_token);

        ApiService.get("users/auth")
          .then((resp) => {
            setLoading(false);
            context.setUser(resp.data);
            console.log(resp);
            history.push('/');
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
            setMessage(error.response.data.message);
          });
      })
      .catch((error) => {
        setLoading(false);
        setMessage(error.response.data.message);
      });
  };

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
        <div className="container row d-flex justify-content-center  ">
          <form
            className="col-md-8"
            onSubmit={handleSubmit(handleLogin)}
            method="post"
            noValidate
          >
            <div className="text-secondary fw-bold form-group ">
              <label htmlFor="ssn" className="d-flex justify-content-start">
                SSN
              </label>
              <input
                {...register("ssn", {
                  required: "Enter a valid ssn",
                  pattern: {
                    value: /[0-9]{3}-[0-9]{2}-[0-9]{4}$/i,
                    message: "Enter a valid ssn",
                  },
                })}
                className={`${errors.ssn && "is-invalid"} form-control`}
                type="text"
                name="ssn"
                value={ssn}
                onChange={(e) => setSsn(e.target.value)}
              />
              <div className="invalid-feedback">{errors?.ssn?.message}</div>
            </div>
            <div className="form-group">
              <label
                htmlFor="password"
                className="d-flex justify-content-start fw-bold"
              >
                Password
              </label>
              <input
                {...register("password", {
                  required: "Enter password",
                })}
                className={`${errors.password && "is-invalid"} form-control`}
                type="text"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="invalid-feedback">
                {errors?.password?.message}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-round mx-2 px-3"
              disabled={loading}
            >
              <span>Signin</span>
            </button>
          </form>

          {message && (
            <div className="col-8">
              <div className="alert alert-danger  my-3">{message}</div>
            </div>
          )}

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
