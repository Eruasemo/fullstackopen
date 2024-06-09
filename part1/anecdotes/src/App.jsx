import './App.css'
import { useState } from 'react'

const Button = ({ clickHandler, text }) => <button onClick={clickHandler}>{text}</button>
const DisplayTitle = ({ text }) => <h3>{text}</h3>
const DisplayAnecdote = ({ anecdote, votes }) => <><p>{anecdote}</p><p>Has {votes} votes</p></>
const DisplayMostVoted = ({ anecdotes, mostVotes }) => {
  if (mostVotes > 0) {
    const filterAnecdotes=anecdotes.filter(anecdote=>anecdote.votes===mostVotes)
    const t = filterAnecdotes.map(anecdote => <DisplayAnecdote key={anecdote.text} anecdote={anecdote.text} votes={anecdote.votes} />)
    return (
      <div>
        <DisplayTitle text='Anecdote with most votes' />
        {t}
      </div>
    )
  }
  return (
    <p>Please vote ...</p>
  )
}

const App = () => {
  const data = [
    { text: 'If it hurts, do it more often.', votes: 0 },
    { text: 'Adding manpower to a late software project makes it later!', votes: 0 },
    { text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
    { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0 },
    { text: 'Premature optimization is the root of all evil.', votes: 0 },
    { text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0 },
    { text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes: 0 },
    { text: 'The only way to go fast, is to go well.', votes: 0 }
  ]

  const [anecdotes, setAnecdotes] = useState(data)

  const [selected, setSelected] = useState(0)

  const [mostVotes, setMostVotes] = useState(0)

  const AnecdoteRandomizer = () => {
    setSelected(Math.floor(Math.random() * data.length))
  }
  const VoteHandler = () => {
    const copy = [...anecdotes]
    copy[selected].votes++
    if (copy[selected].votes > mostVotes) {
      setMostVotes(copy[selected].votes)
    }
    setAnecdotes(copy)

  }

  return (
    <div>
      <DisplayTitle text='Anecdote of the day' />
      <DisplayAnecdote anecdote={anecdotes[selected].text} votes={anecdotes[selected].votes} />

      <div>
        <Button clickHandler={AnecdoteRandomizer} text='Next anecdote' />
        <Button clickHandler={VoteHandler} text='Vote' />
      </div>
      <DisplayMostVoted anecdotes={anecdotes} mostVotes={mostVotes} />
    </div>
  )
}

export default App