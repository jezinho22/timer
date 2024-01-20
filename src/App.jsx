  
import Picture from './Picture'
import CoverCell from './CoverCell'
import './App.css'
import { useEffect, useState } from 'react'
import TimeDisplay from './TimeDisplay'

function App() {
  const [array, setArray] = useState(Array(10).fill("opaque-tile"))
  const [time, setTime] = useState(10)
// create components to be a row of cells in a div
// render multiple rows and use stretch
 
  function randomArrayPosition () {
    // create array of indices of an opaque in array
    const indexArray = array.map((item, index) => {
      if (item === "opaque-tile"){
        return index
      }}).filter((item) => item)
    // create a random index number based on indexArray
    const randomIndex =  Math.floor(Math.random() * indexArray.length);
    // return the randomly chosen index of an opaque
    return (indexArray[randomIndex])
  }

  useEffect(() => {
    let myInterval;
    if (time > 0) {
      myInterval = setInterval(() => {
      setTime(time - 1)}, 1000)
      // make an opaque tile transparent
      let tempArray = [...array]
      tempArray[randomArrayPosition()] = "transparent-tile";
      setArray([...tempArray])
      console.log(array)
    }
    return ()=>clearInterval(myInterval) 
  }
  , [time]);
  

  return (
    <>
      <TimeDisplay time = {time}/>
      <Picture/>
      <div className = "cover-container">
      {array.map((item, index) => (
          <CoverCell key={"cover" + index} opaque={item} />
        ))}
      </div>
    </>
  )
}

export default App
