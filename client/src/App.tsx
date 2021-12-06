import React, {useEffect} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useRouter } from './routes';
import { useAuth } from './hooks/authHook';
import { AuthContext } from './context/authContext';
import { SideNav } from './components/sidenav/SideNav';
import { NavBar } from './components/navbar/NavBar';
import { Loader } from './components/loader/Loader';
import 'materialize-css';

declare global {
  interface Window {
      M: any;
  }
}

const App: React.FC = () => {
  const { login, token, userId, logout, ready } = useAuth();
  const isAuthenticated: boolean = !!token;
  const routes = useRouter(isAuthenticated);
  useEffect(() => {
    window.M.AutoInit();
   });

  if(!ready) {
    return <Loader />
  }
  return (
    <AuthContext.Provider
      value={{ login, token, userId, logout, isAuthenticated }}>
      <Router>
        { isAuthenticated && <NavBar />}
          <div className="row">
          { isAuthenticated && <SideNav /> }
          {/* <div className="col s12 m8 l9"> */}
            {routes}
          {/* </div> */}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
