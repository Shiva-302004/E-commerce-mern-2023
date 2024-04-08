import React from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
const Allusers = () => {
  return (
    <Layout>
        <div className="container-fluid">
            <div className="d-flex">
                <div className="col-md-3"><AdminMenu/></div>
                <div className="col-md-9 ms-3  p-3">
                    <h1>users</h1>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Allusers