import ReusableCard from "../ReusableCard/ReusableCard";
import data from '../../utils/houses.json'
import './HouseListCardView.css'
import { Link } from "react-router-dom";
import { Fragment } from "react";

function HouseListCardView() {
    return (
        <div className="house-list">
            {data.map((data) => (
                <Fragment key={data.id}>
                    <ReusableCard cardData={data} key={data.id} className="card" />
                    <Link to={`house/${data.id}`} key={`house/${data.id}`}>See More</Link>
                </Fragment>
            ))}
        </div>
    )
}

export default HouseListCardView;