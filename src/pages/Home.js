import { useProfile } from '../context/profile.context'

const Home = () => {
    const {profile} = useProfile();
    const {name,uid,email,createdAt} = profile
    return ( 
    <div>
        <h1>Welcome, {name}</h1>

    </div> 
    );
}
 
export default Home;