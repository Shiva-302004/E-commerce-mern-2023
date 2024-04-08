import React, { useEffect, useState } from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import upload_area from "../../assets/images/upload_area.png"
const defaultState = { name: "", description: "", price: "", quantity: "", photo: "", category: "" }
const CreateProduct = () => {
  const [category, setcategory] = useState([])
  const [image, setimage] = useState(false)
  const location=useNavigate()
  const ImageHandler = (e) => {
    setimage(e.target.files[0])
    console.log(e.target.files[0])
  }
  const [signup, setsignup] = useState(defaultState)
  const onChange = (e) => {
    e.preventDefault()
    setsignup({ ...signup, [e.target.name]: e.target.value })
    console.log(signup)
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
    getAllCategory()
  }, [category])
  const createProduct = async(e) => {
    e.preventDefault()
    let responsedata;
    let product=signup
    let formdata=new FormData()
    formdata.append("product",image)

    await fetch("http://localhost:8000/uploadimage",{
      method:"POST",
      headers:{
        Accept:'application/json'
      },
      body:formdata
    }).then(res=>res.json()).then((data)=>{responsedata=data})
    if(responsedata.success){
      product.photo=responsedata.path
      toast.success(responsedata.msg)

      fetch("http://localhost:8000/create-product",{
        method:"POST",
        headers:{
          token:localStorage.getItem("authtoken"),
          "Content-Type":"application/json"
        },
        body:JSON.stringify(product)
      }).then(res=>res.json()).then((data)=>{
        if(data.success){
          setTimeout(()=>{

            toast.success(`${data.msg} ${data.data.name}`)
          },1500)
          setsignup(defaultState)
          location("/dashboard/admin/products")
          // setimage("false")
        }
      })
    }
  }
  return (
    <Layout>
      <div className="container-fluid">
        <div className="d-flex breakpoint">
          <div className="col-md-3"><AdminMenu /></div>
          <div className="col-md-9 ms-3  p-3">
            <form className='forms mt-5 d-flex flex-column justify-content-center' style={{ alignItems: "center" }}>
              <h1 className='mt-2 text-center'>Create product</h1>
              <div className="mb-3 mt-1">

                <input type="text" name='name' onChange={onChange} value={signup.name} required placeholder='Name' className="form-control form-controls" id="exampleInputname" aria-describedby="emailHelp" style={{ border: "0.3px solid gray" }} />
              </div>
              <div className="mb-3">

                <textarea type="email" name='description' onChange={onChange} value={signup.description} placeholder='description' required className="form-c form-controls" id="exampleInputEmail" aria-describedby="emailHelp" style={{ height: "20vh", border: "0.3px solid gray", padding: "0px" }} />
              </div>
              <div className='d-flex '>
                <div className="mb-3">

                  <select name="category" id="" onChange={onChange} style={{ outline: "none", border: "none", marginTop: "2px" }}>
                    {
                      category.map((item, id) => {
                        return <option key={id} value={item._id}>{item.name}</option>
                      })
                    }
                  </select>
                </div>
                <div className="mb-3 ms-3">

                  <input type="text" name='price' onChange={onChange} value={signup.price} placeholder='price' required className="form-control " id="exampleInputaddress" aria-describedby="emailHelp" />
                </div>
              </div>
              <div className='d-flex'>

                <div className="mb-3">

                  <input type="text" name='quantity' onChange={onChange} value={signup.quantity} placeholder='quantity' required className="form-control " id="exampleInputphone" aria-describedby="emailHelp" />
                </div>
                <label htmlFor="image-input" className='ms-3 mb-3'>
                  <img src={image ? URL.createObjectURL(image) : upload_area} className='w-[200px] h-[200px]' alt="" />
                </label>
                <input onChange={ImageHandler} type="file" name="image" id="image-input" hidden />
              </div>

              <Link type="submit" className="btn btn-primary form-controls btns" style={{ textAlign: 'center', border: "none", backgroundColor: "black", color: "white" }} onClick={createProduct}>Create Product</Link>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateProduct