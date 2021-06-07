import './styles/global.scss'
import {Switch} from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/Signin'
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { ProfileProvider } from './context/profile.context';
function App() {
  return (
    <ProfileProvider>
    <Switch>
      <PrivateRoute exact path = "/">
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
