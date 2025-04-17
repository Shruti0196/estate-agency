import { Card, CardActions, CardContent } from '@mui/material';
import './ReusableCard.css'
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useEffect, useState } from 'react';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import FullscreenOutlinedIcon from '@mui/icons-material/FullscreenOutlined';

function ReusableCard({ cardData = {}, dynamicContent = <></> }) {


    return (
        <Card key={cardData.id} className="card">
            <CardContent>

                <img className='image' src={cardData.image} alt="{{ house.title }}"></img>

                {/* </div> */}
                <h2><b className='house-data'>{cardData.title}</b></h2>
                <div className='house-data'><LocationOnOutlinedIcon className='icons' />{cardData.location}</div>
                <div className='house-data'><FullscreenOutlinedIcon className='icons' />{cardData.area}</div>
                <div className='house-data'><CurrencyRupeeOutlinedIcon className='icons' />{cardData.price}</div>
            </CardContent>
            <CardActions className='card-actions'>
                <div className='status-div'>{cardData.status}</div>


                {dynamicContent}
            </CardActions>

        </Card>
    )
}

export default ReusableCard;