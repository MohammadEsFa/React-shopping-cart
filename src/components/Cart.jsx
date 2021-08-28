import React,{Component} from 'react';
import { formatcurrency } from '../utils/price';

class Cart extends Component {

    state = {
        showForm : false,
        fullname : '',
        email:'',
        address:''
    }
    
    handleShow = () => {
        this.setState({showForm:true})
    }

    handleInput = (e) => {
        this.setState({[e.target.name] : e.target.value})
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        const {fullname,email,address} = this.state
        const order = {
            fullname,
            email,
            address,
            cartItems : this.props.cartItems
        }
        this.props.handleOrder(order)
    }

    render() { 
        const {cartItems , handleRemove} = this.props
        const {showForm }=this.state
        return ( 
        <div>
            <div 
               style={{color:cartItems.length ? 'black' : 'grey'}} className='cart-header'>
               {cartItems.length ? `You Have ${cartItems.length} Products` : 'Your Cart is Empty'}
            </div>
            <div>
                <div className='cart'>
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
                        <div className='form-cart'>
                           <form onSubmit={this.handleSubmit}>
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
                        </div>:null}
                    </div>
            </div>
        </div> 
        );
    }
}
 
export default Cart;