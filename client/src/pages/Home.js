import React, { useState, useEffect } from 'react'
import Layout from '../components/layouts/Layout'
import { Link, useNavigate } from 'react-router-dom'
import {Checkbox,Radio} from "antd"
import { toast } from 'react-toastify'
import { Prices } from '../components/Prices'
import { FaRupeeSign } from "react-icons/fa";
import "../styles/login.css"
import { useCart } from '../context/Cart'
// import { useAuth } from '../context/auth'
const Home = () => {
  const [category, setcategory] = useState([])
  const [product, setproduct] = useState([])
  const [checked,setchecked]=useState([])
  const [radio,setradio]=useState([])
  const [total, settotal] = useState(0)
  const [page, setpage] = useState(1)
  const [loading,setloading]=useState(false)
  const {Cart,setCart}=useCart()
  const location=useNavigate()
  const gettotal=()=>{
    fetch("http://localhost:8000/product-count").then(res => res.json()).then((data) => settotal(data.count))
  }
  // const location=useNavigate()
  const getAllproduct = () => {
    fetch("http://localhost:8000/all-products").then(res => res.json()).then((data) => setproduct(data.data))
  }
  const getAllCategory = async () => {
    try {
      fetch("http://localhost:8000/all-category", {
        method: "get"
      })
        .then(res => res.json())
        .then((data) => {
          if (data.success) {
            setcategory(data.data)

          } else {
            toast.error(data.msg)
          }
        })
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
   if(!checked.length||!radio.length) getAllproduct()
   //eslint-disable-next-line
  }, [checked.length,radio.length])
  useEffect(()=>{
    if(checked.length ||radio.length) filterproduct()
  },[checked,radio])
  useEffect(() => {
    getAllCategory()
    gettotal()
    //eslint-disable-next-line
  }, [])
  
  const onChange=(value,id)=>{
    let all=[...checked]
    if(value){
      all.push(id)
    }else{
      all=all.filter((c)=>c!==id)
    }
    setchecked(all)
  }
  const filterproduct=()=>{
    try{
      fetch("http://localhost:8000/filter-products",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({checked,radio})
      }).then(res=>res.json()).then((data)=>{
        console.log(data)
        setproduct(data.data)
        console.log(JSON.stringify({checked,radio}))
      })
    }catch(err){
      console.log(err)
      toast.error("something went wrong")
    }
  }
  const loadmore=()=>{
    try{
      setloading(true)
      fetch(`http://localhost:8000/productper/${page}`).then(res=>res.json()).then((data)=>{
        setloading(false)
        setproduct([...product,...data.data])
      })
    }catch(err){
      toast.error("something went wrong")
      setloading(false)
    }
  }
  return (
    <Layout>
      <div className="row mt-3">
        <div className="col-md-3">
          <h6 className='text-center'>Filter By Categories</h6>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            {
              category?.map((item,id)=>{
                return<Checkbox key={id} onChange={(e)=>onChange(e.target.checked,item._id)}>
                  {item.name}
                </Checkbox>
              })
            }
          </div>
          <h6 className='text-center mt-4'>Filter By Prices</h6>
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <Radio.Group className='d-flex flex-column justify-content-center align-items-center'>
            {
              Prices?.map((item,id)=>{
                return <div key={item._id}>
                <Radio value={item.array}  onChange={(e)=>setradio(e.target.value)}>
                  {item.name}
                </Radio>
                </div>
              })
            }
            </Radio.Group>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <button className='btn btn-danger h-7 mt-3' style={{height:"7vh"}} onClick={()=>window.location.reload()}>Reset</button>
          </div>
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
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
                      <button onClick={()=>{
                        setCart([...Cart,item])
                        toast.success("product added to cart")
                        localStorage.setItem("cart",JSON.stringify([...Cart,item]))
                      }} className=" btn btn-secondary ms-2" style={{width:"fit-content", height:"5vh",fontSize:"9px"}}>add to cart</button>
                        </div>
                    </div>
                  </div>

                </div>
              })
            }
          </div>
          <div className='m-2 p-3 text-center'>{product?.length<total && (
            <button className='btn btn-warning'onClick={(e)=>{
              e.preventDefault()
              loadmore()
              
              setpage(page+1)
            }}>{loading?"loading...":"Explore more"}</button>
          )}</div>
        </div>
      </div>

    </Layout>
  )
}

export default Home