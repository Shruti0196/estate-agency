import { Card, CardActions, CardContent } from '@mui/material';
import './ReusableCard.css'
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';

function ReusableCard({ cardData = {}, dynamicContent = <></> }) {
    return (
        <Card key={cardData.id} className="card">
            <CardContent>
                {/* <div>{cardData.image}</div>
                 */}
                {/* <div className='image'> */}
                <img className='image' src={`http://localhost:8000${cardData.image}`} alt="{{ house.title }}"></img>

                {/* </div> */}
                <div>{cardData.id}</div>
                <div><CurrencyRupeeOutlinedIcon className='icons' />{cardData.price}</div>
            </CardContent>
            <CardActions className='card-actions'>
                <div className='status-div'>{cardData.status}</div>
                {dynamicContent}
            </CardActions>

        </Card>
    )
}

export default ReusableCard;