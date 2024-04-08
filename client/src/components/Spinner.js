import React from 'react'
import { useNavigate ,useLocation} from 'react-router-dom'
import { useState,useEffect } from 'react'
const Spinner = ({path="login"}) => {
    const [count,setcount]=useState(3)
    const navigation=useNavigate()
    const location=useLocation()
    useEffect(() => {
        const interval=setInterval(()=>{
            setcount((prev)=>--prev)
        },[1000])
        count===0 && navigation(`${path}`,{
            state:location.pathname
        })
        return ()=>clearInterval(interval)
    }, [count,navigation,location])
    
    return (
        <div style={{textAlign:"center"}}>
            <h1 className='text-center'>Redirecting you in {count} seconds</h1>
            <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Spinner