import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/layouts/AdminMenu'
import Layout from '../../components/layouts/Layout'
import { toast } from 'react-toastify'
import {  useNavigate } from 'react-router-dom'
import "../../styles/login.css"
const Product = () => {
    const [product, setproducts] = useState([])
    const location=useNavigate()
    const getAllProducts = () => {
        try {
            fetch("https://e-commerce-mern-2023.onrender.com/all-products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => res.json()).then((data) => {
                setproducts(data.data)
            })
        } catch (err) {
            console.log(err)
            toast.error("something went wrong")
        }
    }
    useEffect(() => {
        getAllProducts()
    }, [])
    return (
        <Layout>
            <div className="container-fluid ">
                <div className="d-flex breakpoint">
                    <div className="col-md-3"><AdminMenu /></div>
                    <div className="col-md-9 ms-3  p-3">
                        <h6>All Products</h6>
                        <div className='d-flex' style={{flexWrap:"wrap"}}>

                        {
                            product.map((item, id) => {
                                console.log(item)
                                return <div key={id}>
                                    <div className="card cards ms-2 mt-2" >
                                        <img src={item.photo} onClick={()=>location(`/dashboard/admin/update-product/${item._id}`)} className="card-img-top" alt="..." style={{height:"30vh"}}/>
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="card-text">{item.description}</p>
                                            {/* <Link to="#" className="btn btn-primary">Go somewhere</Link> */}
                                        </div>
                                    </div>

                                </div>
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Product