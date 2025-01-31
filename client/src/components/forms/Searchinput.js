import React from 'react'
import { useSearch } from '../../context/SearchContext'
import { useNavigate } from 'react-router-dom'
const Searchinput = () => {
    const {value,setvalue}=useSearch()
    const loacation=useNavigate()
    const handlesubmit=async(e)=>{
        try{
            e.preventDefault()
            fetch(`https://e-commerce-mern-2023.onrender.com/search-product/${value.keyword}`).then(res=>res.json()).then((data)=>{
                setvalue({...value,result:data.data})
                console.log(data.data)
                loacation("/search")
            })
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div>
            <form className="d-flex" role="search" onSubmit={handlesubmit}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={value.keyword} onChange={(e)=>{setvalue({...value,keyword:e.target.value})}}/>
                <button className="btn btn-outline-success"
                    type="submit">Search</button>
            </form>
        </div>
    )
}

export default Searchinput