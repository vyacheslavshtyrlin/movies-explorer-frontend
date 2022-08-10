import { Link } from 'react-router-dom';
import './Header.css';
import NavTab from '../NavTab/NavTab.jsx';
import logo from '../../images/logo.svg';

function Header({authorized, onClickMenu, menuOpen }) {
  return (
    <header className='header' >
      <div className="header__container">
        <Link to="/" className="header__link">
          <img src={logo} alt="Логотип" />
        </Link>
        <NavTab authorized={authorized} onClickMenu={onClickMenu} menuOpen={menuOpen} />
      </div>
    </header>
  );
}

export default Header;
