import React from "react";
import logo from "@assets/images/logo.svg";
import { Link, useNavigation, useRouteError, useSubmit } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { t } = useTranslation();
  const submitForm = useSubmit();
  const navigation =useNavigation();
  const isSubmitting = navigation.state !=="idle";
  const routeErrors = useRouteError();
  const onSubmit = (data) => {
    submitForm(data, { method: "POST" });
  };
  return (
    <>
      <div className="text-center mt-4">
        <img src={logo} style={{ height: "100px" }} />
        <h1 className="h2"> {t("login.title")}</h1>
        <p className="lead">{t("login.introMessage")}</p>
        <p className="lead">
          {t("login.areNotRegistered")}
          <Link to="/register" className="me-2">
            {t("login.register")}
          </Link>
        </p>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="m-sm-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">{t("login.mobile")}</label>
                <input
                  {...register("mobile", {
                    required: t("login.validation.mobileRequired"),
                    maxLength: 11,
                    minLength: 11,
                  })}
                  className={`form-control form-control-lg ${
                    errors.mobile && "is-invalid"
                  }`}
                />
                {errors.mobile && errors.mobile.type === "required" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {errors.mobile?.message}
                  </p>
                )}
                {errors.mobile &&
                  (errors.mobile.type === "maxLength" ||
                    (errors.mobile.type === "minLength" && (
                      <p className="text-danger small fw-bolder mt-1">
                        {t("login.validation.mobileLength")}
                      </p>
                    )))}
              </div>
              <div className="mb-3">
                <label className="form-label"> {t("login.password")}</label>
                <input
                  {...register("password", {
                    required: t("login.validation.passwordRequired"),
                  })}
                  className={`form-control form-control-lg mb-2 ${
                    errors.password && "is-invalid"
                  }`}
                  type="password"
                />
                {errors.password && errors.password.type === "required" && (
                  <p className="text-danger small fw-bolder mt-1">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className="text-center mt-3">
                <button type="submit" disabled={isSubmitting} className="btn btn-lg btn-primary">
                  {isSubmitting ? t("login.signingin") :t("login.signin") }
                </button>
              </div>
              {routeErrors && (
                <div className="alert alert-danger text-danger p-2 mt-3">
                  {routeErrors.response?.data.map((error) => (
                    <p className="mb-0">{t(`login.validation.${error.code}`)}</p>
                  ))}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
