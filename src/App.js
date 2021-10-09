import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const ctx = useContext(AuthContext);

  // You must wrap all components that need to access the AuthContext with the <AuthContext.Provider> tag
  // In this example, you'r e wrapping every component, so it'll be available everywhere, but you could also, for example, just wrap the <MainHeader> component, if that's the only place it's needed
  // All descendents (children, grand-children etc) of wrapped components will have access to AuthContext as a result
  // We use <AuthContext.Provider> because AuthContext is not a component. Adding the '.Provider' makes it a component
  // We shouldn't use context to pass props that are used only by direct children (hence still passing the 'loginHandler' and 'logoutHander' in props)
  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;
