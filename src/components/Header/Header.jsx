import React, { useEffect, useState } from "react";
import './Header.css'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

function Header() {
    const headerList = ["Favorites", "Log Out"];
    const location = useLocation();
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem("access_token");
            const res = await fetch(`${import.meta.env.VITE_API_URL}user/info/`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();
            setUserData(data)
            console.log("Username:", data.username);
        };

        fetchUserInfo();
    }, []);

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

    const navigateToHomePage = () => {
        navigate('/homePage')
    }
    return (
        <>
            <div className="header">
                <img src="estate-agency-logo.svg" className="logo"></img>
                <div className="headerList">
                    {/* {headerList.map((headerData) => ( */}
                    {!((location.pathname) == '/homePage') && <span key="navigateToHomePage" onClick={navigateToHomePage} className="header-tab"> Home Page </span>}
                    {!((location.pathname) == '/favorites') && <span key="navigateToFavoritesPage" onClick={navigateToFavoritesPage} className="header-tab"> Favorites </span>}

                    {/* <span key="navigateToHomePage" onClick={navigateToHomePage} className="header-tab"> Home Page </span> :
                        <span key="navigateToFavoritesPage" onClick={navigateToFavoritesPage} className="header-tab"> Favorites </span>
                    } */}
                    <span key="logout" onClick={logout} className="header-tab"> Logout </span>
                    <div className="icon-container">
                        <AccountCircleOutlinedIcon className="icons" />
                        <div className="tooltip">Username: {userData.username}</div>
                    </div>
                    {/* } */}
                </div>
            </div>
        </>
    )
}

export default Header;