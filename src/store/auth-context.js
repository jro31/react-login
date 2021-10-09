import React, { useState, useEffect  } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {}, // Adding this here is good practice (even though it never gets used) because you'll get 'onLogout' suggested by VS Code
  onLogin: (email, password) => {},
}); // This sets the default state

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    };
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  }

  return <AuthContext.Provider value={{
    isLoggedIn: isLoggedIn,
    onLogout: logoutHandler,
    onLogin: loginHandler,
  }}>
    {props.children}
  </AuthContext.Provider>
};

export default AuthContext;
