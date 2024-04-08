import React ,{useState}from 'react'
import Layout from '../components/layouts/Layout'
import { Link ,useNavigate,useLocation} from 'react-router-dom'
import {toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/auth';
const defaultState = { email: "", newpassword: "",answer:"" }
const ForgotPassword = () => {
  const [login, setlogin] = useState(defaultState)
    const {auth,setauth}=useAuth()
    const onChange = (e) => {
        e.preventDefault()
        setlogin({ ...login, [e.target.name]: e.target.value })
        console.log(login)
    }
    const navigation=useNavigate()
    const location=useLocation()
    const handleLogin=async()=>{
        fetch(`${process.env.REACT_APP_SERVER}/api/v1/auth/forgot-password`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(login)
        }).then(res=>res.json()).then((data)=>{
            if(data.success===true){
              toast.success(data.msg)
              navigation("/login")
            }else{
              toast.error(data.msg)
              
            }
            
        })
    }
  return (
    <Layout>
      <div className='back' style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <form className='formss' style={{ height: "60vh", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
          <h3 className='text-center'> Forgot-Password Page</h3>
          <div className="mb-3">

            <input type="email" name='email' onChange={onChange} value={login.email} placeholder='email' className="form-control form-controls" id="exampleInputEmail" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">

            <input type="password" name='newpassword' onChange={onChange} value={login.newpassword} placeholder='new-password' className="form-control form-controls" id="exampleInputpassword" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">

            <input type="text" name='answer' onChange={onChange} value={login.answer} placeholder='answer' className="form-control form-controls" id="exampleInputanswer" aria-describedby="emailHelp" />
          </div>

          <Link className="btn btn-primary form-controls btns" style={{ textAlign: 'center', border: "none", backgroundColor: "black", color: "white" }} onClick={handleLogin}>Change Password</Link>
          
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword