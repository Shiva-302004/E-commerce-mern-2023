import React from 'react'
import Layout from '../components/layouts/Layout'
import contact from "../assets/images/contact.avif"
import { MdEmail } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
const Contact = () => {
  return (
    <Layout>
        <div className='hiii' style={{display:'flex',flexDirection:"row", justifyContent:"center",alignItems:"center"}}>
            <div><img src={contact} style={{height:"60vh",width:"40vw",maxWidth:"60vw",marginTop:"10vh"}} alt="" /></div>
            <div style={{display:"flex", flexDirection:"column",marginLeft:"20px",marginRight:"20px"}}>
                <h1 style={{textAlign:'center',color:"white",backgroundColor:"black",maxHeight:"100px"}}>CONTACT</h1>
                <p>any query and info about product feel free to call anytime</p>
                <div className='d-flex '>
                    <div><MdEmail /></div>
                    <div className='ms-2 textt'>Shivaverma30july@gmail.com</div>
                </div>
                <div className='d-flex mt-4'>
                    <div><FaMobileAlt /></div>
                    <div className='ms-2 textt'>6204491084</div>
                </div>
                <div className='d-flex mt-4'>
                    <div><BsFillTelephoneFill /></div>
                    <div className='ms-2 textt'>6202-454545</div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Contact