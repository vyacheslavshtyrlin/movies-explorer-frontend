import './NavTab.css';
import { Link, NavLink } from 'react-router-dom';
import Burger from '../Burger/Burger.jsx';

export default function Navigation({ authorized, onClickMenu, menuOpen }) {

  const activeLink = `navigation__link_active_${menuOpen ? 'mobile' : 'desktop'}`
  const itemDesktop = `navigation__item ${menuOpen ? '' : 'navigation__item_type_account'} `

  return (
    <>
      {!authorized ? (
        <nav className="navigation">
          <ul className="navigation__list">
            <li>
              <Link to="/signup" className="navigation__link navigation__link_landing">
                Регистрация
              </Link>
            </li>
            <li>
              <Link to="/signin" className="navigation__link navigation__link_landing navigation__link_signin">
                Войти
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className={`navigation navigation_state_${menuOpen ? 'opened' : 'closed'}`}>
          <Burger isOpen={menuOpen} onClickMenu={onClickMenu} />
          <ul className={`navigation__list navigation__list_logged navigation__list_state_${menuOpen ? 'opened' : 'closed'}`}>
            {menuOpen && (
              <li className="navigation__item">
                <NavLink exact to="/" className="navigation__link" activeClassName={activeLink}>
                  Главная
                </NavLink>
              </li>
            )}
            <li className="navigation__item">
              <NavLink to="/movies" className="navigation__link" activeClassName={activeLink}>
                Фильмы
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink to="/saved-movies" className="navigation__link" activeClassName={activeLink}>
                Сохранённые фильмы
              </NavLink>
            </li>
            <li className={itemDesktop}>
              <NavLink to="/profile" className="navigation__link navigation__link_type_account" activeClassName={activeLink}>
                Аккаунт
              </NavLink>
            </li>
          </ul>

        </nav>
      )}
    </>
  );
}
