import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [formsInputValidity, setFormsInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });
  const [isSubmitError, setIsSubmitError] = useState();
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const nameInputValue = nameInputRef.current.value;
    const streetInputValue = streetInputRef.current.value;
    const postalCodeInputValue = postalCodeInputRef.current.value;
    const cityInputValue = cityInputRef.current.value;

    const nameIsValid = !isEmpty(nameInputValue);
    const streetValIsValid = !isEmpty(streetInputValue);
    const postalCodeValIsValid = isFiveChars(postalCodeInputValue);
    const cityValIsValid = !isEmpty(cityInputValue);

    setFormsInputValidity({
      name: nameIsValid,
      street: streetValIsValid,
      city: cityValIsValid,
      postalCode: postalCodeValIsValid,
    });
    const formIsValid =
      nameIsValid && streetValIsValid && postalCodeValIsValid && cityValIsValid;
    if (!formIsValid) {
      return;
    }
    try {
      props.onConfirm({
        name: nameInputValue,
        street: streetInputValue,
        postalCode: postalCodeInputValue,
        city: cityInputValue,
      });
    } catch (error) {
      setIsSubmitError(error.message);
    }
  };

  if (isSubmitError) {
    return (
      <section className={classes.SubmitError}>
        <p>{isSubmitError}</p>
      </section>
    );
  }

  const nameControlClasses = `${classes.control} ${
    formsInputValidity.name ? "" : classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    formsInputValidity.street ? "" : classes.invalid
  }`;
  const postalControlClasses = `${classes.control} ${
    formsInputValidity.postalCode ? "" : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formsInputValidity.city ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formsInputValidity.name && <p>Name cannot be empty</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formsInputValidity.street && <p>Street cannot be valid</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formsInputValidity.postalCode && (
          <p>Postal code has to be 5 char long</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formsInputValidity.city && <p>City cannot be empty</p>}
      </div>
      <div className={classes.actions}>
        <button className={classes.submit}>Confirm</button>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Checkout;
