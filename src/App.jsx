  
import TimeDisplay from './TimeDisplay'
import CoverRow from './CoverRow'
import TimeForm from './TimeForm'

import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [rowArray, setRowArray] = useState([])
  const [time, setTime] = useState(0)
  const [form, setForm] = useState({mins:'', secs:''})
  const [steps, setSteps] = useState([])

  // manage form
function handleChange(event){
  setForm({...form, [event.target.name] : event.target.value})
}

function handleSubmit (event){
  event.preventDefault();
  const duration = (form.mins * 60)
  setRowArray(Array(duration/30).fill(0).map(()=>Array(30).fill("opaque-tile")))
  setTime(duration)
  accelerate(duration)
}

function randomIndex(length) {
  return Math.floor(Math.random() * length);
}

function transparentCell (){
  const tempArray = [...rowArray];
  const row = getRandomRow();
  const cell  = getRandomCell(row)
  tempArray[row][cell] = 'transparent-tile';
  setRowArray([...tempArray]);
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

  const accelerations = [{interval: 50, duration:5}, {interval: 125, duration:5}, {interval: 250, duration:5}, {interval: 500,  duration:30},
                         {interval: 500,  duration:30}, {interval: 1000, duration:135}, {interval: 2000,  duration:240}, {interval:5000, duration:300}]
  
  function accelerate (totalSecs){
    let cumulativeSteps = 0;
    accelerations.forEach((step)=> {
      // compare total secs with steps
      if (totalSecs < cumulativeSteps + step.duration){
          setSteps([...steps, {...step, duration: (cumulativeSteps + step) - totalSecs}])
        } else {
          setSteps([...steps, step])
        }
    })
  }


  useEffect(() => {
    // if(time>0){
    // let myInterval;
    // steps.forEach((step)=>{
    //   myInterval = setInterval(() => {
    // })
    // if (time > 0) {
    //   setTime(time - 1);
    //   transparentCell ()}, 50)
    //   // make a trasnparent tile opaque

    // }

    let myInterval;
    if (time > 0) {
      myInterval = setInterval(() => {
      setTime(time - 1);
      transparentCell ()}, 1000)
      // make a trasnparent tile opaque

    }
    return ()=>clearInterval(myInterval) 
  }
  , [time]);
  

  return (
    <>
    

    <div className="img-container">
      <div className="image">
        <img className="big-image" src="coffee2.jpg" alt="cup of coffee" />
      </div>
      <div className = "cover-container">
          {rowArray.map((item, index) => (
              <CoverRow key={"cr" + index} opaque={item} row = {rowArray[index]} array = {item} />
            ))}
      </div>
      <div className="time-display">
            <TimeDisplay time = {time}/>
            <TimeForm form={form} handleSubmit={handleSubmit} handleChange={handleChange}/>
      </div>
    </div>

    </>
  )
}

export default App
