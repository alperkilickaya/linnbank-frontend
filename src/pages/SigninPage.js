import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ApiService from "../utils/api-service";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Store } from "../store";

const schema = yup.object().shape({
  ssn: yup
    .string()
    .matches(
      /^(?!219-09-9999|078-05-1120)(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/,
      "*Please enter a valid SSN"
    )
    .max(11)
    .required(),
  password: yup.string().required("*Password is required"),
});

const SignInPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(0);
  const [message, setMessage] = useState("");
  const history = useHistory();
  const context = useContext(Store);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleLogin = (data) => {
    console.log("signin", data);
    setLoading(true);
    ApiService.post("auth/login", data)
      .then((res) => {
        if (res.status === 200) {
          // const { jwt } = res.data;
          localStorage.setItem("token", JSON.stringify(res.data.jwt));
          // localStorage.setItem("user", JSON.stringify(res.data));
          setLoading(false);
          context.setCurrentUser(res.data.user);
          toast.success("👽 Tebrikler basarili giris yaptiniz...", {
            position: "top-center",
          });
          history.push("/userinfo");
        }
      })
      .catch((err) => {
        setMessage(err?.response?.data?.message);
      });
    setLoading(false);
  };

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
            <span>Signin</span>
          </h1>
        </div>
      </div>

      <div className="container-fluid row d-flex justify-content-center  ">
        <div className=" container row d-flex justify-content-center  ">
          <form
            className="col-md-8"
            method="post"
            noValidate
            onSubmit={handleSubmit(handleLogin)}
          >
            <div className="text-secondary fw-bold form-group ">
              <label htmlFor="ssn" className="d-flex justify-content-start">
                SSN
              </label>
              <input
                name="ssn"
                type="text"
                className={`${errors.ssn && "is-invalid"} form-control`}
                placeholder="000-00-0000"
                {...ssnFormatted}
                onChange={(e) => handleOnChange(e)}
                onKeyDown={handleKeyDown}
                maxLength="11"
              />
              <div className="invalid-feedback">{errors.ssn?.message}</div>
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
                type="password"
                className={`${errors.password && "is-invalid"} form-control`}
                placeholder="Your password"
                {...register("password")}
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>

            <button type="submit" className="btn btn-round mx-2 px-3">
              <span>
                Signin &nbsp;
                {loading && <Spinner />}
              </span>
            </button>
          </form>

          {message && (
            <div className="col-8">
              <div className="alert alert-danger  my-3 text-center">
                {message}
              </div>
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
                  &nbsp;
                  <b>
                    <Link to="/reset-password"> password ? </Link>
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
