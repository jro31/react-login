import React, { useRef, useEffect } from 'react';

import classes from './Input.module.css';

const Input = (props) => {
  const inputRef = useRef();

  useEffect(() => {
    // As useEffect is only called after everything else loads, the 'inputRef' will be the last input to load, which is the password
    // This function will then 'focus' on the password input (make it the focus of the page, where the cursor is)
    // (as we don't include any dependencies, this will only happen on page load)
    inputRef.current.focus();
  }, []);

  return (
    <div
      className={`${classes.control} ${
        props.isValid === false ? classes.invalid : ''
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        ref={inputRef}
        type={props.type}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
    </div>
  );
};

export default Input;
