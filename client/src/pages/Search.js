import React from 'react'
import Layout from '../components/layouts/Layout'
import { useSearch } from '../context/SearchContext'
import { Link } from 'react-router-dom'
import { FaRupeeSign } from 'react-icons/fa6'
import "../styles/login.css"
const Search = () => {
    const {value,setvalue}=useSearch()
  return (
    <Layout>
        <div className="text-center">
            <h1>Search Results</h1>
            <h6>{value?.result.length<1?`no result found for ${value.keyword}`:value.result.length}</h6>
            <div className="d-flex flex-wrap mb-4">
            {
              value.result.map((item, id) => {
                console.log(item)
                return <div key={id}>
                  <div className="card cardsss ms-4 mt-2" >
                    <img src={item.photo}  className="card-img-top" alt="..." style={{ height: "40vh" }} />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">{item.description}</p>
                      <p className="card-text"><FaRupeeSign /> {item.price}</p>
                      
                        <div className='d-flex justify-content-between' style={{display:"flex",justifyContent:"space-between"}}>

                      <Link to="#" className="btn btn-primary pb-1" style={{width:"fit-content", height:"7vh"}}>more details</Link>
                      <Link to="#" className=" btn btn-secondary" style={{width:"fit-content", height:"7vh"}}>add to cart</Link>
                        </div>
                      
                    </div>
                  </div>

                </div>
              })
            }
            </div>
        </div>
    </Layout>
  )
}

export default Search