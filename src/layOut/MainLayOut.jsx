import React from 'react';

const LayOut = ({children}) => {
    return ( 
        <div>
          <nav className="navbar  navbar-dark bg-dark">
            <a className="navbar-brand" href="#">SHOPPING-CART</a>
          </nav>
          {children}
          <div class="footer">
            <p>All Rights Reserved</p>
           </div>
        </div>
     );
}
 
export default LayOut;