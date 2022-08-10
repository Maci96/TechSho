import React, { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { useStateContext } from "../context/state";
import { urlFor } from "../lib/client";
import { TiDeleteOutline } from "react-icons/ti";
import getStripe from "../lib/getStripe";
import toast from "react-hot-toast";
const Cart = () => {
  const cartRef = useRef();
  const {
    qty,
    incQty,
    decQty,
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    showCart,
    toggleCartItemQuantity,
    deleteItemFromCart,
  } = useStateContext();
  const handlecheckout = async () => {
    
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems: cartItems }),
    });

    if (response.statusCode === 500) return;
    const data = await response.json();

    toast.loading("Redirecting...");
  
    window.location.href=data.url;
    
    //  getStripe().then((stripe=>stripe.redirectToCheckout({lineItems : data.line_items, sessionId:data.id}))).catch(err=>console.log(err))
    
  };
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button onClick={() => setShowCart(!showCart)} className="cart-heading">
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your Shopping Bag is Empty</h3>
            <Link href="/">
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setShowCart(false);
                }}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length >= 1 &&
            cartItems.map((item, index) => (
              <div className="product" key={item._id}>
                <img
                  className="cart-product-image"
                  src={urlFor(item?.image[0])}
                />
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span
                          className="minus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "dec")
                          }
                        >
                          <AiOutlineMinus />
                        </span>
                        <span className="num">{item.quantity}</span>
                        <span
                          className="plus"
                          onClick={() =>
                            toggleCartItemQuantity(item._id, "inc")
                          }
                        >
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button
                      className="remove-item"
                      onClick={() => deleteItemFromCart(item)}
                      type="button"
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal : </h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button type="button" onClick={handlecheckout} className="btn">
                Pay With Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
