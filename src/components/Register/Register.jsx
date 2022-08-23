import "./Register.css";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useState, useEffect } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation";

export default function Register({ onRegister }) {
  const { values, handleChangeState, resetForm, errors, isValid } =
    useFormWithValidation();

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  return (
    <main className="register">
      <form
        className="register__form"
        name="register"
        noValidate
        onSubmit={handleSubmit}
      >
        <Link to="/" className="register__link">
          <img src={logo} alt="Логотип" className="register__logo" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <div className="register__labels-container">
          <label className="register__label">
            <span className="register__label-text">Имя</span>
            <input
              onChange={handleChangeState}
              name="name"
              className="register__input"
              type="text"
              required
              minLength="2"
              maxLength="30"
              value={values.name || ''}
            />
            <span className="register__error">{errors.name || ""}</span>
          </label>
          <label className="register__label">
            <span className="register__label-text">E-mail</span>
            <input
              onChange={handleChangeState}
              name="email"
              className="register__input"
              type="email"
              value={values.email  || ''}
              required
            />
            <span className="register__error">{errors.email || ""}</span>
          </label>
          <label className="register__label">
            <span className="register__label-text">Пароль</span>
            <input
              onChange={handleChangeState}
              name="password"
              className="register__input"
              type="password"
              value={values.password || ''}
              required
            />
            <span className="register__error">{errors.password || ""}</span>
          </label>
        </div>
        <button
          type="submit"
          className={`login__button ${!isValid && "login__button_disabled"}`}
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
        <span className="register__support">
          Уже зарегистрированы?&nbsp;
          <Link to="signin" className="register__link">
            Войти
          </Link>
        </span>
      </form>
    </main>
  );
}
