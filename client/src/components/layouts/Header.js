import React from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { FaBagShopping, FaCartPlus } from "react-icons/fa6";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchinput from '../forms/Searchinput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/Cart';
import { Badge } from 'antd';
const Header = () => {
    const location = useLocation()
    document.title = `${location.pathname === "/" ? "Ecommerce" : `Ecommerce:${location.pathname.substring(1, location.pathname.length)}`}`
    const navigation = useNavigate()
    const categories = useCategory()
    const {Cart}=useCart()
    // const role=localStorage.getItem("role")
    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light text-dark" style={{ color: "white" }}>
                <div className="container-fluid text-light ">
                    <Link className="navbar-brand text-dark" to="/"><FaBagShopping className='logo' />E-commerce</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01" >
                        <div className="d-flex"></div>
                        <Searchinput></Searchinput>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 mr-6 " style={{ marginLeft: "17%" }}>
                            <li className="nav-item">
                                <NavLink className={`nav-link ${location.pathname === "/" ? "active" : ""} `} aria-current="page" to="/">Home</NavLink>
                            </li>
                                <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle" to="/categories" data-bs-toggle="dropdown" >
                                    Category
                                </Link>
                                <ul className="dropdown-menu">
                                <li ><Link className="dropdown-item" to={`/categories`}>categories</Link></li>
                                    {
                                        categories.map((item,id)=>{

                                           return  <li key={id}><Link className="dropdown-item" to={`/category/${item._id}`}>{item.name}</Link></li>
                                        })
                                    }
                                </ul>
                                </li>

                            <li className="nav-item">
                                <NavLink className={`nav-link ${location.pathname === "/about" ? "active" : ""} `} to="/about">About</NavLink>
                            </li>
                            {
                                localStorage.getItem("authtoken") ?

                                    (
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {localStorage.getItem("name")}
                                            </a>
                                            <ul className="dropdown-menu" style={{ width: "5vw", fontSize: "12px" }}>
                                                <li className="nav-item">
                                                    <NavLink className={`nav-link  `}
                                                        onClick={() => {
                                                            localStorage.removeItem("authtoken")
                                                            localStorage.removeItem("name")
                                                            localStorage.removeItem("role")
                                                            localStorage.removeItem("email")
                                                            localStorage.removeItem("contact")
                                                            localStorage.removeItem("address")
                                                            toast.success("successfully logout")
                                                            setTimeout(() => {

                                                                navigation("/login")
                                                            }, 1000)
                                                        }}
                                                        style={{ border: "none" }}
                                                    >Logout</NavLink>
                                                </li>

                                                <li><Link className="dropdown-item" to={`/dashboard/${localStorage.getItem("role") === "0" ? "user" : "admin"}`} >Dashboard</Link></li>
                                                <li><hr className="dropdown-divider" /></li>
                                                <li><Link className="dropdown-item" to="/forgot-password">Forgot-Password</Link></li>
                                            </ul>
                                        </li>
                                    )
                                    :
                                    (
                                        <>
                                            <li className="nav-item">
                                                <NavLink className={`nav-link ${location.pathname === "/register" ? "active" : ""} `} to="/register">Signup</NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink className={`nav-link ${location.pathname === "/login" ? "active" : ""} `} to="/login">login</NavLink>
                                            </li>
                                        </>
                                    )
                            }

                            <li className="nav-item">
                                <NavLink className={`nav-link ${location.pathname === "/cart" ? "active" : ""} `} to="/cart"><Badge count={Cart.length} ><FaCartPlus style={{fontSize:"20px"}}/></Badge></NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header