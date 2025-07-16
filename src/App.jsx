import { useState } from "react";
import "./App.css";

function Card({ img, desc }) {
  return (
    <div>
      <img src={img} alt="" />
      <p>{desc}</p>
    </div>
  );
}

function Cards({ data }) {
  return (
    <>
      {data.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </>
  );
}

function GameController() {
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  const data = [
    { id: 0, img: "agent1", desc: "agent1" },
    { id: 1, img: "agent2", desc: "agent2" },
    { id: 2, img: "agent3", desc: "agent3" },
    { id: 3, img: "agent4", desc: "agent4" },
  ];

  return (
    <>
      <h1>Memory Card Game</h1>
      <Cards data={data} />
    </>
  );
}

function App() {
  return <GameController />;
}

export default App;
