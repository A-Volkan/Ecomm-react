import React from 'react'
import MainCarousel from './MainCarousel.jsx'
import ShopingList from './ShopingList.jsx'
import Subscribe from './Subscribe.jsx'

const Home = () => {
    return (
        <div className='home'>
            <MainCarousel />
            <ShopingList />
            <Subscribe />
        </div>
    )
}

export default Home;