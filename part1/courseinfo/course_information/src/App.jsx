const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {  
  const t = props.parts.map(part => <Part key={part.name} part={part.name} exercises={part.exercises} />)
  return (
   <>
   {t}
   </>

  )
}

const Total = (props) => {
  let exercises = 0
  props.parts.forEach(part => {
    exercises += part.exercises
  })
  return (
    <p>Number of exercises {exercises}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App