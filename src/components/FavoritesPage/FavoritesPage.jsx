import React, { useEffect, useState } from 'react';
import ReusableHouseListCardView from '../ReusableHouseListCardView/ReusableHouseListCardView';

function FavoritesPage() {
    const [houseData, setHouseData] = useState([]);

    const fetchFavorites = async () => {
        const token = localStorage.getItem('access_token');
        const res = await fetch(`${import.meta.env.VITE_API_URL}houses/favorites/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const data = await res.json();
        setHouseData(data);
    };

    useEffect(() => {
        fetchFavorites(); // Initial fetch

        const token = localStorage.getItem('access_token');
        const socket = new WebSocket(`ws://localhost:8000/ws/api/favorites/?token=${token}`);

        socket.onopen = () => {
            console.log("WebSocket connected");
        };

        socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            console.log("WebSocket message received:", data);

            if (data.message === 'favorite_update') {
                fetchFavorites(); // Refresh favorites list
            }
        };

        socket.onerror = (error) => {
            console.error("WebSocket error", error);
        };

        socket.onclose = () => {
            console.log('Favorites WebSocket disconnected');
        };

        return () => socket.close(); // Cleanup on component unmount
    }, []);

    return (
        <ReusableHouseListCardView pageType="favorites" houseData={houseData} />
    );
}

export default FavoritesPage;
