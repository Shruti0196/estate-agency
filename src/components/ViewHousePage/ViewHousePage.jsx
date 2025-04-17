import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';
import './ViewHousePage.css'
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import Header from '../Header/Header'
// useParams
const ViewHousePage = () => {
    const { id } = useParams();
    // let data = {};
    const [data, setData] = useState({})
    const fetchHouseById = async (id) => {
        const token = localStorage.getItem('access_token');
        const res = await fetch(`${import.meta.env.VITE_API_URL}houses/${id}/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await res.json();
        setData(data)
        console.log("House data:", data);
    };
    useEffect(() => {
        fetchHouseById(id)
    }, [])
    return (
        <>
            <Header />
            <div className='house-details'>
                <div className='house-data-row1-container'>

                    <img className='image-detail-page' src={data.image} alt="{{ house.title }}"></img>

                    {/* </div> */}
                    <div className='house-data-container'>
                        <h2><b className='house-data'>{data.title}</b></h2>

                        <div className='house-data'>{data.description}</div>
                    </div>
                </div>
                <div className='house-data-row2-container'>
                    <div className='house-data'><LocationOnOutlinedIcon className='icons' />{data.location}</div>
                    <div className='house-data'><FullscreenOutlinedIcon className='icons' />{data.area}</div>
                    <div className='house-data'><CurrencyRupeeOutlinedIcon className='icons' />{data.price}</div>
                    <div className='house-data'><CallOutlinedIcon className='icons' />9984738902</div>
                    <div className='status-div-1'>{data.status}</div>
                </div>
            </div>
        </>
    )
}

export default ViewHousePage