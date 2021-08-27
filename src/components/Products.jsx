import React,{Component} from 'react';
import { formatcurrency } from '../utils/price';

class Products extends Component {
    // state = {  }
    render() { 
        return (
            <div>
                <ul className='products'>
                  {this.props.products.map(product =>(
                      <li key={product._id}>
                        <div className='product'>
                            <a href={"#"+product._id}>
                                <img src={product.image} alt={product.title} />
                            </a>
                                <p className='title'>{product.title}</p>
                            <div className='products-price'>
                                <p>{formatcurrency(product.price)}</p>
                                <button className='btn btn-outline-dark'>Add to Cart</button>
                            </div>  
                        </div>
                      </li>
                  ))}
                </ul>
            </div>
          );
    }
}
 
export default Products;