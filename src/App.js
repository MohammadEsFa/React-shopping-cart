import React , {useState} from 'react';
import Cart from './components/Cart';

import Filter from './components/Filter';
import Products from './components/Products';
import data from './data.json'



const App = () => {

  
  const [products , setProducts] = useState(data.products)
  const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[])
  const [size , setSize] = useState("")
  const [sort , setSort] = useState("")
  
  

  const handleSort = (event) => {
    const sort = event.target.value
    const myproducts = [...data.products]
      setSort(sort)
      setProducts(
          myproducts.sort((a,b)=>(
          sort === 'Lowset' ?
          ((a.price > b.price) ? 1:-1):
          sort === 'Highest' ?
          ((a.price < b.price) ? 1:-1):
          ((a._id > b._id) ? 1:-1)
        ))
      ) 
    }

  
  const handleSize = (event) => {
    if(event.target.value === ""){
      setSize(event.target.value)
      setProducts(data.products) 
    }else {
      setSize(event.target.value)
      const sized = data.products.filter(product => {return product.availableSizes.indexOf(event.target.value) >= 0})
      setProducts(sized)
    }
  }

  const handleAddtoCart = (product) => {
    const cartitems = [...cartItems]
    let already = false
    cartitems.map(item => {
      if(item._id === product._id){
        item.count++ 
        already = true}
    });
    if(!already){
      cartitems.push({...product , count:1})
    }
    setCartItems(cartitems)
    localStorage.setItem('cartItems',JSON.stringify(cartitems))
  }

  const handleRemove = (id) => {
    const cartitems = [...cartItems]
    const filtered = cartitems.filter(cart => cart._id !== id )
    setCartItems(filtered)
    localStorage.setItem('cartItems',JSON.stringify(filtered))
  }


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
                handlesort={handleSort}
                handlesize={handleSize}
                />
                <Products 
                products={products} 
                handleAdd={handleAddtoCart}
                />
              </div>
              <div className='sidebar'>
              <Cart 
              cartItems={cartItems}
              handleRemove={handleRemove}
              /> </div>
            </div>
          </main>
      </div>
    );
  }

export default App;
