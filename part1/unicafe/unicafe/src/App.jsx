import './App.css'
import { useState } from 'react'

const Button = ({ clickHandler, text }) => <button onClick={clickHandler}>{text}</button>
const DisplayTitle = ({ text }) => <h1>{text}</h1>
const DisplayStatistic = ({ text, quantity }) => <p>{text} - {Math.round(quantity*100)/100}</p>
const DisplayPercentage = ({ text, quantity }) => <p>{text} - {quantity.toFixed(2)} %</p>

const Statistics = ({clicks}) => {
  if(clicks.total===0){
    return (
      <p>Currently, there's no feedback given. Please click a button!</p>
    )
  }
  return (
    <>
    <DisplayTitle text='Statistics' />
    <DisplayStatistic text="Good" quantity={clicks.good} />
    <DisplayStatistic text="Neutral" quantity={clicks.neutral} />
    <DisplayStatistic text="Bad" quantity={clicks.bad} />
    <DisplayStatistic text="All" quantity={clicks.total} />
    <DisplayStatistic text="Average" quantity={clicks.average} />
    <DisplayPercentage text="Positive" quantity={clicks.positive} />
    </>
  )
  
} 

const App = () => {
  // save clicks of each button to its own state

  const [clicks, setClicks] = useState({
    good:0,
    neutral:0,
    bad:0,
    total:0,
    average:0,
    positive:0
  })
  
  const GoodHandler = () => {
    const uGood = clicks.good+1
    const uTotal = clicks.total+1  
    setClicks({
      ...clicks, 
      good:clicks.good+1,
      total:clicks.total+1,
      average:(uGood-clicks.bad)/uTotal,
      positive:uGood/uTotal*100
    })
  }

  const NeutralHandler = () => {
    const uTotal=clicks.total+1
    setClicks({
      ...clicks,
      neutral: clicks.neutral + 1,
      total:clicks.total+1,
      average:(clicks.good-clicks.bad)/uTotal,
      positive:clicks.good/uTotal*100
    })    
  } 

  const BadHandler = () => {
    const uBad = clicks.bad+1
    const uTotal = clicks.total+1    
    setClicks({
      ...clicks,
      bad:clicks.bad + 1,
      total:clicks.total+1,
      average:(clicks.good-uBad)/uTotal,
      positive:clicks.good/uTotal*100
    })
  }


  return (
    <div>
      <DisplayTitle text='Give Feedback' />
      <Button clickHandler={GoodHandler} text='Good' />
      <Button clickHandler={NeutralHandler} text='Neutral' />
      <Button clickHandler={BadHandler} text='Bad' />
      <Statistics clicks={clicks} />
    </div>
  )
}

export default App