import React from 'react'
import Layout from "../components/layouts/Layout"
import { Link ,useLocation} from 'react-router-dom'

const Pagenot = () => {
  const location=useLocation()
  return (
    <Layout>
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center" ,maxWidth:"100vw",marginTop:"10%"}}>
          <h1 style={{fontSize:"100px", fontWeight:"900"}}>404</h1>
          <h3 style={{color:"grey"}}>Oops page Not found {location.pathname.substring(1,location.pathname.length)} page</h3>
          <Link style={{background:"black",color:"white",textAlign:"center",padding:"10px"}} to="/">Go Back</Link>
        </div>
    </Layout>
  )
}

export default Pagenot