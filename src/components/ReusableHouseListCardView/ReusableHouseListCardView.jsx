import ReusableCard from "../ReusableCard/ReusableCard";
import './ReusableHouseListCardView.css'
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { TextField, List, ListItem, Typography, Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react'
import Filter from '../../utils/classes/Filter'

function ReusableHouseListCardView({ pageType }) {
    const [houseData, setHouseData] = useState([])
    const [filter, setFilter] = useState(new Filter())
    useEffect(() => {
        async function fetchHouseData(params) {
            console.log(import.meta.env.VITE_API_URL)
            try {
                const params = new URLSearchParams(filter)
                const response = await fetch(`${import.meta.env.VITE_API_URL}${pageType}/?${params}`)
                if (!response.ok) {
                    throw new Error('Not ok');
                }
                const result = await response.json();
                setHouseData(result);
            } catch (error) {
                console.error('Error: ', error)
            }
        }
        fetchHouseData();
    }, [filter])

    function setFilterData(event) {
        setFilter({ ...filter, [event.target.name]: event.target.value })
        console.log('Filter', filter)
    }

    return (
        <>
            <Select
                label="Search Houses"
                variant="outlined"
                fullWidth
                onChange={setFilterData}
                key="filter"
                name="status"
            >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="buy">Buy</MenuItem>
                <MenuItem value="rent">Rent</MenuItem>
            </Select>
            <TextField
                onChange={setFilterData}
                name="price"
            />
            <div className="house-list">
                {houseData.map((data) => (
                    <Fragment key={data.id}>
                        <ReusableCard cardData={data} key={data.id} className="card" />
                        <Link to={`house/${data.id}`} key={`house/${data.id}`}>See More</Link>
                    </Fragment>
                ))}
            </div>
        </>
    )
}

export default ReusableHouseListCardView;