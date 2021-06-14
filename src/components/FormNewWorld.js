import { useRef, useState } from "react";
import { useProfile } from "../context/profile.context";
import { database, storage } from "../misc/firebase";
import { v4 as uuid } from 'uuid'
const FormNewWorld = ({ reloadFunction }) => {
  const { profile } = useProfile();
  const defaultFormData = { name: "", mapWidth: 0, mapHeight: 0, user_id: profile.uid }
  const [formData, setFormData] = useState(defaultFormData);
  
  const setValue = (e) => {
    let data = { ...formData }
    data[e.target.name] = e.target.value
    setFormData(data)
  }

  const createWorld = async (e) => {

    e.preventDefault();
    console.log("submitting")
    const newWorldRef = await database.ref(`worlds`).push();
    newWorldRef.set(formData)
    const userRef = await database.ref(`profiles/${profile.uid}/worlds`)
    userRef.child(newWorldRef.key).set({ name: formData.name })
    setFormData(defaultFormData)
    reloadFunction();
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