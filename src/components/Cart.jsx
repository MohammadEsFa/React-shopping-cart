import React,{Component} from 'react';

import { formatcurrency } from '../utils/price';
import Fade from 'react-reveal/Fade'
import Modal from 'react-modal'
import { Zoom } from 'react-reveal';
import axios from 'axios';
const shortid = require('shortid');

class Cart extends Component {

    state = {
        showForm : false,
        fullname : '',
        email:'',
        address:'',
        item : null
    }
    
    handleShow = () => {
        this.setState({showForm:true})
    }

    handleInput = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }
    
    handleSubmit = async (e) => {
        e.preventDefault();
        const {fullname,email,address} = this.state
        const order = {
            id:shortid.generate(),
            fullname,
            email,
            address,
            cartItems : this.props.cartItems
        }
        this.setState({item:order})
        await axios({
            method:'POST',
            url:'http://localhost:5000/users',
            data : {
                id:order.id,
                fullname,
                email,
                cartItems : this.props.cartItems
            }
        })
        localStorage.clear();
    }

    handleCloseCartModal = () => {
        this.setState({item:null})
    }

    handleRefreshPage =() => {
        window.location.reload(false);
      }
    

    render() { 
        const {cartItems , handleRemove} = this.props
        const {showForm , item }=this.state
        
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
                            onClick={this.handleShow}
                            className='btn btn-primary btn-sm'>Proceed</button>
                            </div>
                        </div> : null }
                        {showForm ? 
                        <Fade right cacade>
                        <div className='form-cart'>
                           <form onSubmit={(e)=>this.handleSubmit(e)}>
                               <ul className="form-container">
                                   <li>
                                       <label>Email</label>
                                       <input 
                                       name='email'
                                       type="email"
                                       onChange={this.handleInput}
                                       required />
                                   </li>
                                   <li>
                                       <label>FullName</label>
                                       <input
                                       name='fullname'
                                       type="text"
                                       onChange={this.handleInput}
                                       required />
                                   </li>
                                   <li>
                                       <label>Address</label>
                                       <input 
                                       name='address'
                                       type="text"
                                       onChange={this.handleInput}
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
                            onRequestClose={this.handleCloseModal}>
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
                                    onClick={() => { this.handleCloseCartModal(); this.handleRefreshPage();}}>
                                    Close</button>
                                 </div>
                                </Zoom>
                            </Modal> : null}
                    </div>
            </div>
        </div> 
        );
    }
}
 
export default Cart;