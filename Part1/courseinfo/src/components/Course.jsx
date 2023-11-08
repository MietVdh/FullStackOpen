const Header = ({ course }) => {
    return (
      <h2>{course}</h2>
    )
  }

  const Part = ({ part }) => {
    console.log("part props")
    console.log(part)
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }

  const Content = ({ parts }) => {
    console.log("content props")
    console.log(parts)
    return (
      <>
        {parts.map(part =>
          <Part key={part.id} part={part} />
        )}
      </>
    )
  }

  const Total = ({ parts }) => {
    console.log("Total parts: ", parts)
    const total = parts.reduce((acc, current) => acc + current.exercises, 0,);
    return (
      <p><b>Total of {total} exercises</b></p>
    )
  }

const Course = ({ course }) => {
    return (
        <>
        <Header course={course.name}/>
        <Content parts={course.parts} />
        <Total parts={course.parts} />
        </>
    )
}


export default Course
