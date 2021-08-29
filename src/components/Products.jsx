import React,{Component} from 'react';

import { formatcurrency } from '../utils/price';
import {Fade, Zoom} from 'react-reveal'
import Modal from 'react-modal'

class Products extends Component {

    state={
        item : null
    }

    handleOpenModal = (item) => {
        this.setState({item})
    }

    handleCloseModal = () => {
        this.setState({item:null})
    }

    render() { 
        const {products , handleAdd} = this.props
        const {item}=this.state
        return (
            <div>
                <Fade bottom cascade>
                <ul className='products'>
                  {products.map(product =>(
                      <li key={product._id}>
                        <div className='product'>
                            <a href={"#"+product._id} onClick={() =>this.handleOpenModal(product)}>
                                <img src={product.image} alt={product.title} />
                            </a>
                                <p className='title'>{product.title}</p>
                            <div className='products-price'>
                                <p>{formatcurrency(product.price)}</p>
                                <button 
                                className='btn btn-outline-dark'
                                onClick={() => handleAdd(product)}
                                >Add to Cart</button>
                            </div>  
                        </div>
                      </li>
                  ))}
                </ul>
                </Fade>
                {item ? 
                <Modal 
                isOpen={true} 
                onRequestClose={this.handleCloseModal}>
                    <Zoom>
                        <div className='modal-container'>
                           <div className='modal-details'>
                               <img src={item.image}/>
                               <div>
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <p>
                                        Available Sizes :
                                        {item.availableSizes.map(size => (
                                            <button className='btn btn-secondary btn-sm'>{size}</button>
                                        ))} 
                                    </p>
                                    <div className='modal-price'>
                                        <h4>{formatcurrency(item.price)}</h4>
                                        <button 
                                        style={{marginLeft:'auto',marginRight:'.5rem'}}
                                        className='btn btn-outline-dark'
                                        onClick={() => {
                                            handleAdd(item)
                                            this.handleCloseModal();
                                        }}
                                        >
                                        Add to cart
                                        </button>
                                        <button 
                                        className='btn btn-danger btn-sm'
                                        onClick={this.handleCloseModal}
                                        >close
                                        </button>
                                    </div>
                               </div>
                           </div>
                        </div>
                    </Zoom>
                </Modal> : null}
            </div>
          );
    }
}
 
export default Products;