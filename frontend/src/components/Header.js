import React, {useState, useEffect} from 'react';
import logo from '../images/logo.svg';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export const Header = ({ isLoggedIn, email, onSignOut }) => {
  const [burgerClicked, setBurgerClicked] = useState(false);
  const location = useLocation();
  const currentUrl = location.pathname;
  const navigate = useNavigate();
  const showBurgerMenu = currentUrl !== '/sign-in' && currentUrl !== '/sign-up';

  function handleBurgerClick() {
    setBurgerClicked(!burgerClicked);
  }

  return (
    <header className={`header${burgerClicked  && isLoggedIn ? ' active-mobile' : ''}`}>
      <div className={`header-mobile${burgerClicked && isLoggedIn ? ' active' : '' }`}>
        <img alt="Место" src={logo} className="header__image" />
        {showBurgerMenu && (
          <div className={`header__burger${burgerClicked ? ' active' : ''}`} onClick={handleBurgerClick}>
            <span className="header__burger-line"></span>
            <span className="header__burger-line"></span>
            <span className="header__burger-line"></span>
          </div>
        )}
      </div>
      <div className={`header__texts${burgerClicked && isLoggedIn ? ' active-mobile' : !showBurgerMenu ? '' : ' disable-mobile'}`}>
        {isLoggedIn ? <p className="header__email">{email}</p> : ''}
        {
        currentUrl === '/sign-in' ?
        <Link to='/sign-up' className='header__link'>Регистрация</Link> :
        currentUrl === '/sign-up' ?
        <Link to='/sign-in' className='header__link'>Войти</Link> :
        <button onClick={onSignOut} className="header__button">
          Выйти
        </button>
        }
      </div>
    </header>
  );
};
