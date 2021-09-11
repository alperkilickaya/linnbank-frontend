import React from "react";
import { useHistory } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState, useContext, useEffect } from "react";
import { Store } from ".././store/index2";
import ApiService from "../utils/api-service/index.js";

const UserInfoPage = (props) => {
  const context = useContext(Store);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [ssn, setSsn] = useState(context?.user?.ssn);
  const [firstName, setFirstName] = useState(context?.user?.firstName);
  const [lastName, setLastName] = useState(context?.user?.lastName);
  const [address, setAddress] = useState(context?.user?.address);
  const [mobilePhoneNumber, setMobilePhoneNumber] = useState(
    context.user.mobilePhoneNumber
  );
  const [email, setEmail] = useState(context.user.email);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    console.log(context.user);
    setSsn(context?.user?.ssn);
    setFirstName(context?.user?.firstName);
    setLastName(context?.user?.lastName);
    setAddress(context?.user?.address);
    setMobilePhoneNumber(context?.user?.mobilePhoneNumber);
    setEmail(context?.user?.email);
  }, []);

  const handleSsn = (e) => {
    const currentSsn = ssn;

    if (
      e.keyCode !== 8 &&
      (currentSsn.length === 3 || currentSsn.length === 6)
    ) {
      setSsn(`${currentSsn}-`);
    }
  };

  const handleMobileNumber = (e) => {
    const currentMobile = mobilePhoneNumber;
    if (
      e.keyCode !== 8 &&
      (currentMobile.length === 3 || currentMobile.length === 7)
    ) {
      setMobilePhoneNumber(`${currentMobile}-`);
    }
  };

  const sendData = () => {
    setLoading(true);
    ApiService.post("api/infoUpdate", {
      ssn,
      firstName,
      lastName,
      address,
      mobilePhoneNumber,
      email,
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          //localStorage.setItem("token", JSON.stringify(res.data.token));
          context.setUser(res.data.userDAO);
          //console.log('response',res);
          localStorage.clear();
          //console.log("-----");
          console.log(res.headers.authorization);
          localStorage.setItem(
            "token",
            JSON.stringify(
              res.headers.authorization
            )
          );
          //localStorage.setItem("token", JSON.stringify(res.config.headers.Authorization.substring(7)));

          toast.success("You Have Successfully updated data", {
            position: toast.POSITION.TOP_CENTER,
          });
      /*    
      ApiService.get("api/getUserInfo").then(
        (response) => {
          context.setUser(response.data)
          localStorage.setItem("token", JSON.stringify(response?.config?.headers?.Authorization?.substring(7)))
        }
      );
      */
          setTimeout(() => {
            //history.push("/");
          }, 3000);
          setLoading(false);
        }
      })
      .catch(() => {
        toast.error("User Update Denied", {
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
            <span>
              Hos Geldiniz Sayin {context?.user?.userDAO?.firstName}{" "}
              {context?.user?.userDAO?.lastName} ...
            </span>
          </h1>
        </div>
      </div>
      <div className="justify-content-center row">
        <div className="col-md-8">
          <form
            className="col-md-8"
            onSubmit={handleSubmit(sendData)}
            method="post"
            noValidate
          >
            <div className="form-group">
              <label htmlFor="ssn">SSN</label>
              <span></span>

              <input
                {...register("ssn", {
                  required: "enter a valid ssn",
                  pattern: {
                    value: /^[0-9-]*$/i,
                    message: "invalid format",
                  },
                })}
                name="ssn"
                placeholder="000-00-0000"
                id="ssn"
                type="text"
                className={`${errors.ssn && "is-invalid"} form-control`}
                maxLength="11"
                value={ssn}
                onChange={(e) => {
                  setSsn(e.target.value);
                }}
                onKeyDown={handleSsn}
              />
              <div className="invalid-feedback">{errors?.ssn?.message}</div>
            </div>
            <div className="form-group">
              <label
                htmlFor="firstname"
                className="d-flex justify-content-start fw-bold"
              >
                First Name
              </label>

              <input
                {...register("firstName", {
                  required: "enter a valid ssn",
                  pattern: {
                    value: /^[A-Za-z ]+$/i,
                    message:
                      "invalid format, you can use only alphabetical character",
                  },
                })}
                name="firstName"
                placeholder="first name"
                id="firstName"
                type="text"
                className={`${errors.firstName && "is-invalid"} form-control`}
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />

              <div className="invalid-feedback">
                {errors?.firstName?.message}
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="lastname"
                className="d-flex justify-content-start fw-bold"
              >
                Last Name
              </label>
              <input
                {...register("lastName", {
                  required: "enter a valid ssn",
                  pattern: {
                    value: /^[A-Za-z ]+$/i,
                    message: "invalid format",
                  },
                })}
                name="lastName"
                id="lastName"
                type="text"
                className={`${errors.lastName && "is-invalid"} form-control`}
                value={lastName}
                placeholder="Last Name"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <div className="invalid-feedback">
                {errors?.lastName?.message}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                {...register("address", {
                  required: "enter a valid USA postal code",
                  pattern: {
                    value: /^([0-9]{5}|[A-Z][0-9][A-Z] ?[0-9][A-Z][0-9])$/i,
                    message: "invalid format",
                  },
                })}
                name="address"
                id="address"
                type="text"
                className={`${errors.address && "is-invalid"} form-control`}
                maxLength="5"
                value={address}
                placeholder="Address"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
              />
              <div className="invalid-feedback">{errors?.address?.message}</div>
            </div>
            <div className="form-group">
              <label
                htmlFor="mobilePhoneNumber"
                className="d-flex justify-content-start fw-bold"
              >
                Mobile Phone Number
              </label>
              <input
                {...register("mobilePhoneNumber", {
                  required: "enter a valid ssn",
                  pattern: {
                    value: /^[0-9-]*$/i,
                    message: "invalid format",
                  },
                })}
                name="mobilePhoneNumber"
                placeholder="000-000-0000"
                id="mobilePhoneNumber"
                type="text"
                className={`${
                  errors.mobilePhoneNumber && "is-invalid"
                } form-control`}
                maxLength="12"
                value={mobilePhoneNumber}
                onChange={(e) => {
                  setMobilePhoneNumber(e.target.value);
                }}
                onKeyDown={handleMobileNumber}
              />
              <div className="invalid-feedback">
                {errors?.mobilePhoneNumber?.message}
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="email"
                className="d-flex justify-content-start fw-bold"
              >
                Email
              </label>
              <input
                {...register("email", {
                  required: "enter a valid ssn",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/i,
                    message: "invalid format",
                  },
                })}
                name="email"
                placeholder="Your email"
                id="email"
                type="email"
                className={`${errors.email && "is-invalid"} form-control`}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <div className="invalid-feedback">{errors?.email?.message}</div>
            </div>

            <button
              type="submit"
              id="register-submit"
              className="btn btn-round"
              //hata mesajlari gozukmuyor
              //onClick={(e) => sendData(e)}
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
