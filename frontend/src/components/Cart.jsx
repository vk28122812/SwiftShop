import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart);
  
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `₹${totalPrice.toFixed(2)}`;
  function handleUpdate(id, name,amount ){
    dispatch(cartActions.updateItemQuantity({id,name,amount}))
  }

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `₹ ${item.price.toFixed(2)}`;
            return (
              <li key={item.id}>
                <div>
                  <span>{item.title}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => handleUpdate(item.id,item.title,item.quantity-1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleUpdate(item.id,item.title, item.quantity+1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
