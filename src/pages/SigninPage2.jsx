import React from "react";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import ApiService from "../utils/api-service/index.js";
import { Store } from ".././store/index2";

const SignInPage = (props) => {
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

  const handleLogin = () => {
    setLoading(true);
    ApiService.post("auth/signin", { ssn, password })
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res.data.jwt));
        context.setUser(res.data.userDAO);
        toast.success("You Have Successfully Loged In", {
          position: toast.POSITION.TOP_CENTER,
        });

        setTimeout(() => {
          history.push("/userinfo");
        }, 2000);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Loged In Denied", {
          position: toast.POSITION.TOP_CENTER,
        });
        setLoading(false);
      });
  };
  const handleSsn = (e) => {
    const currentSsn = ssn;

    if (
      e.keyCode !== 8 &&
      (currentSsn.length === 3 || currentSsn.length === 6)
    ) {
      setSsn(`${currentSsn}-`);
    }
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
        <div className=" container row d-flex justify-content-center  ">
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
                  required: "enter a valid ssn",
                  pattern: {
                    value: /^[0-9-]*$/i,
                    message: "invalid format",
                  },
                })}
                name="ssn"
                type="text"
                placeholder="000-00-0000"
                className={`${errors.ssn && "is-invalid"} form-control`}
                onChange={(e) => {
                  setSsn(e.target.value);
                }}
                maxLength="11"
                value={ssn}
                onKeyDown={handleSsn}
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
              <div>
                <input
                  {...register("password", {
                    required: "enter a valid password",
                    pattern: {
                      value:
                        //.....format / $/i
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i,
                      message:
                        "Minimum eight, at least one uppercase letter, one lowercase letter, one number and one special character:",
                    },
                  })}
                  name="password"
                  placeholder="New password"
                  id="password"
                  type="text"
                  className={`${errors.password && "is-invalid"} form-control`}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                />
                <div className="invalid-feedback">
                  {errors?.password?.message}
                </div>
              </div>
            </div>

            <button
              type="submit"
              id="register-submit"
              className="btn btn-round"
              disabled={loading}
            >
              {<span className="spinner-border spinner-border-sm"></span>}
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
