import React from 'react'
import Banner from '../Banner/Banner'
import Services from '../ServicesCection/ServicesCection'
import ClientSlider from '../ClientSlider/ClientSlider'
import Benefits from '../Benefits/Benefits'
import BeMarchent from '../BeMarchent/BeMarchent '

const Home = () => {
    return (
        <div>
            <Banner />
            <Services />
            <ClientSlider />
            <Benefits></Benefits>
            <BeMarchent></BeMarchent>
        </div>
    )
}

export default Home