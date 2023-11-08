import { useState } from 'react'


const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  const count = good + neutral + bad
  const total = good - bad
  if (count === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="all" value={count}/>
        <StatisticLine text="average" value={Math.round(total / count * 100) / 100}/>
        <StatisticLine text="positive" value={`${Math.round((good / count) * 100 * 100) / 100 } %`}/>
      </table>

    </div>
  )
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    const newGood = good + 1;
    setGood(newGood);
  }

  const handleNeutralClick = () => {
    const newNeutral = neutral + 1;
    setNeutral(newNeutral);
  }

  const handleBadClick = () => {
    const newBad = bad + 1;
    setBad(newBad);
  }



  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" onClick={handleGoodClick}/>
      <Button text="neutral" onClick={handleNeutralClick}/>
      <Button text="bad" onClick={handleBadClick}/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App
