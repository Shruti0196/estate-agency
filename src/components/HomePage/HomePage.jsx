import React, { useState } from 'react'
import ReusableHouseListCardView from '../ReusableHouseListCardView/ReusableHouseListCardView'
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { TextField, List, ListItem, Typography, Select, MenuItem, Button, Grid, Paper } from '@mui/material';
import { useEffect } from 'react'
import Filter from '../../utils/classes/Filter'
import './HomePage.css'

import { lazy, Suspense } from 'react';

const ReusableHouse = lazy(() => import('../ReusableHouseListCardView/ReusableHouseListCardView'));

function HomePage() {
    const [houseData, setHouseData] = useState([])
    const [filter, setFilter] = useState(new Filter())
    const navigate = useNavigate();
    async function fetchHouseData(params) {
        try {
            const token = localStorage.getItem('access_token');
            console.log('Tokennnnnn', token)
            const params = new URLSearchParams(filter)
            const response = await fetch(`${import.meta.env.VITE_API_URL}houses/?${params}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })

            if (response.status === 401) {
                // Optionally redirect to login:
                navigate('/');
            }

            if (!response.ok) {
                throw new Error('Not ok');
            }
            const result = await response.json();
            console.log('resutl', result)
            setHouseData(result);
        } catch (error) {
            console.error('Error: ', error)
        }
    }
    useEffect(() => {

        fetchHouseData();
        const params = new URLSearchParams(filter)
        let url = `ws://localhost:8000/ws/api/houses/?${params}`
        const socket = new WebSocket(url)
        socket.onmessage = function (e) {
            let data = JSON.parse(e.data)
            if (data.message === 'update') {
                fetchHouseData();
            }
        }

        socket.onclose = () => {
            console.log("WebSocket disconnected");
        };

        return () => socket.close();
    }, [filter])

    function setFilterData(event) {
        setFilter({ ...filter, [event.target.name]: event.target.value })
        console.log('Filter', filter)
    }

    const handleIconClick = (id) => {
        // Redirect to a new route
        navigate(`house/${id}`);
    };

    return (
        <>
            <Header />
            <div className="filter-container">
                <Select
                    variant="outlined"
                    fullWidth
                    onChange={setFilterData}
                    displayEmpty
                    key="filter"
                    name="status"
                    className="flex-item select-field"
                    defaultValue=""  // <-- important for controlled component
                >
                    <MenuItem value="" disabled>
                        <em>Select Status</em>
                    </MenuItem>
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="buy">Buy</MenuItem>
                    <MenuItem value="rent">Rent</MenuItem>
                </Select>
                <TextField
                    onChange={setFilterData}
                    name="price"
                    label="Filter by Price"
                    className="flex-item text-field"
                    placeholder="Enter max price"
                />
            </div>
            {/* <Suspense fallback={<div>Loading...</div>}> */}


            {/* </Suspense> */}
            <ReusableHouse houseData={houseData}></ReusableHouse>
        </>
    )
}

export default HomePage;