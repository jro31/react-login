import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false
}); // This sets the default state

export default AuthContext;
