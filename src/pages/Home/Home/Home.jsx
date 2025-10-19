import React from 'react'
import Banner from '../Banner/Banner'
import Services from '../ServicesCection/ServicesCection'
import ClientSlider from '../ClientSlider/ClientSlider'
import Benefits from '../Benefits/Benefits'
import BeMarchent from '../BeMarchent/BeMarchent '
import HowItWorks from '../HowItWorks/HowItWorks'
import CustomersReview from '../CustomersReview/CustomersReview'
import FaqSection from '../FaqSection/FaqSection'

const Home = () => {
    return (
        <div>
            <Banner />
            <HowItWorks></HowItWorks>
            <Services />
            <ClientSlider />
            <Benefits></Benefits>
            <BeMarchent></BeMarchent>
            <CustomersReview></CustomersReview>
            <FaqSection></FaqSection>
        </div>
    )
}

export default Home