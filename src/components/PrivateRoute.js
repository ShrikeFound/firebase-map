import { useContext } from 'react'
import {Route,Redirect} from 'react-router-dom'
import { useProfile } from '../context/profile.context'
const PrivateRoute = ({ children, ...rest }) => {
    
    const {profile,isLoading} = useProfile();
    
    if (isLoading && !profile) {
        return <div>loading...</div>

    }
    else if (!profile && !isLoading) {
        return <Redirect to="/signin"/>
    }
    return (
    <Route {...rest}>
        {children}
    </Route>
    );
}
 
export default PrivateRoute;