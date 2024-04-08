import React from 'react'
import Layout from '../components/layouts/Layout'
import contact from "../assets/images/contact.avif"
const Policy = () => {
    return (
        <Layout>
            <div className='d-flex' style={{ justifyContent: "center", alignItems: "center" }}>
                <div ><img style={{ height: "60vh", width: "40vw", maxWidth: "60vw", marginTop: "10vh", marginLeft: "10px" }} src={contact} alt="" /></div>
                <div className='textt' style={{ margin: "10vh 20px", height:"60vh",overflow:"scroll"}}>
                    <p className='texttt' style={{fontSize:"15px"}} >
                        Data privacy is increasingly seen as a significant concern — some have even proclaimed it a human rights issue. Most countries have enacted some kind of customer protection that regulates how information is collected, stored and how it can be used.
                        It’s on companies to ensure that violations don’t occur. For ecommerce companies, privacy policies are especially relevant due to the digital nature of business.
                        Ecommerce privacy policies should clearly show how data is collected, where it is stored, how it is used and how it may be shared. This includes everything from phone numbers to stored credit card information to purchase history to ad interactions.
                        By 2023, 75% of consumers around the world will be covered by privacy regulations. This means that ecommerce websites must have processes and systems in place to meet legal requirements and protect the information of customers, employees and partners.
                        Why D
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default Policy