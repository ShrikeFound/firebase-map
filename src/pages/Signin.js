import { auth, database } from "../misc/firebase";
import firebase from 'firebase/app'
const Signin = () => {

    const handleGoogleLogin = async () =>{

        try{
            const {additionalUserInfo,user} = await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

            if (additionalUserInfo.isNewUser){
                await database.ref(`profiles/${user.uid}`).set({
                    name: user.displayName,
                    createdAt: firebase.database.ServerValue.TIMESTAMP
                })
            }


        }catch(err){
            console.log(err.message)
        }
    }

    const handleDemoLogin = async () =>{

        try{
            const { additionalUserInfo, user } = await auth.signInWithEmailAndPassword("demo@mail.com", "gWOQ2S3JfVgg");
        }catch(err){
            console.log(err.message)
        }
    }


    return (  
    <div>
        <h2>Log In</h2>
        <button onClick={handleGoogleLogin}>Continue with Google</button>
        <button onClick={handleDemoLogin}>Continue with our Demo Account</button>
    </div>
    );
}
 
export default Signin;