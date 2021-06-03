import React from "react";
import "./Header.css";

import HeaderEnd from "./HeaderEnd.jsx"
import MobileMenu from "./MobileMenu.jsx"

import HeaderImg from "../../assets/img/Logo-Text.png"

const Header = ({ mobileOpen }) => {
    return (
        <div className="header">
            <a href="/home">
                <img className="header-logo" alt="Crypto NewsFind" src={HeaderImg} />
            </a>
            {mobileOpen?<MobileMenu />:<HeaderEnd />}
        </div>
    );
}

export default Header