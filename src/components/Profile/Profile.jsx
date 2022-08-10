import './Profile.css';

export default function Profile() {

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <main className="profile">
      <form className="profile__form" name="profile" noValidate onSubmit={handleSubmit}>
        <h1 className="profile__title">Привет, Вячеслав!</h1>
        <div className="profile__labels-container">
          <label className="profile__label">
            <span className="profile__label-text">Имя</span>
            <input
              name="name"
              className='profile__input'
              type="text"
              required
              minLength="2"
              maxLength="30"
            />
            <span className="profile__error-name"></span>
          </label>
          <label className="profile__label">
            <span className="profile__label-text">E-mail</span>
            <input
              name="email"
              className='profile__input'
              type="email"
              required
            />
            <span className="profile__error"></span>
          </label>
        </div>
        <div className="profile__button-container">
          <button
            type="submit"
            className='profile__button-edit'
          >
            Редактировать
          </button>
          <button type="submit" className="profile__button-exit">
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  )
}
