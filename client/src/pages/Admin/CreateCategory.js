import React, { useState, useEffect } from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import { toast } from "react-toastify"
import { Link } from 'react-router-dom'
import UpdateCategory from '../../components/forms/UpdateCategory'
import { ImCross} from 'react-icons/im'
import { MdModeEditOutline } from "react-icons/md";
import { Modal } from "antd"
const CreateCategory = () => {
  const [category, setcategory] = useState([])
  const [name,setname]=useState({name:""})
  const [modal,setmodal]=useState(false)
  const [selected,setselected]=useState(null)
  const [namee,setnamee]=useState({name:""})
  const handleCreate=(e)=>{
    e.preventDefault()
    try{
      fetch("http://localhost:8000/create-category",{
        method:"POST",
        headers:{
          token:localStorage.getItem("authtoken"),
          "Content-Type":"application/json"
        },
        body:JSON.stringify(name)
      }).then((res)=>res.json()).then((data)=>{
        if(data.success){
          toast.success(`${data.data.name} ${data.msg}`)
        }
      })
    }catch(err){
      console.log(err)
      toast.error("something went wrong")
    }
  }
  
  const handleUpdate=(id)=>{
    // e.preventDefault()
    try{
      fetch(`http://localhost:8000/update-category/${id}`,{
        method:"PUT",
        headers:{
          token:localStorage.getItem("authtoken"),
          "Content-Type":"application/json"
        },
        body:JSON.stringify(namee)
      }).then((res)=>res.json()).then((data)=>{
        if(data.success){
          toast.success(`${namee.name} ${data.msg}`)
        }
        getAllCategory()
        setmodal(false)
      })
    }catch(err){
      console.log(err)
      toast.error("something went wrong")
    }
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
  const handleDelete=(id)=>{
    try{
      fetch(`http://localhost:8000/delete-category/${id}`,{
        method:"DELETE",
        headers:{
          token:localStorage.getItem("authtoken"),
          "Content-Type":"application/json"
        }
      }).then(res=>res.json()).then((data)=>{
        if(data.success){
          toast.success(`${data.data.name} ${data.msg}`)
          getAllCategory()
        }else{
          toast.error(data.msg)
        }
      })
    }catch(err){
      console.log(err)
      toast.error("something went wrong")
    }
  }
  useEffect(() => {
    getAllCategory()
  }, [category])
  return (
    <Layout>
      <div className="container-fluid">
        <div className="d-flex  breakpoint">
          <div className="col-md-3"><AdminMenu /></div>
          <div className="col-md-9 ms-3  p-3">
            <h6>All Category</h6>
            <div className="p-3"><UpdateCategory valuee={"Create Category"} handleUpdate={handleCreate} name={name.name} setname={setname}/></div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">s.no</th>
                    <th scope="col">Name</th>
                    
                    <th scope="col">actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    category.map((item, id) => {
                      return (
                        <tr key={id}>
                          <th scope="row" >{id+1}</th>
                          <td>{item.name}</td>
                          
                          <td>
                            <Link className="btn" onClick={()=>{handleDelete(item._id)}}><ImCross/></Link>
                            <Link className="btn" onClick={()=>{setmodal(true);setselected(item._id);setnamee({...namee,name:item.name})}} ><MdModeEditOutline/></Link>
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>

            </div>
            <Modal onCancel={()=>setmodal(false)} footer={null} open={modal}>
                  <UpdateCategory name={namee.name} valuee={"update Category"} handleUpdate={()=>handleUpdate(selected)}  setname={setnamee}></UpdateCategory>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory