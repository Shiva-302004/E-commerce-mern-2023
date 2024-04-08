import React from 'react'
import Layout from '../components/layouts/Layout'
import about from "../assets/images/about.jpeg"
const About = () => {
    return (
        <Layout>
            <div className='d-flex' style={{ justifyContent: "center", alignItems: "center" }}>
                <div ><img style={{ height: "60vh", width: "40vw", maxWidth: "60vw", marginTop: "10vh", marginLeft: "10px" }} src={about} alt="" /></div>
                <div className='textt' style={{ margin: "0px 20px" }}><p>A business builds the website and lists the products or services they sell, along with prices. (There are a ton of ecommerce platforms out there that make it easier to start your online business.)
                    A customer finds the website, then buys goods and services. When theyve decided theyre done online shopping, they move to the checkout phase.
                    The ecommerce website sends the payment information through a payment processor that validates the payment and collects the funds.
                </p></div>
            </div>
        </Layout>
    )
}

export default About