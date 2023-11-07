const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const Footer = () => {
  return (
    <div>
      greeting app created by <a href='https://github.com/mluukkai'>mluukkai</a>
    </div>
  )
}

const App = () => {
  // const now = new Date()
  // const a = 10
  // const b = 20
  // console.log(now, a+b)

  const name = 'Peter'
  const age = 10
  const friends = ['George', 'Daisy']

  return (
    <>
      {/* <p>Hello world, it is {now.toString()}</p>
      <p>
        {a} plus {b} is {a + b}
      </p> */}
      <h1>Greetings</h1>
      <Hello name='Maya' age={26 + 10}/>
      <Hello name={name} age={age}/>
      <p>{friends}</p>
      <Footer />
    </>
  )
}

export default App
