import { Link } from "react-router-dom";

const Worlds = ({ worlds }) => {
  return (
    <ul>
    {
      Object.keys(worlds).map((key) => {
        return <li key={key} ><Link to={`/worlds/${key}`}className="world-thumbnail">{worlds[key]["name"]}</Link></li>
      })

      
    }
  </ul> );
}
 
export default Worlds;