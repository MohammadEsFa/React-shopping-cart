//feature 1
import React , {Component} from 'react';

import Filter from './components/Filter';
import Products from './components/Products';
import data from './data.json'

class App extends Component {

  constructor () {
    super()
    this.state = {
      products : data.products,
      size : "",
      sort : ""
    }
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
 

  render() {

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
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                handlesort={this.handleSort}
                handlesize={this.handleSize}
                />
                <Products products={this.state.products}/>
              </div>
              <div className='sidebar'>Cart Items </div>
            </div>
          </main>
          <footer>All Rights Reserved</footer>
      </div>
    );
  }
}

export default App;
