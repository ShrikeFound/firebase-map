import { useRef, useState } from "react";
import { useProfile } from "../context/profile.context";
import { database, storage } from "../misc/firebase";
import { v4 as uuid } from 'uuid'
const FormNewWorld = () => {
  const { profile } = useProfile();
  const [formData, setFormData] = useState({ name: "", mapWidth: 0, mapHeight: 0, user_id: profile.uid });
  
  const setValue = (e) => {
    let data = { ...formData }
    data[e.target.name] = e.target.value
    setFormData(data)
  }
 
  // const setImage = async (e) => {
  //   const file = e.target.files[0]
  //   let newformData = { ...formData }
  //   const id = uuid();
  //   const storageRef = storage.ref();
  //   const imagesRef = storageRef.child('images').child(id);
  //   await imagesRef.put(file)
  //   const imageURL = await imagesRef.getDownloadURL();
  //   newformData["imageURL"] = imageURL
  //   setFormData(newformData)
  //   console.log(newformData)
  // }

  const createWorld = async (e) => {

    e.preventDefault();
    
    const newWorldRef = await database.ref(`worlds`).push();
    newWorldRef.set(formData)
    const userRef = await database.ref(`profiles/${profile.uid}/worlds`)
    userRef.child(newWorldRef.key).set({name: formData.name})
  }



  return (
    <form onSubmit={(e) => createWorld(e)}>
      <input type="text" name="name" value={formData.name} onChange={(e)=> setValue(e)} />
      {/* <input type="number" name="mapWidth"  value={formData.mapWidth} onChange={(e)=> setValue(e)}/>
      <input type="number" name="mapHeight" value={formData.mapHeight} onChange={(e) => setValue(e)} /> */}
      {/* <input type="file"  accept="image/*" name="mapImage"  onChange={(e) => setImage(e)} /> */}
      <input type="submit" value="submit"/>
    </form>
  );
}
 
export default FormNewWorld;