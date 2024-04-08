import React ,{useState,useEffect}from 'react'
import Layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'
import { Link,useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
const defaultState={name:"",email:"",phone:"",password:"",address:""}
const Profile = () => {
  const [signup,setsignup]=useState(defaultState)
    const onChange=(e)=>{
        e.preventDefault()
        setsignup({...signup,[e.target.name]:e.target.value})
        console.log(signup)
    }
    const navigation=useNavigate()
    useEffect(()=>{
      setsignup({name:localStorage.getItem("name"),phone:localStorage.getItem("contact"),email:localStorage.getItem("email"),password:"",address:localStorage.getItem("address")})
    },[])
  const handlesignup=async()=>{
    fetch(`${process.env.REACT_APP_SERVER}/api/v1/auth/update-user`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            "token":localStorage.getItem("authtoken")
        },
        body:JSON.stringify(signup)
    }).then(res=>res.json()).then((data)=>{
        console.log(data)
        if(data?.error)toast.error(data.msg)
        if(data.success){
            setTimeout(()=>{
                toast.success(data.msg)
            },1500)
            if(data.data.name!==localStorage.getItem("name")){
              localStorage.setItem("name",data.data.name)
            }
            if(data.data.phone!==localStorage.getItem("contact")){
              localStorage.setItem("contact",data.data.phone)
            }
            if(data.data.address!==localStorage.getItem("address")){
              localStorage.setItem("address",data.data.address)
            }
            
            setsignup({name:data.data.name,phone:data.data.phone,email:localStorage.getItem("email"),password:"",address:data.data.address})
        }else{
            toast.error(data.msg)
            // navigation("/signup")
        }
    })
}
  return (
    <Layout>
      <div className="container-fluid">
        <div className="d-flex">
          <div className="col-md-3"><UserMenu /></div>
          <div className="col-md-9 ms-3  p-3">
            <div className='back' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
              <form className='forms mt-5'>
                <h1 className='mt-2 text-center'>Profile</h1>
                <div className="mb-3 mt-1">

                  <input type="text" name='name' onChange={onChange} value={signup.name} required placeholder='Name' className="form-control form-controls" id="exampleInputname" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">

                  <input type="email" name='email' onChange={onChange} value={signup.email} disabled placeholder='email' required className="form-control form-controls" id="exampleInputEmail" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">

                  <input type="password" name='password' onChange={onChange} value={signup.password} placeholder='password'  className="form-control form-controls" id="exampleInputpassword" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">

                  <input type="number" name='phone' onChange={onChange} value={signup.phone} placeholder='phone' required className="form-control form-controls" id="exampleInputphone" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">

                  <input type="text" name='address' onChange={onChange} value={signup.address} placeholder='address' required className="form-control form-controls" aria-describedby="emailHelp" />
                </div>
                <Link type="submit" className="btn btn-primary form-controls btns" style={{ textAlign: 'center', border: "none", backgroundColor: "black", color: "white" }} onClick={handlesignup}>UPDATE</Link>
              </form>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}

export default Profile