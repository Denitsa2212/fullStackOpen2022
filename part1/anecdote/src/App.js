import { useState } from 'react'

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  // console.log(votes);
  let copy = [...votes];


  const getRandomIndex = (max) => {
    return Math.floor(Math.random() * max);
  }

  const generateRnd = () => {
    let temp = getRandomIndex(anecdotes.length);
    setSelected(temp);
  }

  const voteHandler = (index) => {
    copy[index]++;
    setVotes(copy);
  }

  const highestVote = (arr) => {
    let largest = 0;
    for (let i = 0; i < arr.length; i++) {
      if( arr[i] > arr[largest] ){
        largest = i
      }
    }
    return largest;
  }
  let highestVoteIndex = highestVote(votes);
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Number of votes: {votes[selected]}</p>
      <button onClick={generateRnd}>
        Generate random anecdote
      </button>
      <button onClick={() => voteHandler(selected)}>Vote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[highestVoteIndex]}</p>
    </div>
  )
}

export default App