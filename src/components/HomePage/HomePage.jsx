import React from 'react'
import ReusableHouseListCardView from '../ReusableHouseListCardView/ReusableHouseListCardView'
import Header from '../Header/Header';

function HomePage() {
    return (
        <>
            <Header />
            <ReusableHouseListCardView pageType="houses"></ReusableHouseListCardView>
        </>
    )
}

export default HomePage;