import classes from "./Cart.module.css";
import Modal from "../UI/Modal";

const Cart = (props) => {
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {[{ id: "c1", name: "sushi", amount: 2, price: 12.99 }].map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );

  return (
      <Modal onClose={props.onToggle}>
        {cartItems}
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>35.62</span>
        </div>
        <div className={classes.actions}>
          <button className={classes["button--alt"]} onClick={props.onToggle}>
            Close
          </button>
          <button className={classes.button}>Order</button>
        </div>
      </Modal>
  );
};

export default Cart;
