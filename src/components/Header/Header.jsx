import React from "react";
import './Header.css'
import { useNavigate } from 'react-router-dom';

function Header() {
    const headerList = ["Favorites", "Log Out"];
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        // Optionally remove other auth info too
        // Redirect to login or home page
        navigate('/');
    };

    const navigateToFavoritesPage = () => {
        navigate('/favorites')
    }
    return (
        <>
            <div className="header">
                <img src="estate-agency-logo.svg" className="logo"></img>
                <div className="headerList">
                    {/* {headerList.map((headerData) => ( */}
                    <button key="navigateToFavoritesPage" onClick={navigateToFavoritesPage}> Favorites </button>
                    <button key="logout" onClick={logout}> Logout </button>

                    {/* } */}
                </div>
            </div>
        </>
    )
}

export default Header;