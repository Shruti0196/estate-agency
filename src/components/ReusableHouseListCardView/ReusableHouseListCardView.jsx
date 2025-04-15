import ReusableCard from "../ReusableCard/ReusableCard";
import './ReusableHouseListCardView.css'
// import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Fragment } from "react";
import { TextField, List, ListItem, Typography, Select, MenuItem, Button, Grid, Paper } from '@mui/material';
import { useEffect, useState } from 'react'
import Filter from '../../utils/classes/Filter'
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';

function ReusableHouseListCardView({ pageType }) {
    const [houseData, setHouseData] = useState([])
    const [filter, setFilter] = useState(new Filter())
    const navigate = useNavigate();
    async function fetchHouseData(params) {
        try {
            const token = localStorage.getItem('access_token');
            const params = new URLSearchParams(filter)
            console.log('pageee', pageType)
            const response = await fetch(`${import.meta.env.VITE_API_URL}${pageType}/?${params}`, {
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
        let url = `ws://localhost:8000/ws/api/${pageType}/?${params}`
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
            <div className="filter-container">
                <Select
                    label="Search Houses"
                    variant="outlined"
                    fullWidth
                    onChange={setFilterData}
                    key="filter"
                    name="status"
                    className="flex-item select-field"
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="buy">Buy</MenuItem>
                    <MenuItem value="rent">Rent</MenuItem>
                </Select>
                <TextField
                    onChange={setFilterData}
                    name="price"
                    className="flex-item text-field"
                />
            </div>
            <div className="house-list">
                {houseData.map((data) => (
                    <Fragment key={data.id}>
                        <ReusableCard cardData={data} key={data.id} className="card"
                            dynamicContent={<KeyboardDoubleArrowRightOutlinedIcon onClick={() => handleIconClick(data.id)} className="see-more-icon" />} />
                    </Fragment>
                ))}
            </div>
        </>
    )
}

export default ReusableHouseListCardView;