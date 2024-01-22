  
import TimeDisplay from './TimeDisplay'
import CoverRow from './CoverRow'

import './App.css'
import { useEffect, useState } from 'react'
import { useMeasure } from 'react-use'

function App() {
  const [bigImage, { height, width, top, left }] = useMeasure();
  const [rowArray, setRowArray] = useState(Array(20).fill(0).map(()=>Array(30).fill("opaque-tile")))
  const [time, setTime] = useState(100)
  // const [imgSize, setImgSize] = useState([])

   function randomIndex(length) {
    return Math.floor(Math.random() * length);
  }
  
  //get the parent array
   function getRandomRow() {
    // filter out any rows with no trues
    const rowIndexArray = rowArray
      .map((item, index) => {
        if (item.includes("opaque-tile")) {
          return index;
        }
      })
      .filter((item) => item !== undefined);
    // pick a random row
    return rowIndexArray[randomIndex(rowIndexArray.length)];
  }
  
   function getRandomCell(randomRowIndex) {
    const tempRow = rowArray[randomRowIndex];
    // filter out any cells with no trues
    const cellIndexArray = tempRow
      .map((item, index) => {
        if (item === "opaque-tile") {
          return index;
        }
      })
      .filter((item) => item !== undefined);
    // pick a random cell
    return cellIndexArray[randomIndex(cellIndexArray.length)];
  }
  
   function transparentCell (){
    const tempArray = [...rowArray];
    const row = getRandomRow();
    const cell  = getRandomCell(row)
    tempArray[row][cell] = 'transparent-tile';
    setRowArray([...tempArray]);
  }

  useEffect(() => {
    let myInterval;
    if (time > 0) {
      myInterval = setInterval(() => {
      setTime(time - 1);
      transparentCell ()}, 1000)
      // make an opaque tile transparent

    }
    return ()=>clearInterval(myInterval) 
  }
  , [time]);
  
  // set size of cover container
  const coverStyle = {
    height: height + "px",
    width: width + "px",
    top: top + 'px',
    left: top + 'px'
  }

  return (
    <>
      <TimeDisplay time = {time}/>
      <img ref={bigImage} className="big-image" src="coffee1.jpg" alt="cup of coffee" />
      {console.log({height, width, top, left})}
        <div className = "cover-container">
          {rowArray.map((item, index) => (
              <CoverRow key={"cr" + index} opaque={item} row = {rowArray[index]} array = {item} />
            ))}
      </div>
    </>
  )
}

export default App
