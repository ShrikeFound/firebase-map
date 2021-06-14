import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { database, storage } from "../misc/firebase";
import { v4 as uuid } from 'uuid'
import Map from "../components/Map";
const World = () => {
  const [world, setWorld] = useState(null);
  const [nodes, setNodes] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [drawMode,setDrawMode] = useState(false) 
  const imageRef = useRef();
  const {id} = useParams();
  console.log(world)
    
  const getWorld = async () => {
    const worldRef = await database.ref(`worlds/${id}`).get();
    const worldInfo = await worldRef.val();
    const nodesRef = await database.ref(`nodes/${id}`).get();
    const nodesInfo = await nodesRef.val();
    setWorld(worldInfo);
    setNodes(nodesInfo);
    setIsLoading(false);
  }

  useEffect(() => {

    getWorld();
  },[id])

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


  const toggleDrawMode = () => {
    if (drawMode === false) {
      setDrawMode(true)
    } else {
      setDrawMode(false)
    }
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
    <div className="container">
      <Map world={world} drawMode={drawMode} id={id} nodes={nodes} rerender={getWorld} />
      <h1>{world.name}</h1>
      
      <label htmlFor="worldMap">Map Image</label>
      <input id="worldMap" ref={imageRef}type="file" accept="image/*" />
      <button onClick={setImage}> Upload Image</button>
      <button onClick={toggleDrawMode}>{drawMode ? "View" : "Draw"}</button>

    </div>
   );

}
 
export default World;<div>Welcome to the world page</div>