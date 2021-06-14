import { database } from "../misc/firebase";

const Map = ({ world, drawMode,id,nodes,rerender }) => {
  // console.log("map world", world)
    // console.log(nodes)
  
  const alertNode = () => {
    console.log("node clicked!");
  }
  
  const createNode = async (e) => {
    if (drawMode === true) {
      console.log("drawing!");
      const svg = document.getElementById('svg-map')
      const point = svg.createSVGPoint();
      point.x = e.clientX
      point.y = e.clientY
      const svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());


      const newNodeRef = await database.ref(`nodes/${id}`).push();
      const newNode = await newNodeRef.set({
        coordinateX: svgPoint.x,
        coordinateY: svgPoint.y
      });
      rerender();
    } else {
      //do nothing :)
    }

  }
        const nodeElements = Object.keys(nodes).map((k) => {
        console.log("node element",nodes[k])
          return <circle className="svg-node" cx={nodes[k].coordinateX} cy={nodes[k].coordinateY} r="50" onClick={alertNode}/>
      })

  return (
    <div className="map-container">
    
      <svg
        id="svg-map"
        className="svg-map"
        viewBox="0 0 1080 1920"
        preserveAspectRatio="xMidYMid meet">
        <image onClick={(e) => createNode(e)} href={world.mapImageURL} />
        {nodeElements}
      </svg>
    </div>
  );
}
 
export default Map;