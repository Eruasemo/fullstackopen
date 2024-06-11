const Part = ({ part }) => {
    return (
      <p>
        {part.name} - {part.exercises}
      </p>
    )
  }
  
  const Header = ({ name }) => {
    return (
      <h2>{name}</h2>
    )
  }
  
  const Content = ({ parts }) => {
    const t = parts.map(part => <Part key={part.id} part={part} />)
    return (
      <>
        {t}
      </>
  
    )
  }
  
  const Total = ({ parts }) => {
    const exercises = parts.reduce((accumulator, part) => accumulator + part.exercises, 0)
    return (
      <p><b>Number of exercises: {exercises} </b></p>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </>
    )
  }
  
  const Courses = ({ courses }) => courses.map(course => <Course key={course.id} course={course} />)

  export default Courses