import React from "react";
import './Header.css'


function Header() {
    const headerList = ["Buy", "Rent", "Favorites", "Contact Us"];
    return (
        <>
            <div className="header">
                <img src="estate-agency-logo.svg" className="logo"></img>
                <div className="headerList">
                    {headerList.map((headerData) => (
                        <span key={headerData}> {headerData} </span>))
                    }
                </div>
            </div>
        </>
    )
}

export default Header;