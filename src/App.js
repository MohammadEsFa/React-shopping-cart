//feature 1
import React , {Component} from 'react';

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
