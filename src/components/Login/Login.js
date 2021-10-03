import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// Should return the new state
// The 'state' argument is implied, and is guaranteed to be the last state snapshot
// The action argument, is what you pass-in as an argument when calling this function
const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  };
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  };
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    // You have to check 'isValid' on the action (rather than the state) here, because the state hasn't been updated yet
    return { value: action.val, isValid: action.val.trim().length > 6 };
  };
  if (action.type === 'INPUT_BLUR') {
    // Where as here, the state doesn't change, so you can check it on the state
    return { value: state.value, isValid: state.value.trim().length > 6 };
  };
  return { value: '', isValid: false };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  // useReducer arguments: (reducer function, initial state, initial function)
  // (the initial function parameter is optional, and not included here)
  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: null });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: null });

  // This is object destructuring
  // We could use 'const { isValid } = emailState;' to assign the 'emailState.isValid' value to the variable 'isValid'
  // However, when doing it as below, we assign the 'emailState.isValid;' value to the variable 'emailIsValid'
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(
        // It is ok to refer to these states here (while setting another state), because using them within useEffect, they will always have the latest state values
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value , passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
