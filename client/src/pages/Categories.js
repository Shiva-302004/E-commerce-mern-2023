import React from 'react'
import Layout from '../components/layouts/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories=useCategory()
  return (
    <Layout>
        <div className='row'>
            {
                categories.map((item,id)=>{
                    return <div key={id} className="col-md-5 ms-2 mt-3">
                                <Link className="btn btn-secondary text-warning " to={`/category/${item._id}`}>{item.name}</Link>
                           </div>
                })
            }
            
            
        </div>
    </Layout>
  )
}

export default Categories