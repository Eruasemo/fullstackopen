import './App.css'
import { useState } from 'react'

const Button = ({ clickHandler, text }) => <button onClick={clickHandler}>{text}</button>
const DisplayTitle = ({ text }) => <h1>{text}</h1>
const DisplayStatistic = ({ text, quantity }) => <p>{text} - {quantity}</p>
const DisplayPercentage = ({ text, quantity }) => <p>{text} - {quantity.toFixed(2)} %</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)  
  const [average,setAverage]=useState(0)
  const[positive,setPositive]=useState(0)
  
  const GoodHandler = () => {
    setGood(good + 1)
    setTotal(total + 1) 
    const uGood = good+1
    const uTotal = total+1   
    setAverage((uGood-bad)/uTotal)
    setPositive(uGood/uTotal)
  }
  const NeutralHandler = () => {
    setNeutral(neutral + 1)
    setTotal(total+1)
    const uTotal=total+1
    setAverage((good-bad)/uTotal)
    setPositive(good/uTotal)    
  } 
  const BadHandler = () => {
    setBad(bad + 1)
    setTotal(total+1)
    const uBad = bad+1
    const uTotal = total+1    
    setAverage((good-uBad)/uTotal)
    setPositive(good/uTotal)
  }


  return (
    <div>
      <DisplayTitle text='Give Feedback' />
      <Button clickHandler={GoodHandler} text='Good' />
      <Button clickHandler={NeutralHandler} text='Neutral' />
      <Button clickHandler={BadHandler} text='Bad' />
      <DisplayTitle text='Statistics' />
      <DisplayStatistic text="Good" quantity={good} />
      <DisplayStatistic text="Neutral" quantity={neutral} />
      <DisplayStatistic text="Bad" quantity={bad} />
      <DisplayStatistic text="All" quantity={total} />
      <DisplayPercentage text="Average" quantity={average} />
      <DisplayPercentage text="Positive" quantity={positive} />
    </div>
  )
}

export default App