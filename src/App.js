import { Fragment,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import {sendCartData, fetchCartData} from './store/cart-actions';


//for detece sending request to firebase for the first time we reload the app
let inInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  //listen for changes in cart and send http requests
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector((state) =>state.ui.notification);


  //useeffent for etching data
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);


  useEffect(() => {
    
    if(inInitial){
      inInitial=false;
      return;
    }
    if(cart.changed)
    {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

    return (
      <Fragment>
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
        <Layout>
          {showCart && <Cart />}
          <Products />
        </Layout>
      </Fragment>
    );
}

export default App;
