import React from 'react'
import { Link,useLocation } from 'react-router-dom'

const Footer = () => {
    const location=useLocation()
  return (
    <div className='footer text-light ps-3 pe-3 pt-2 pb-1 text-center d-block '>
        <p className='text-warning '>Mern Ecommerce &copy; by shiva</p>
        <div  className="links">
            <ul >
                <li className='hove text-light pt-3'><Link className={`text-light ${location.pathname==="/policy"?"activee":""} `}to="/policy">Policy</Link></li>
                <li className='hove text-light pt-3'><Link className={`text-light ${location.pathname==="/about"?"activee":""} `}to="/about">About</Link></li>
                <li className='hove text-light pt-3'><Link className={`text-light ${location.pathname==="/contact"?"activee":""} `}to="/contact">Contact</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default Footer