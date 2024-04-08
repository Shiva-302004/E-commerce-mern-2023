import React, { useState } from 'react'
import Layout from '../components/layouts/Layout'
import { Link ,useNavigate,useLocation} from 'react-router-dom'
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/auth';
const defaultState = { email: "", password: "" }
const Login = () => {
    const [login, setlogin] = useState(defaultState)
    const {auth,setauth}=useAuth()
    const onChange = (e) => {
        e.preventDefault()
        setlogin({ ...login, [e.target.name]: e.target.value })
    }
    const navigation=useNavigate()
    const location=useLocation()
    const handleLogin=async()=>{
        fetch(`${process.env.REACT_APP_SERVER}/api/v1/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(login)
        }).then(res=>res.json()).then((data)=>{
            console.log(data)
            if(data.success){
                setTimeout(()=>{
                    toast.success(data.msg)
                },1500)
                setauth({...auth,user:data.data,token:data.token})
                localStorage.setItem("authtoken",data.token)
                localStorage.setItem("name",data.data.name)
                localStorage.setItem("role",data.data.role)
                localStorage.setItem("email",data.data.email)
                localStorage.setItem("contact",data.data.phone)
                localStorage.setItem("address",data.data.address)
                navigation(location.state||"/")
            }else{
                toast.error(data.msg)
                navigation("/login")
            }
        })
    }
    return (
        <Layout>
            <div className='back' style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
            <form className='forms' style={{height:"50vh",display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center"}}>
            <h1 className='text-center'> Login Page</h1>
                <div className="mb-3">
                    
                    <input type="email" name='email' onChange={onChange} value={login.email} placeholder='email' className="form-control form-controls" id="exampleInputEmail" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    
                    <input type="password" name='password' onChange={onChange} value={login.password} placeholder='password' className="form-control form-controls" id="exampleInputpassword" aria-describedby="emailHelp" />
                </div>

                <Link className="btn btn-primary form-controls btns" style={{textAlign:'center', border:"none" ,backgroundColor:"black",color:"white"}} onClick={handleLogin}>Login</Link>
                <Link style={{textAlign:'center', border:"none" ,color:"blue",marginTop:"4px",fontSize:"12px"}} to="/forgot-password">Forgot password?</Link>
            </form>
            </div>
        </Layout>
    )
}

export default Login