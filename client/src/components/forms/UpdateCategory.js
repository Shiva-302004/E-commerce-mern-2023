import React from 'react'
// import Layout from '../layouts/Layout'
import { Link } from 'react-router-dom'
const UpdateCategory = ({handleUpdate,name,setname,valuee}) => {
   
    
  return (
    <>
        <div className='d-flex justify-content-center items-center'>
        <form className='forms' style={{height:"50vh",display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center",width:"fit-content"}}>
            <h1 className='text-center'>{valuee}</h1>
                <div className="mb-3">
                    <input type="text" name='name' onChange={(e)=>setname({...name,name:e.target.value})} value={name} placeholder='CategoryName' className="form-control form-controls" id="exampleInputEmail" aria-describedby="emailHelp" />
                </div>
                

                <Link className="btn btn-primary form-controls btns" style={{textAlign:'center', border:"none" ,backgroundColor:"black",color:"white"}} onClick={handleUpdate}>{valuee}</Link>
                
            </form>
        </div>
    </>
  )
}

export default UpdateCategory