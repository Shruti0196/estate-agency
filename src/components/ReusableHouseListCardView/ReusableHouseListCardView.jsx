import ReusableCard from "../ReusableCard/ReusableCard";
import './ReusableHouseListCardView.css'
// import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Fragment } from "react";
import { TextField, List, ListItem, Typography, Select, MenuItem, Button, Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react'
import Filter from '../../utils/classes/Filter'
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import { useEffect, useState } from 'react';

function ReusableHouseListCardView({ houseData }) {
    // const [houseData, setHouseData] = useState([])
    // const [filter, setFilter] = useState(new Filter())
    const navigate = useNavigate();


    const [localHouseData, setLocalHouseData] = useState(houseData || []);
    useEffect(() => {
        setLocalHouseData(houseData || []);
        const token = localStorage.getItem('access_token');
        const socket = new WebSocket(`ws://localhost:8000/ws/api/favorites/?token=${token}`);

        socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log('DATTTTTTTTAAAAAAAA', data)
            if (data.message === 'favorite_update') {
                console.log('innnn')
                const favoriteHouseIds = data.favorites; // list of house IDs the user has favorited

                setLocalHouseData(prev =>
                    prev.map(house => ({
                        ...house,
                        is_favorite: favoriteHouseIds.includes(house.id)
                    }))
                );
                // fetchHouseData()
                console.log('houseeeeee', localHouseData)

            }
        };

        socket.onopen = () => {
            console.log("WebSocket connected");
        };

        socket.onerror = (error) => {
            console.error("WebSocket error", error);
        };



        socket.onclose = () => {
            console.log('Favorites WebSocket disconnected');
        };

        return () => socket.close();
    }, [houseData]);
    // async function fetchHouseData(params) {
    //     try {
    //         const token = localStorage.getItem('access_token');
    //         console.log('Tokennnnnn', token)
    //         const params = new URLSearchParams(filter)
    //         const response = await fetch(`${import.meta.env.VITE_API_URL}houses/?${params}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`,
    //             }
    //         })

    //         if (response.status === 401) {
    //             // Optionally redirect to login:
    //             navigate('/');
    //         }

    //         if (!response.ok) {
    //             throw new Error('Not ok');
    //         }
    //         const result = await response.json();
    //         console.log('resutl', result)
    //         setHouseData(result);
    //     } catch (error) {
    //         console.error('Error: ', error)
    //     }
    // }

    // useEffect(() => {

    // }, [localHouseData]);


    const handleFavorite = async (houseId) => {
        const token = localStorage.getItem('access_token');
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}houses/${houseId}/favorite/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
        } catch (err) {
            console.error('Error favoriting house', err);
        }
    };

    const handleUnfavorite = async (houseId) => {
        const token = localStorage.getItem('access_token');
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}houses/${houseId}/unfavorite/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (res.ok) {
                // fetchHouseData(); // Refresh list to update is_favorite
                // const token = localStorage.getItem('access_token');
                // console.log('Tokennnnnn', token)
                // // const params = new URLSearchParams(filter)
                // const response = await fetch(`${import.meta.env.VITE_API_URL}houses/?status=buy`, {
                //     method: 'GET',
                //     headers: {
                //         'Content-Type': 'application/json',
                //         'Authorization': `Bearer ${token}`,
                //     }
                // })
                // cardData = await response.json();
                // setHouseData(cardData)
                // console.log('Card dataaaaaa', cardData)
            }
        } catch (err) {
            console.error('Error unfavoriting house', err);
        }
    };

    const handleIconClick = (id) => {
        // Redirect to a new route
        console.log(id)
        navigate(`house/${id}`);
    };

    return (
        <>

            <div className="house-list">
                {localHouseData.map((data) => (
                    <Fragment key={data.id}>
                        <ReusableCard cardData={data} key={data.id} className="card"
                            dynamicContent={
                                <>
                                    {data.is_favorite ? (
                                        <FavoriteIcon
                                            color="error"
                                            onClick={() => handleUnfavorite(data.id)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    ) : (
                                        <FavoriteBorderIcon
                                            onClick={() => handleFavorite(data.id)}
                                            style={{ cursor: 'pointer' }}
                                        />
                                    )}
                                    <KeyboardDoubleArrowRightOutlinedIcon onClick={() => handleIconClick(data.id)} className="see-more-icon" />
                                </>} />
                    </Fragment>
                ))}
            </div>
        </>
    )
}

export default ReusableHouseListCardView;