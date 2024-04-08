import React, { useEffect, useState } from 'react'
import Layout from '../components/layouts/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { FaRupeeSign } from 'react-icons/fa6'

const SingleCategory = () => {
    const [product,setproduct]=useState([])
    const params=useParams()
    const location=useNavigate()
    const getSingleCategoryProduct=()=>{
        fetch(`http://localhost:8000/category-product/${params.id}`).then(res=>res.json()).then((data)=>{
            setproduct(data.data)
            console.log(data.data)
        })
    }
    useEffect(()=>{
        getSingleCategoryProduct()
    },[params.id])
  return (
    <Layout>
        <h1 className="text-center">All Products</h1>
        <h4 className='text-center'>{product.length} products found</h4>
          <div className="d-flex flex-wrap mb-4">
            {
              product.map((item, id) => {
                console.log(item)
                return <div key={id}>
                  <div className="card cards ms-4 mt-2" >
                    <img src={item.photo}  className="card-img-top" alt="..." style={{ height: "40vh" }} />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">{item.description?item.description.substring(0,29):""}</p>
                      <p className="card-text"><FaRupeeSign /> {item.price}</p>
                      <div className='d-flex justify-content-between' style={{display:"flex",justifyContent:"space-between"}}>

                      <button onClick={()=>location(`/more-details/${item._id}`)} className="btn btn-primary pb-1" style={{width:"fit-content", height:"5vh",fontSize:"9px"}}>more details</button>
                      <button to="#" className=" btn btn-secondary ms-2" style={{width:"fit-content", height:"5vh",fontSize:"9px"}}>add to cart</button>
                        </div>
                    </div>
                  </div>

                </div>
              })
            }
          </div>
    </Layout>
  )
}

export default SingleCategory