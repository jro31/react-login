import React, { useRef, useImperativeHandle } from 'react';

import classes from './Input.module.css';

// In 99.9% of cases you will only ever need the props argument
// However, you can accept a second 'ref' argument, which is a ref if a ref is set
// (which is happening when Input is called in the Login.js component)
// To accept this second 'ref' argument, you also need to use 'React.forwardRef'
// This then binds the 'Input' component to a ref
// The only thing that you will be able to use with this ref is what you expose through 'useImperativeHandle()' - in this case just 'focus'
// This is what allows us to use 'emailInputRef.current.focus();' and 'passwordInputRef.current.focus();' in the 'Login.js' component
const Input = React.forwardRef((props, ref) => {
  const inputRef = useRef();

  const activate = () => {
    inputRef.current.focus();
  };

  // This is a hook that you will (and should) use very rarely
  // The second parameter is a function that should return an object
  // That object should contain all the data that you'll be able to use outside
  // (it exposes a function here, but can also expose values)
  useImperativeHandle(ref, () => {
    return {
      focus: activate, // This points at the 'activate' function above, called with the alias 'focus'
    }
  });

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
});

export default Input;
