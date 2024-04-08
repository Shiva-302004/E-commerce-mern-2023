import React from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'

const AdminDasboard = () => {
  return (
    <Layout>
        <div className="container-fluid">
            <div className="d-flex">
                <div className="col-md-3"><AdminMenu/></div>
                <div className="col-md-9 ms-3 mt-5 p-3">
                    <div className="card p-3" style={{width:"60vw"}}>
                        <h5>Admin Name:{localStorage.getItem("name")}</h5>
                        <h5>Admin Email:{localStorage.getItem("email")}</h5>
                        <h5>Admin Contact: {localStorage.getItem("contact")}</h5>
                        <h5> Role: Admin</h5>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default AdminDasboard