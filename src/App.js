import React , {Component} from 'react';
import Cart from './components/Cart';

import Filter from './components/Filter';
import Products from './components/Products';
import data from './data.json'


class App extends Component {

  state = {
    products : data.products,
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) :[],
    size : "",
    sort : ""
  }

  handleSort = (event) => {
    const sort = event.target.value
    const myproducts = [...data.products]
    this.setState({
      sort,
      products : myproducts.sort((a,b)=>(
        sort === 'Lowset' ?
        ((a.price > b.price) ? 1:-1):
        sort === 'Highest' ?
        ((a.price < b.price) ? 1:-1):
        ((a._id > b._id) ? 1:-1)
      ))
    })
  }

  
  handleSize = (event) => {
    event.target.value === "" ? 
    this.setState({size:event.target.value , products : data.products}) 
    :
    this.setState({size:event.target.value , products : data.products.filter(product => product.availableSizes.indexOf(event.target.value) >= 0)})
  }

  handleAddtoCart = (product) => {
    const cartItems = [...this.state.cartItems]
    let already = false
    cartItems.map(item => {
      if(item._id === product._id){
        item.count++ 
        already = true}
    });
    if(!already){
      cartItems.push({...product , count:1})
    }
    this.setState({cartItems})
    localStorage.setItem('cartItems',JSON.stringify(cartItems))
  }

  handleRemove = (id) => {
    const cartItems = [...this.state.cartItems]
    const filtered = cartItems.filter(cart => cart._id !== id )
    this.setState({
      cartItems : filtered
    })
    localStorage.setItem('cartItems',JSON.stringify(filtered))
  }
 
  // handleOrder = (order) => {
  //   alert(`${order.fullname} Your order is done`)
  // }

  render() {

    const {products , cartItems , size , sort} = this.state

    return (
      <div className="App">
          <nav className="navbar  navbar-dark bg-dark">
            <a className="navbar-brand" href="#">SHOPPING-CART</a>
            <a className='admin'>Admin</a>
          </nav>
          <main>
            <div className='content'>
              <div className='main'>
                <Filter 
                count={products.length}
                size={size}
                sort={sort}
                handlesort={this.handleSort}
                handlesize={this.handleSize}
                />
                <Products 
                products={products} 
                handleAdd={this.handleAddtoCart}
                />
              </div>
              <div className='sidebar'>
              <Cart 
              cartItems={cartItems}
              handleRemove={this.handleRemove}
              handleOrder={this.handleOrder}
              /> </div>
            </div>
          </main>
          {/* <footer>All Rights Reserved</footer> */}
      </div>
    );
  }
}

export default App;
