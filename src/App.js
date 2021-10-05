import React, { useState, useEffect  } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // This funtion will always run when the component is first rendered, AFTER the rest of the component is evaluated
    // After this, it will only run when the dependencies (the second argument) change
    // As there are no dependencies here (an empty array), it will not run again, even if the component is re-evaluated
    // As the state 'isLoggedIn' is updated within this function, is causes the component function to run again BUT this code (within useEffect) will not be re-run because its dependencies were not updated

    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    };
  }, []);

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  // You must wrap all components that need to access the AuthContext with the <AuthContext.Provider> tag
  // In this example, you'r e wrapping every component, so it'll be available everywhere, but you could also, for example, just wrap the <MainHeader> component, if that's the only place it's needed
  // All descendents (children, grand-children etc) of wrapped components will have access to AuthContext as a result
  // We use <AuthContext.Provider> because AuthContext is not a component. Adding the '.Provider' makes it a component
  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn}}>
      <MainHeader onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
