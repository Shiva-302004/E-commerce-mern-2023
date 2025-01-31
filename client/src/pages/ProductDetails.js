import React, { useEffect, useState } from 'react'
import Layout from '../components/layouts/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaRupeeSign } from 'react-icons/fa6'

const ProductDetails = () => {
    const params = useParams()
    const [product, setProduct] = useState([])
    const [relatedproduct, setrelatedProduct] = useState([])
    const [category, setcategory] = useState()
    const location=useNavigate()
    const getsingleproduct = () => {
        try {
            fetch(`https://e-commerce-mern-2023.onrender.com/single-products/${params.id}`).then(res => res.json()).then((data) => {


                setProduct(data.data)

                // console.log(data.data)
            })
        } catch (err) {
            toast.error("something went wrong")
        }
    }
    const getsinglecategory = async () => {
        try {
            fetch(`https://e-commerce-mern-2023.onrender.com/single-category/${product?.category}`).then(res => res.json()).then((data) => {
                setcategory(data.data?.name)
            })
        } catch (err) {
            toast.success("nice")
        }
    }
    const realatedproduct=async()=>{
        try{
            
            product.category!==undefined?(

                fetch(`https://e-commerce-mern-2023.onrender.com/related-product/${product?.category}/${product?._id}`).then(res=>res.json()).then((data)=>{setrelatedProduct(data.data);console.log(data.data)})
            ):(setrelatedProduct(null))
            
        }catch(err){
            toast.error("something went wrong")
        }
    }
    useEffect(() => {
        getsinglecategory()
    }, [product, category])
    useEffect(() => {
        getsingleproduct()
        // realatedproduct()
    }, [])
    useEffect(()=>{
        realatedproduct()
    },[product])
    return (
        <Layout>
            <div className="row container">
                <div className="col-md-6 mt-2"><img src={product.photo} style={{ width: "100%", height: "60vh" }} alt="" /></div>
                <div className="col-md-6">
                    <h1 className='text-center'>Product Details</h1>
                    <h4><span style={{ fontWeight: "600" }}>Name: </span> {product.name}</h4>
                    <p><span style={{ fontWeight: "600" }}>Description: </span>{product.description}</p>
                    {/* <p><span style={{ fontWeight: "600" }}>Category: </span>{category}</p> */}
                    <h5><FaRupeeSign className='text-md' style={{ fontSize: "20px" }}></FaRupeeSign> <span className='mt-2'>{product.price}</span> </h5>
                    <button to="#" className=" btn btn-secondary ms-2" style={{ width: "fit-content", height: "5vh", fontSize: "15px" }}>add to cart</button>
                </div>
            </div>
            <h1 className='mt-5 text-center'>Related Products</h1>
            <div className="d-flex flex-wrap mb-4">
            {
              relatedproduct?.map((item, id) => {
                console.log(item)
                return <div key={id}>
                  <div className="card cards ms-4 mt-2" >
                    <img src={item.photo}  className="card-img-top" alt="..." style={{ height: "40vh" }} />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">{item.description?item.description.substring(0,29):""}</p>
                      <p className="card-text"><FaRupeeSign /> {item.price}</p>
                      <div className='d-flex justify-content-between' style={{display:"flex",justifyContent:"space-between"}}>

                      <button onClick={()=>{location(`/more-details/${item._id}`);window.location.reload()}} className="btn btn-primary pb-1" style={{width:"fit-content", height:"5vh",fontSize:"9px"}}>more details</button>
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

export default ProductDetails