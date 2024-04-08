import {useState,useEffect} from "react"
import {useAuth} from "../../context/auth"
import { Outlet } from "react-router-dom"
import Spinner from "../Spinner"
export default function PrivateRoute(){
    const [ok,setok]=useState(false)
    const {auth,setauth}=useAuth()
    useEffect(()=>{
        const authcheck=async()=>{
            fetch(`${process.env.REACT_APP_SERVER}/api/v1/auth/user-auth`,{
                method:"GET",
                headers:{
                   token:localStorage.getItem("authtoken")
                }
            }).then(res=>res.json()).then((data)=>{
                if(data.ok){
                    setok(true)
                }
                console.log(data)
            })
            // console.log(auth.token)
        }
    if(localStorage.getItem("authtoken")) {authcheck()}
    },[auth])
    return ok ===true?<Outlet/>:<Spinner/>
}