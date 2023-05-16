import { useState } from 'react';

const Button = ({handleClick, text}) => {
  return (
  <button onClick={handleClick}>{text}</button>  
  )
}

const StatisticLine = ({text, value, children}) => {
  return (
    <tr>
      <td>{text}</td>
      <td> {value}{children}</td>
    </tr>
  )
}

const Stats = ({good, bad, neutral}) => {
  let total = good + bad + neutral;
  let average = (good - bad)/total;
  let positive = (good / total)*100;
  if(total!==0){
    return (
        <table>
          <tbody>
            <StatisticLine text="Good" value={good}/>
            <StatisticLine text="Neutral" value={neutral}/>
            <StatisticLine text="Bad" value={bad}/>
            <StatisticLine text="Total" value={total}/>
            <StatisticLine text="Average" value={average}/>
            <StatisticLine text="Positive" value={positive}>%</StatisticLine>
            {/* <tr>
              <td>All</td><td>{total}</td>
            </tr>
            <tr>
              <td>Average</td><td>{average}</td>
            </tr>
            <tr>
              <td>Positive</td><td>{positive}%</td>
            </tr> */}
          </tbody>
        </table>
    )
  }else {
    return (<div>No feedback given</div>);
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <h2>Statistics</h2>
      <Stats good={good} bad={bad} neutral={neutral}/>

    </div>
  )
}

export default App