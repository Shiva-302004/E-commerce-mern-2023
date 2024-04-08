import React from 'react'
import Layout from '../components/layouts/Layout'
import "../styles/login.css"
import { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {toast} from "react-toastify"
const defaultState={name:"",email:"",address:"",phone:"",password:"",answer:""}
const Signup = () => {
    const [signup,setsignup]=useState(defaultState)
    const onChange=(e)=>{
        e.preventDefault()
        setsignup({...signup,[e.target.name]:e.target.value})
    }
    const navigation=useNavigate()
    const handlesignup=async()=>{
        fetch(`${process.env.REACT_APP_SERVER}/api/v1/auth/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(signup)
        }).then(res=>res.json()).then((data)=>{
            console.log(data)
            if(data.success){
                setTimeout(()=>{
                    toast.success(data.msg)
                },1500)
                localStorage.setItem("authtoken",data.token)
                localStorage.setItem("name",data.data.name)
                localStorage.setItem("name",data.data.role)
                localStorage.setItem("email",data.data.email)
                localStorage.setItem("contact",data.data.phone)
                localStorage.setItem("address",data.data.address)
                navigation("/")
            }else{
                toast.error(data.msg)
                navigation("/signup")
            }
        })
    }
    return (
        <Layout>
            <div className='back' style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <form className='forms mt-5'>
            <h1 className='mt-2 text-center'>Register Page</h1>
                <div className="mb-3 mt-1">
                    
                    <input  type="text" name='name' onChange={onChange} value={signup.name} required placeholder='Name' className="form-control form-controls" id="exampleInputname" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                   
                    <input type="email" name='email' onChange={onChange} value={signup.email} placeholder='email' required className="form-control form-controls" id="exampleInputEmail" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    
                    <input type="password" name='password' onChange={onChange} value={signup.password} placeholder='password' required className="form-control form-controls" id="exampleInputpassword" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    
                    <input type="text" name='address' onChange={onChange} value={signup.address} placeholder='address' required className="form-control form-controls" id="exampleInputaddress" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                   
                    <input type="number" name='phone' onChange={onChange} value={signup.phone} placeholder='phone' required className="form-control form-controls" id="exampleInputphone" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                   
                    <input type="text" name='answer' onChange={onChange} value={signup.answer} placeholder='what is your nick name' required className="form-control form-controls" id="exampleInputphone" aria-describedby="emailHelp" />
                </div>
                <Link type="submit" className="btn btn-primary form-controls btns" style={{textAlign:'center', border:"none" ,backgroundColor:"black",color:"white"}} onClick={handlesignup}>REGISTER</Link>
            </form>
            </div>

        </Layout>
    )
}

export default Signup