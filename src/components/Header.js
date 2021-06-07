import { useProfile } from "../context/profile.context";
import SignOutButton from "./SignOutButton";

const Header = () => {
    const { profile } = useProfile();
    


    return (
    <header>
            <h3>Map Editor</h3>
            {profile ? <SignOutButton /> : ""}
    </header>
     );
}
 
export default Header;