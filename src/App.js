import React from 'react';
import {Route , Switch} from 'react-router';


import Main from './containers/Main';
import LayOut from './layOut/MainLayOut';



const App = () => {


    return (
      <div className="App">
        <LayOut>
          <main>
            <Switch>
              <Route exact path='/' component={Main}/>
            </Switch>
          </main>
        </LayOut>
      </div>
    );
  }

export default App;
