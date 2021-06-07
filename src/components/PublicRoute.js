import {Route,Redirect} from 'react-router-dom'
import { useProfile } from '../context/profile.context';
const PublicRoute = ({children,...rest}) => {
    console.log("public route:")
    const {profile,isLoading} = useProfile();
    console.log(profile)
    console.log(isLoading)
    if (isLoading && !profile){
        return <div>loading...</div>
    }else if(profile && !isLoading){
        return <Redirect to="/"/>
    }
    return (
    <Route {...rest}>
        {children}
    </Route>
    );
}
 
export default PublicRoute;