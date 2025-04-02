import ReusableCard from "../ReusableCard/ReusableCard";
import data from '../../utils/houses.json'
import './HouseListCardView.css'
function HouseListCardView() {
    return (
        <>
            <div className="house-list">
                {data.map((data) => (
                    <ReusableCard cardData={data} key={data.id} className="card" />
                ))}
            </div>
        </>

    )
}

export default HouseListCardView;