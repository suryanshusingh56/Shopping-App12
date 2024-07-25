import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import store from '../store';
import { removeFromCart,decreseCartQuantity, addToCart, clearCart, getTotals } from '../reducers/cartReducer';

function CartScreen() {
  const cart = useSelector((state) => state.cart);
  const dispatch=useDispatch();
  const handleRemoveFromCart=(cartItem)=>{
        dispatch(removeFromCart(cartItem));
  }
  const handleDecreaseCart=(cartItem)=>{
    dispatch(decreseCartQuantity(cartItem));
  } 
  const handleIncreaseCart=(cartItem)=>{
    dispatch(addToCart(cartItem));
  } 
  const handleClearCart=()=>{
    dispatch(clearCart());
  }
  // store.dispatch(getTotals);
  useEffect(()=>{
    dispatch(getTotals());
  },[cart]);
  return (
    <div className='cart-container'>
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is currently empty</p>
          <div className="start-shopping">
            <Link to="/">
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="titles">
            <div className='product-title-div'>
              <h3 className="product-title">Product</h3>
            </div>
            <div>
              <h3 className="price">Price</h3>
            </div>
            <div>
              <h3 className="Quantity">Quantity</h3>
            </div>
            <div>
              <h3 className="total">Total</h3>
            </div>
          </div>
          <div className="cart-items">
            {cart.cartItems?.map(cartItem => (
              <div className="cart-item" key={cartItem.id}>
                <div className="cart-product">
                  <img src={cartItem.image} alt={cartItem.name} />

                  <div className='product-detail'>
                    <h3>{cartItem.name}</h3>
                    <h3>{cartItem.description}</h3>
                    <button onClick={()=>handleRemoveFromCart(cartItem)}>Remove</button>
                  </div>
                  <div className="cart-product-price">${cartItem.price}</div>
                  <div className="cart-product-quantity">
                    <div className='xyz'>
                      <button onClick={()=>handleDecreaseCart(cartItem)}>-</button>
                      <div className="count">{cartItem.cartQuantity}</div>
                      <button onClick={()=>handleIncreaseCart(cartItem)}>+</button>
                    </div>
                    <div className="cart-product-total-price">
                      ${cartItem.price * cartItem.cartQuantity}
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button className="clear-cart" onClick={()=>handleClearCart()}>Clear Cart</button>
            <div className="cart-checkout">
              <span>Total</span>
              <span className="amount">${cart.cartTotalAmount}</span>
              <p>Taxes and shipping calculated at checkout</p>
              <button>CheckOut</button>
              <div className="continue-shopping">
                <Link to="/">
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CartScreen
