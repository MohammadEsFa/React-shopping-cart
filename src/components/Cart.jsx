import React, { useState } from 'react';

import { formatcurrency } from '../utils/price';
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import { Zoom } from 'react-reveal';
import axios from 'axios';
const shortid = require('shortid');

const Cart = ({cartItems , handleRemove}) => {

    const [showForm , setShowForm] = useState(false)
    const [fullName , setFullName] = useState('')
    const [email , setEmail] = useState('')
    const [address , setAddress] = useState('')
    const [item , setItem] = useState(null)
    
    const handleShow = () => {
        setShowForm(true)
    }

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const order = {
            id:shortid.generate(),
            fullName,
            email,
            address,
            cartItems
        }
        setItem(order)
        await axios({
            method:'POST',
            url:'http://localhost:5000/users',
            data : {
                id:order.id,
                fullName,
                email,
                cartItems
            }
        })
        
    }

    const handleRefreshPage =() => {
        window.location.reload(false);
      }
    
        
    let today = new Date();
    let date = `${today.getUTCMonth()}-${today.getUTCDay()}-${today.getUTCFullYear()}`
    let time = `${today.getHours()}:${today.getMinutes()}`

    
        return ( 
        <div>
            <div 
               style={{color:cartItems.length ? 'black' : 'grey'}} className='cart-header'>
               {cartItems.length ? `You Have ${cartItems.length} Products` : 'Your Cart is Empty'}
            </div>
            <div>
                <div className='cart'>
                    <Fade left cascade >
                   <ul className='cart-items'>
                       {cartItems.map(cart => (
                           <li key={cart._id}>
                             <div>
                                <img src={cart.image} alt={cart.title}/>
                                <p>{cart.title}</p>
                             </div>
                             <div>
                                 <h6>{formatcurrency(cart.price)} x{cart.count}</h6>
                                 <button 
                                 onClick={() => handleRemove(cart._id)}
                                 className='btn btn-danger btn-sm'>Remove</button>
                             </div>
                             <hr/>
                           </li>
                       ))}
                   </ul>
                   </Fade>
                </div>
                    <div>{cartItems.length ? 
                        <div className='total'>
                            <div className='total-cart'>
                            <div>
                                Total :{" "}  
                                    {formatcurrency(cartItems.reduce((a,c) => a + (c.price * c.count),0))}
                            </div>
                            <button 
                            onClick={handleShow}
                            className='btn btn-primary btn-sm'>Proceed</button>
                            </div>
                        </div> : null }
                        {showForm ? 
                        <Fade right cacade>
                        <div className='form-cart'>
                           <form onSubmit={(e)=>handleSubmit(e)}>
                               <ul className="form-container">
                                   <li>
                                       <label>Email</label>
                                       <input 
                                       value={email}
                                       onChange={(e) => setEmail(e.target.value)}
                                       required />
                                   </li>
                                   <li>
                                       <label>FullName</label>
                                       <input
                                       value={fullName}
                                       onChange={(e) => setFullName(e.target.value)}
                                       required />
                                   </li>
                                   <li>
                                       <label>Address</label>
                                       <input 
                                       value={address}
                                       onChange={(e) => setAddress(e.target.value)}
                                       required />
                                   </li>
                                   <li>
                                       <button 
                                       type='submit'
                                       className='btn btn-success btn-sm'
                                       >ChekOut</button>
                                   </li>
                               </ul>
                           </form>
                        </div></Fade> :null}
                        {item ? 
                            <Modal
                            isOpen={true} 
                            onRequestClose={setItem}>
                                <Zoom>
                                    <div className='cart-modal'>
                                    <h3>Your Order Has Been Placed</h3>
                                    <h4>Order: {item.id}</h4>
                                    <ul>
                                        <li>
                                            <h6>FullName:</h6>
                                            <p>{item.fullname}</p>
                                        </li>
                                        <li>
                                            <h6>Email:</h6>
                                            <p>{item.email}</p>
                                        </li>
                                        <li>
                                            <h6>Date:</h6>
                                            <p>{`${time} ${date}`}</p>
                                        </li>
                                        <li>
                                            <h6>Total:</h6>
                                            <p>
                                            {formatcurrency(cartItems.reduce((a,c) => a + (c.price * c.count),0))}
                                            </p>
                                        </li>
                                        <li>
                                            <h6>Items:</h6>
                                            <div style={{textAlign:'right'}}>
                                                {item.cartItems.map(i => (
                                                    <p key={i._id}>{`${i.count}x ${i.title}`}</p>
                                                ))}
                                            </div>
                                        </li>
                                    </ul>
                                    <button 
                                    className='btn btn-danger btn-sm'
                                    onClick={() => { setItem(null); handleRefreshPage();localStorage.clear();}}>
                                    Close</button>
                                 </div>
                                </Zoom>
                            </Modal> : null}
                    </div>
            </div>
        </div> 
        );
    }
 
export default Cart;