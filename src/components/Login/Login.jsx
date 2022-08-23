import "./Login.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useState, useEffect } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation";

export default function Login({ onLogin }) {
  const { values, handleChangeState, resetForm, errors, isValid } =
    useFormWithValidation();

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }

  return (
    <main className="login">
      <form
        onSubmit={handleSubmit}
        className="login__form"
        name="login"
        noValidate
      >
        <Link to="/" className="login__link">
          <img src={logo} alt="Логотип" className="login__logo" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <div className="login__labels-container">
          <label className="login__label">
            <span className="login__label-text">E-mail</span>
            <input
              name="email"
              className="login__input"
              type="email"
              required
              onChange={handleChangeState}
              value={values.email || ""}
            />
            <span className="login__error">{errors.email || ""}</span>
          </label>
          <label className="login__label">
            <span className="login__label-text">Пароль</span>
            <input
              name="password"
              className="login__input"
              type="password"
              onChange={handleChangeState}
              value={values.password || ""}
              required
            />
            <span className="login__error">{errors.password || ""}</span>
          </label>
        </div>
        <button
          type="submit"
          className={`login__button ${!isValid && "login__button_disabled"}`}
          disabled={!isValid}
        >
          Войти
        </button>
        <span className="login__support">
          Ещё не зарегистрированы?&nbsp;
          <Link to="signup" className="login__link">
            Регистрация
          </Link>
        </span>
      </form>
    </main>
  );
}
