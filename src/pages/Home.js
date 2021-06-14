import { useEffect, useState } from 'react';
import FormNewWorld from '../components/FormNewWorld';
import Worlds from '../components/Worlds';
import { useProfile } from '../context/profile.context'
import { database } from '../misc/firebase';

const Home = () => {
  const {profile} = useProfile();
  const { name, uid, email, createdAt } = profile
  console.log(profile)
  const userWorlds = profile.worlds
  console.log(userWorlds)
  const [isLoading, setIsLoading] = useState(true);
  const [worlds, setWorlds] = useState([])

  const getWorlds = async () => {
        const userRef = await database.ref(`profiles/${profile.uid}/worlds`).get()
        const worlds = await userRef.val();
        

      setWorlds(worlds || [])
      setIsLoading(false)
      }
  useEffect(() => {
      
      
      getWorlds();
      return () => {
          // cleanup
      }
  }, [profile.uid])
  if (isLoading === true) {
      return <div>loading worlds..</div>
  }
  return (
      

      <div>
          <h1>Welcome, {name}</h1>
      <FormNewWorld reloadFunction={getWorlds}/>
          <Worlds worlds={worlds}/>
      </div>
      
  );
}
 
export default Home;