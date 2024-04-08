import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {ToastContainer} from "react-toastify"
const Layout = ({children}) => {
  return (
    <div>
        <Header></Header>
        <main style={{minHeight:"100vh"}}>
        <ToastContainer/>
        {children}
        </main>
        <Footer></Footer>
    </div>
  )
}

export default Layout