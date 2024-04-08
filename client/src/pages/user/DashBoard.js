import React from 'react'
import Layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'
const DashBoard = () => {
  return (
    <Layout>
         <div className="container-fluid breakpoint">
            <div className="d-flex">
                <div className="col-md-3"><UserMenu/></div>
                <div className="col-md-9 ms-3 mt-5 p-3">
                    <div className="card p-3" style={{width:"60vw"}}>
                        <h5>User Name: {localStorage.getItem("name")}</h5>
                        <h5>User Email: {localStorage.getItem("email")}</h5>
                        <h5>User Contact: {localStorage.getItem("contact")}</h5>
                        <h5>Role: user</h5>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default DashBoard