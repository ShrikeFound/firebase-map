import { auth } from "../misc/firebase";

const SignOutButton = () => {
  const handleSignOut = () => {
    auth.signOut();
  }
  return (
    <button onClick={handleSignOut}>
      Sign Out
    </button>
  );
}
 
export default SignOutButton;