import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../images/logo.svg';
import burgerOpen from '../images/burger.svg';
import burger from '../images/burger_open.svg';

const Header = ({ onSignOut, headerEmail, loggedIn }) => {
    const location = useLocation();
    const [isMobileHeaderOpen, setIsmobileHeaderOpen] = useState(false);

    return (
        <header className={`header ${loggedIn ? 'header_loggedIn' : ''}`}>

            <div className="header__logo-container header__logo-container_submenu-opened">
                <img
                    className="header__logo"
                    src={logo}
                    alt="логотип Место"
                />
                {loggedIn &&
                    <button
                        className={`header__open-submenu-button ${isMobileHeaderOpen ? 'header__open-submenu-button_is-opened' : ''}`}
                        onClick={
                            () => setIsmobileHeaderOpen((prevState => !prevState))}
                    >
                        <img src={isMobileHeaderOpen ? burgerOpen : burger}
                            height={isMobileHeaderOpen ? 18 : 20}
                            width={isMobileHeaderOpen ? 24 : 20}
                        />
                    </button>
                }

            </div>

            {loggedIn ?
                <div className={`header__submenu ${isMobileHeaderOpen ? 'header__submenu_open' : ''}`}>
                    <p className="header__email">{headerEmail}</p>
                    <button className="header__logout" onClick={onSignOut}>Выйти</button>
                </div>
                :
                (
                    <>

                        {location.pathname === '/sign-up' &&
                            <Link to="/sign-in" className="header__link">Войти</Link>}

                        {location.pathname === '/sign-in' &&
                            <Link to="/sign-up" className="header__link">Регистрация</Link>}

                    </>
                )
            }

        </header>
    );
};

export default Header;
