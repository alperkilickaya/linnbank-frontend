import React, { useContext, useState } from "react";
import { Store } from "../store";
import { capitalize } from "../utils/TextUtils";
import { useHistory } from "react-router";
import * as yup from "yup";
import { Formik, Field, Form } from "formik";
import { ErrorMessage } from "formik";
import ApiService from "../utils/api-service";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  ssn: yup
    .string()
    .matches(
      /^(?!219-09-9999|078-05-1120)(?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4}$/,
      "Please enter a valid SSN"
    )
    .max(11)
    .required("*SSN required"),
  firstName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter a valid firstname")
    .min(2)
    .max(40)
    .nullable(false)
    .required("*Firstname required"),
  lastName: yup
    .string()
    .matches(/^[A-Za-z ]*$/, "Please enter a valid lastname")
    .min(2)
    .max(40)
    .required("*Lastname required"),
  address: yup
    .string()
    .min(2, "Address must be at least 2 characters")
    .required("*Address required"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("*Email required"),
  mobilePhoneNumber: yup
    .string()
    .matches(
      "^[0-9]{3}-[0-9]{3}-[0-9]{4}$",
      "*Mobile phone format must be '000-000-0000'."
    )
    .required("*Phone number required"),
});

const UserInfoForm = (props) => {
  const values = props.initialValues;
  const handleOnChange = (e) => {
    const value = props.values.ssn;
    if (e.keyCode !== 8 && (value.length === 3 || value.length === 6)) {
      props.setFieldValue("ssn", `${value}-`);
    }
  };

  const handleOnChangePhone = (e) => {
    const value = props.values.mobilePhoneNumber;
    if (e.keyCode !== 8 && (value.length === 3 || value.length === 7)) {
      props.setFieldValue("mobilePhoneNumber", `${value}-`);
    }
  };

  return (
    <React.Fragment>
      <div className="justify-content-center row">
        <div className="col-md-8">
          <h1 id="register-title">
            <span>
              User settings for [ {capitalize(values.firstName, "User")} ]
            </span>
          </h1>
        </div>
      </div>
      <div className="justify-content-center row">
        <div className="col-md-8">
          <Form
            noValidate
            id="register-form"
            method="post"
            className="av-invalid"
          >
            <div className="form-group">
              <label htmlFor="ssn">SSN</label>
              <Field
                name="ssn"
                placeholder="000-00-0000"
                id="ssn"
                type="text"
                className={`${props.errors.ssn && "is-invalid"} form-control`}
                maxLength="11"
                onKeyDown={handleOnChange}
              />
              <div className="invalid-feedback">
                <ErrorMessage name="ssn" />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="firstname"
                className="d-flex justify-content-start fw-bold"
              >
                First Name
              </label>
              <Field
                name="firstName"
                id="firstName"
                type="text"
                className={`${
                  props.errors.firstName && "is-invalid"
                } form-control`}
                onKeyDown={handleOnChange}
                onBlur={props.handleBlur}
              />
              <div className="invalid-feedback">
                <ErrorMessage name="firstName" />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="lastname"
                className="d-flex justify-content-start fw-bold"
              >
                Last Name
              </label>
              <Field
                name="lastName"
                id="lastName"
                type="text"
                className={`${
                  props.errors.lastName && "is-invalid"
                } form-control`}
                onKeyDown={handleOnChange}
                onBlur={props.handleBlur}
              />
              <div className="invalid-feedback">
                <ErrorMessage name="lastName" />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="address"
                className="d-flex justify-content-start fw-bold"
              >
                Address
              </label>
              <Field
                name="address"
                id="address"
                type="text"
                className={`${
                  props.errors.address && "is-invalid"
                } form-control`}
                onKeyDown={handleOnChange}
                onBlur={props.handleBlur}
              />
              <div className="invalid-feedback">
                <ErrorMessage name="address" />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="mobilePhoneNumber"
                className="d-flex justify-content-start fw-bold"
              >
                Mobile Phone Number
              </label>
              <Field
                name="mobilePhoneNumber"
                placeholder="000-000-0000"
                id="mobilePhoneNumber"
                type="text"
                className={`${
                  props.errors.mobilePhoneNumber && "is-invalid"
                } form-control`}
                onKeyDown={handleOnChangePhone}
                onBlur={props.handleBlur}
                maxLength="12"
              />
              <div className="invalid-feedback">
                <ErrorMessage name="mobilePhoneNumber" />
              </div>
            </div>

            <div className="form-group">
              <label
                htmlFor="email"
                className="d-flex justify-content-start fw-bold"
              >
                Email
              </label>
              <Field
                name="email"
                placeholder="Your email"
                id="email"
                type="email"
                className={`${props.errors.email && "is-invalid"} form-control`}
                onKeyDown={handleOnChange}
                onBlur={props.handleBlur}
              />
              <div className="invalid-feedback">
                <ErrorMessage name="email" />
              </div>
            </div>

            <button
              type="submit"
              id="register-submit"
              className="btn btn-round"
              disabled={props.isSubmitting}
            >
              <span>Update</span>
            </button>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
};

const UserInfoPage = () => {
  const context = useContext(Store);
  const currentUser = context.currentUser;
  const [user, setsUser] = useState(currentUser);
  const history = useHistory();

  return (
    <React.Fragment>
      {(!currentUser || !currentUser.role) && history.push("/")}
      {currentUser && (
        <Formik
          enableReinitialize={true}
          initialValues={{
            ssn: user.ssn,
            firstName: user.firstname,
            lastName: user.lastname,
            address: user.address,
            email: user.email,
            mobilePhoneNumber: user.mobilePhoneNumber,
          }}
          validationSchema={schema}
          onSubmit={(values, actions) => {
            console.log(values);
            actions.setSubmitting(true);
            ApiService.post("user/userInfoUpdate", values)
              .then((res) => {
                console.log("res-success", res);
                if (res.status === 200) {
                  actions.setSubmitting(false);
                  toast.success(" 🚀 Userinfo updated successfully !", {
                    position: "top-center",
                  });
                  localStorage.setItem(
                    "token",
                    JSON.stringify(
                      res.config.headers.Authorization.substring(7)
                    )
                  );
                  context.setCurrentUser(res.data.user);
                }
              })
              .catch((err) => {
                console.log(err?.response?.data.message);
                console.log(err.response);
                actions.setSubmitting(false);
                toast.error(`${err?.response?.data.message}`, {
                  position: "top-center",
                });
              });
          }}
          component={UserInfoForm}
        ></Formik>
      )}
    </React.Fragment>
  );
};

export default UserInfoPage;
