import React, {useState} from "react";
import "./styling/Header.css";
import searchImg from "./images/search.png"
import closeSearchImg from "./images/close.png"
import logo from "./images/Logo-Text.png"

const Header = ({changePage, displayPortrait}) => {

    const [headerSearchOpen, updateHeaderSearch] = useState(false);

    const openPortraitSearch = () => {
        if (headerSearchOpen) {
            // Close the search
            updateHeaderSearch(false);
            document.querySelector(".header-search").src = searchImg;
            document.querySelector(".header-about-portrait").style.display = "inline-block";
            document.querySelector(".TickerSearch").style.display = "none";
            document.querySelector(".TickerSearch").blur();
        } else {
            // Open the search
            updateHeaderSearch(true);
            document.querySelector(".header-search").src = closeSearchImg;
            document.querySelector(".header-about-portrait").style.display = "none";
            document.querySelector(".TickerSearch").style.display = "inline-block";
            document.querySelector(".TickerSearch").focus();
        }
    }

    if (displayPortrait === "true") {
        return (
            <div className="header-portrait">
                <a className="header-home" href="!#" onClick={()=>changePage("BodyHome")}> 
                    <img className="header-logo-portrait" alt="Crypto NewsFind" src={logo} />
                </a>
                <a href="!#" onClick={openPortraitSearch}>
                    <img alt="Search" src={searchImg} className="header-search" />
                </a> 
                <input
                    type="text"
                    className = "TickerSearch"
                    id="portrait-ticker-search"
                    placeholder="Search Ticker"
                    onKeyPress={event => {
                        if (event.key === "Enter") {
                            if (document.querySelector(".TickerSearch").value !== "") {
                                changePage("BodyTicker", document.querySelector(".TickerSearch").value.toUpperCase());
                            } else {}
                        }
                    }}
                />
                <a className="header-about-portrait" href="!#" onClick={()=>changePage("BodyAbout")}>
                    <div>
                        About
                    </div>
                </a>
            </div>
        );
    } else {
        return(
            <div className="header-landscape">
                    <a className="header-title" href="!#" onClick={()=>changePage("BodyHome")}> 
                        <img className="header-logo" alt="Crypto NewsFind" src={logo} />
                    </a>
                    <a className="header-about" href="!#" onClick={()=>changePage("BodyAbout")}>
                        <div>
                            About
                        </div>
                    </a>
                    <input
                        type="text"
                        className = "TickerSearch"
                        id="landscape-ticker-search"
                        placeholder="Search Ticker"
                        onKeyPress={event => {
                            if (event.key === "Enter") {
                                if (document.querySelector(".TickerSearch").value !== "") {
                                    changePage("BodyTicker", document.querySelector(".TickerSearch").value.toUpperCase());
                                } else {}
                            }
                }}
    />
            </div>
        );
    }

}

export default Header;