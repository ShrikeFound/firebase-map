import './styles/global.scss'
import {Switch} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { ProfileProvider } from './context/profile.context';
import Header from './components/Header';
import World from './pages/World';
function App() {
  return (
    <ProfileProvider>
      <Header/>
      <Switch>
        <PrivateRoute path = "/worlds/:id">
          <World/>
        </PrivateRoute>
        <PrivateRoute exact path="/">
          <Home/>
        </PrivateRoute>
        <PrivateRoute path = "/worlds">
          <Home/>
        </PrivateRoute>
        
        <PublicRoute path="/signin">
          <Signin/>
        </PublicRoute>

      </Switch>
    </ProfileProvider>
  );
}

export default App;
