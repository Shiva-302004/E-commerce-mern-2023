import React from 'react'
import Layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'

const Orders = () => {
  return (
    <Layout>
        <div className="container-fluid">
            <div className="d-flex">
                <div className="col-md-3"><UserMenu/></div>
                <div className="col-md-9 ms-3  p-3">
                    <h1>Orders</h1>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Orders