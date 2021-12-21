import React, {useEffect} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRouter } from './routes';
import { useAuth } from './hooks/authHook';
import { AuthContext } from './context/authContext';
import { SideNav } from './components/sidenav/SideNav';
import { NavBar } from './components/navbar/NavBar';
import { Loader } from './components/loader/Loader';
import 'materialize-css';
import { NavBarAdmin } from './components/nawBarAdmin/NavBarAdmin';
import { SideNavAdmin } from './components/sideNavAdmin/SideNavAdmin';

declare global {
  interface Window {
      M: any;
  }
}

const App: React.FC = () => {
  const { login, token, userId, logout, ready, adminId, loginAdmin, tokenAdmin } = useAuth();
  let isAuthenticated: boolean = !!token;
  const isAuthenticatedAdmin: boolean = !!tokenAdmin;
  const routes = useRouter(isAuthenticated, isAuthenticatedAdmin);

  useEffect(() => {
    window.M.AutoInit();
   });

  if(!ready) {
    return <Loader />
  }

  if (isAuthenticatedAdmin) {
    return (
      <AuthContext.Provider
        value={{ login, token, userId, logout, isAuthenticated, adminId, loginAdmin, isAuthenticatedAdmin, tokenAdmin }}>
        <Router>
          {isAuthenticatedAdmin && <NavBarAdmin />}
            <div className="row">
            {isAuthenticatedAdmin && <SideNavAdmin />}
              {routes}
          </div>
        </Router>
      </AuthContext.Provider>
    );
  } else if (isAuthenticated) {
    return (
      <AuthContext.Provider
        value={{ login, token, userId, logout, isAuthenticated, adminId, loginAdmin, isAuthenticatedAdmin, tokenAdmin }}>
        <Router>
          {isAuthenticated && <NavBar />}
            <div className="row">
            { isAuthenticated && <SideNav />}
              {routes}
          </div>
        </Router>
      </AuthContext.Provider>
    );
  } else {
    return (
      <AuthContext.Provider
        value={{ login, token, userId, logout, isAuthenticated, adminId, loginAdmin, isAuthenticatedAdmin, tokenAdmin }}>
        <Router>
            {routes}
        </Router>
      </AuthContext.Provider>
    );
  }
  
}

export default App;
