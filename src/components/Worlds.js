import { Link } from "react-router-dom";

const Worlds = ({ worlds }) => {
  return (
    <div>
    {
      Object.keys(worlds).map((key) => {
        return <Link to={`/worlds/${key}`}key={key}>{worlds[key]["name"]}</Link>
      })

      
    }
  </div> );
}
 
export default Worlds;