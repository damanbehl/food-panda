import { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const hasItems = cartCtx.items.length > 0;
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const response = await fetch("DUMMY/orders.json", {
      method: "POST",
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      }),
    });
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  };

  // use of .bind in react to prepare f..n before it's execution ie. the handler is bind() to arguments
  //which have to be passed(we're making sure these args are passed to the f..n when that f..n is executed
  //or triggered)
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onToggle}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const modalContent = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onToggle} />
      )}
      {!isCheckout && modalActions}
    </>
  );
  const cartSubmitContent = (
    <>
      Order submitted successfuly
      <div className={classes.actions}>
        <button className="button" onClick={props.onToggle}>
          Close
        </button>
      </div>
    </>
  );
  const isSubmittingModalContent = <p>Order being submitted</p>;

  return (
    <Modal onClose={props.onToggle}>
      {!isSubmitting && !didSubmit && modalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && cartSubmitContent}
    </Modal>
  );
};

export default Cart;
