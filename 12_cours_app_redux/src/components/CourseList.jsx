import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CourseItem from './CourseItem';
import {clearCart} from '../control/cartSlice';


function CourseList() {
   // dispatch metodu slider metoduna erişmek için kullanılır
    const dispatch = useDispatch();
    // 
    const { cartItems, quantity, total } = useSelector((state) => state.cart);
  return (
    <>
      {quantity < 1 ? (
        <section className="cart">
          <header>
            <h2>Sepetim</h2>
            <h4>bomboş</h4>
          </header>
        </section>
      ) : (
        <section className="cart">
          <header>
            <h2>Sepetim</h2>
          </header>
          <div>
            {cartItems.map((item) => {
              return <CourseItem key={item.id} {...item} />;
            })}
          </div>
          <footer>
            <hr />
            <div>
              <h4>
                Toplam Tutar <span>{total} TL</span>
              </h4>
            </div>
            <button
              className="cartClearButton"
              onClick={() => dispatch(clearCart())}
            >
              Temizle
            </button>
          </footer>
        </section>
      )}
    </>
  )
}

export default CourseList