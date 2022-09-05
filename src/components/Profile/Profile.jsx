import "./Profile.css";
import { useState, useContext, useEffect } from "react";
import { currentUserContext } from "../../context/CurrentUserContext";
import useFormWithValidation from "../../hooks/useFormWithValidation";

export default function Profile({ onEdit, onExit }) {
  const { user } = useContext(currentUserContext);
  console.log(user);
  const { values, handleChangeState, resetForm, errors, isValid } =
    useFormWithValidation();

  useEffect(() => {
    if (user) {
      resetForm(user, {}, true);
    }
  }, [user, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onEdit(values);
  }

  const isActive =
    !isValid || (user.name === values.name && user.email === values.email);
  console.log(isActive);

  return (
    <main className="profile">
      <form
        className="profile__form"
        name="profile"
        noValidate
        onSubmit={handleSubmit}
      >
        <h1 className="profile__title">Привет, {`${user.name}`}</h1>
        <div className="profile__labels-container">
          <label className="profile__label">
            <span className="profile__label-text">Имя</span>
            <input
              name="name"
              className="profile__input"
              type="text"
              required
              minLength="2"
              maxLength="30"
              onChange={handleChangeState}
              value={values.name || ""}
            />
            <span className="profile__error-name">{errors.name || ""}</span>
          </label>
          <label className="profile__label">
            <span className="profile__label-text">E-mail</span>
            <input
              name="email"
              className="profile__input"
              type="email"
              value={values.email || ""}
              onChange={handleChangeState}
              required
            />
            <span className="profile__error">{errors.email || ""}</span>
          </label>
        </div>
        <div className="profile__button-container">
          <button
            disabled={isActive ? true : false}
            type="submit"
            className={`profile__button-edit ${
              !isValid && "profile__button-edit_disabled"
            }`}
          >
            Редактировать
          </button>
          <button
            onClick={onExit}
            type="submit"
            className="profile__button-exit"
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  );
}
