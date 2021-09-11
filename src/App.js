import React, {Suspense, lazy } from 'react';
import Load from './loading';
import UserMang from './view/UserMang';
import Cart from './view/Cart';
import TopBar from './components/Topbar'
import { Route, Switch} from "react-router-dom";
import './css/App.css';

const ProductCart = lazy(() => import('./view/ProductCart'));

function App() {
    return (
      <div className="wrapper">
        <TopBar />
        <div className="mainPanel">
          <div className="content">
            <Suspense fallback={<Load />}>
              <Switch>

                <Route path="/app/dashboard" component={ProductCart} />

                <Route path="/app/user" component={UserMang} />

                <Route path="/app/bill" component={Cart} />

              </Switch>
            </Suspense>
          </div>
        </div>
      </div>
    );
  
}
export default App;
