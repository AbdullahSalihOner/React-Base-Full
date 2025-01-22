import React from 'react'
import { useSelector } from 'react-redux';
import { BsFillBasketFill } from "react-icons/bs";

function Navbar() {
    // slider da ki değerleri almak için kullanılır
    const { quantity} = useSelector((state) => state.cart);
    console.log(useSelector((store) => store.cart));

  return (
    <nav>
    <div className="navbar">
      <h3>Kurs Uygulamaması</h3>
      <div className="navDiv">
        <div className="itemsDiv">
          <p>{quantity}</p>
        </div>
        <BsFillBasketFill className="itemsIcon" />
      </div>
    </div>
  </nav>
  )
}

export default Navbar;