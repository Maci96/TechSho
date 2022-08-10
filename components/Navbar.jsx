import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import {Cart} from "./"
import {useStateContext} from "../context/state"
const Navbar = () => {
  const {showCart, setShowCart, totalQuantities} = useStateContext();
  const OnClickButton = () => {
    setShowCart(!showCart);
  };
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href={`/`} > JSM HeadPhones </Link>
      </p>
      <button type="button" className="cart-icon" onClick={OnClickButton}>
        <AiOutlineShopping />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>
      {showCart&&<Cart/>}
    </div>
  );
};

export default Navbar;
