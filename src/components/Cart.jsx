import React,{Component} from 'react';
import { formatcurrency } from '../utils/price';

class Cart extends Component {

    render() { 
        const {cartItems , handleRemove} = this.props
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
                {cartItems.length ? 
                <div className='total'>
                    <div className='total-cart'>
                       <div>
                           Total :{" "}  
                            {formatcurrency(cartItems.reduce((a,c) => a + (c.price * c.count),0))}
                       </div>
                       <button className='btn btn-primary btn-sm'>Proceed</button>
                    </div>
                </div> : null }
                
            </div>
        </div> 
        );
    }
}
 
export default Cart;