import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { database, storage } from "../misc/firebase";
import { v4 as uuid } from 'uuid'
const World = () => {
  const [world, setWorld] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef();
  const {id} = useParams();
  console.log(world)
  useEffect(() =>{
    const getWorld = async () =>{
      const worldRef = await database.ref(`worlds/${id}`).get();
      const worldInfo = await worldRef.val();
      
      setWorld(worldInfo);
      setIsLoading(false);
    }
    getWorld();
  },[])

    const setImage = async () => {
    const file = imageRef.current.files[0]
    console.log(file)
    // const file = e.target.files[0]
    const imageId = uuid();
    const storageRef = storage.ref();
    const imagesRef = storageRef.child('images').child(imageId);
    await imagesRef.put(file)
    const imageURL = await imagesRef.getDownloadURL();
    var updates = {};
    updates[`worlds/${id}/mapImageURL`] = imageURL
    database.ref().update(updates);
    const worldRef = await database.ref(`worlds/${id}`).get();
    const worldInfo = await worldRef.val();
      
    setWorld(worldInfo);
  }



  if(isLoading){
    return (
      <div>
        Loading...
      </div>
    )
  }else if (!isLoading && !world){
    return(<div>
      There was an error finding your world.
    </div>)
  }

  return ( 
    <div>
      <h1>{world.name}</h1>
      
      <label htmlFor="worldMap">Map Image</label>
      <input id="worldMap" ref={imageRef}type="file" accept="image/*" />
      {
      world.mapImageURL ? <img src={world.mapImageURL}/>: "Please upload an Image"
      }
      <button onClick={setImage}> Upload Image</button>
    </div>
   );

}
 
export default World;<div>Welcome to the world page</div>