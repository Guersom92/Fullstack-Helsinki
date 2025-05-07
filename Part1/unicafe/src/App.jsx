import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text} </td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const getAverage = () => (good + bad * -1) / (good + bad + neutral);

  const All = good + neutral + bad;

  return All ? (
    <table>
      <tbody>
        <StatisticLine text="bueno" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="malo" value={bad} />
        <StatisticLine text="todos" value={All} />
        <StatisticLine text="promedio" value={getAverage()} />
        <StatisticLine text="positivos" value={good / All + " %"} />
      </tbody>
    </table>
  ) : (
    <p>No se ha dado feedback</p>
  );
};

const Button = ({ text, handleClick }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>Danos tu feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text={"Bueno"} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={"Neutral"} />
      <Button handleClick={() => setBad(bad + 1)} text={"Malo"} />
      <h2>Estadísticas</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
