import React from 'react'
import Layout from '../components/layouts/Layout'
import { useCart } from '../context/Cart'
import { useNavigate } from 'react-router-dom'
import { FaRupeeSign } from 'react-icons/fa'
// import { set } from 'mongoose'

const Cart = () => {
    const {Cart,setCart}=useCart()
    const location=useNavigate()
    const removeProduct=(pid)=>{
        try{
            let myCart=[...Cart]
            let index=myCart.findIndex(item=>item._id===pid)
            myCart.splice(index,1)
            setCart(myCart)
            localStorage.setItem("cart",JSON.stringify(myCart))
        }catch(err){
            console.log(err)
        }
    }
    const totalPrice=()=>{
        let total =0
        Cart?.map((item)=>{
            total+=item.price
        })
        return total;
    }
    // const cart=localStorage.getItem("cart")
  return (
    <Layout>
        <div className="container row ">
            
            <div className="col-md-12">
                <h5 className="text-center bg-light p-2">
                    {` ${localStorage.getItem("authtoken") ? `hello ${localStorage.getItem("name")}`:""}`}
                </h5>
                <h6 className='text-center'>
                    {Cart?.length>=1?`${Cart?.length} present in Cart ${localStorage.getItem("authtoken")?"":"please login"}`:"nothing is present in Cart"}
                </h6>
                <div className='row mt-5'>
                    <div className="col-md-8">
                        {
                            Cart?.map((item,id)=>{
                               return <div key={id} className="row  mt-2 card flex-row ms-2 mb-1" style={{width:"100%"}}>
                                    <div className="col-md-4">
                                        <img src={item.photo} style={{height:"100px",width:"100px"}} alt="" />
                                    </div>
                                    <div className="col-md-8 ">
                                        <h4 style={{textTransform:"uppercase"}}>{item.name}</h4>
                                        <p>{item.description.substring(0,29)}</p>
                                        <p><span style={{fontWeight:"600"}}>Price:</span> <FaRupeeSign style={{fontSize:"15px"}}/> {item.price}</p>
                                        <button className='btn btn-danger mb-1' onClick={()=>{removeProduct(item._id);}}>Remove</button>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className="col-md-4">
                        <h4>Cart Summary</h4>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <span className='d-flex'><h4>Total:</h4><h5 className='ms-2'><FaRupeeSign></FaRupeeSign>{totalPrice()}</h5> </span>
                        {
                            localStorage.getItem("address")?(

                        <div>
                            <div className='d-flex' style={{width:"100%"}}>
                            <h6 className='mt-1'>Current Address :</h6>
                            <span>

                            
                                <p className='ms-1'> {localStorage.getItem("address")}</p>
                            
                            </span>
                            </div>
                            <button className='btn btn-warning bg-transparent' onClick={()=>{
                                location("/dashboard/user/profile")
                            }}>Update Address</button>
                        </div>
                            ):(
                                localStorage.getItem("authtoken")?"":location("/login")
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Cart