import './ReusableCard.css'
function ReusableCard({ cardData = {} }) {
    return (
        <div key={cardData.id} className="card">
            <div>{cardData.id}</div>
            <div>{cardData.price}</div>
        </div>
    )
}

export default ReusableCard;