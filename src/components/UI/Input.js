import React from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* <input id={props.input.id} {...props.input} /> */}
      {/* If you look careully line 7 and 9 are the same id gets spread */}
      <input ref={ref} {...props.input} />
    </div>
  );
});
export default Input;
