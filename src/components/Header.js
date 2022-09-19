import React from "react";
import headerLlogo from '../images/header-logo.svg';

function Header() {
    return (
        <header className="header">
            <img src={headerLlogo} className="header__logo" alt="Логотип" />
        </header>
    )
}

export default Header;