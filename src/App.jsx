import { Fragment, useEffect, useState } from "react";
import agentsJSON from "./agentsJSON.json";
import "./App.css";

const DECK_SIZE = 12;
const agentsProcessed = processData(agentsJSON.data);

function Card({ uuid, displayName, image, clicked, handleCardClick }) {
  return (
    <div
      className="card"
      onClick={(event) => handleCardClick(event, uuid, clicked)}
    >
      {/* <div
        className="img-container"
        style={{ backgroundImage: `url(${image})` }}
      ></div> */}
      <img src={image} alt="" />
      <p>{displayName}</p>
    </div>
  );
}

function Cards({ agents, handleCardClick }) {
  return (
    <div className="card-grid">
      {agents.map((agent) => (
        <Card key={agent.uuid} {...agent} handleCardClick={handleCardClick} />
      ))}
    </div>
  );
}

async function getData() {
  const url = "https://valorant-api.com/v1/agents";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json.data;
  } catch (error) {
    console.error(error.message);
  }
}

function processData(agents) {
  const newAgents = [];
  for (const agent of agents) {
    if (agent.isPlayableCharacter) {
      newAgents.push({
        uuid: agent.uuid,
        displayName: agent.displayName,
        image: agent.fullPortrait,
      });
    }
  }
  return newAgents;
}

function initData() {
  shuffleArray(agentsProcessed);
  const newAgents = [];
  for (let index in agentsProcessed) {
    if (index < DECK_SIZE) {
      newAgents[index] = { ...agentsProcessed[index], clicked: false };
    } else {
      break;
    }
  }
  return newAgents;
}

function shuffleArray(array) {
  let currentIndex = array.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function GameController() {
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    // getData().then((json) => setAgents(json));
    setAgents(initData());
  }, []);

  function setClicked(uuid) {
    setAgents(
      agents.map((agent) => {
        if (agent.uuid === uuid) {
          return { ...agent, clicked: true };
        } else {
          return agent;
        }
      })
    );
  }

  function handleCardClick(event, uuid, clicked) {
    if (!clicked) {
      setClicked(uuid);
      setScore((prev) => prev + 1);
      shuffleAgents();
    } else {
      endRound();
    }
  }

  function shuffleAgents() {
    setAgents((agents) => {
      const array = [...agents];
      shuffleArray(array);
      return array;
    });
  }

  function endRound() {
    if (score > maxScore) {
      setMaxScore(score);
    }
    setAgents(initData());
    setScore(0);
  }

  function resetClickedCards() {
    setAgents((agents) =>
      agents.map((agent) => {
        return { ...agent, clicked: false };
      })
    );
  }
  return (
    <>
      <h1>Memory Card Game</h1>
      <p>
        Score:{score}, MaxScore:{maxScore}
      </p>
      <Cards agents={agents} handleCardClick={handleCardClick} />
    </>
  );
}

function App() {
  return <GameController />;
}

export default App;
