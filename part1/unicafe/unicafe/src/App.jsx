import './App.css'
import { useState } from 'react'

const Button = ({clickHandler,text}) => <button onClick={clickHandler}>{text}</button>
const DisplayTitle = ({text}) => <h1>{text}</h1>
const DisplayStatistic = ({text,quantity}) => <p>{text} - {quantity}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const GoodHandler = () => setGood(good+1)
  const NeutralHandler = () => setNeutral(neutral+1)
  const BadHandler = () => setBad(bad+1)

  return (
    <div>
      <DisplayTitle text='Give Feedback'/>
      <Button clickHandler={GoodHandler} text='Good'/>
      <Button clickHandler={NeutralHandler} text='Neutral'/>
      <Button clickHandler={BadHandler} text='Bad'/>
      <DisplayTitle text ='Statistics'/>
      <DisplayStatistic text = "Good" quantity={good}/>
      <DisplayStatistic text = "Neutral" quantity={neutral}/>
      <DisplayStatistic text = "Bad" quantity={bad}/>
    </div>
  )
}

export default App