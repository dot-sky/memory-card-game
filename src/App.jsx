import { useEffect, useState } from "react";
import agentsJSON from "./agentsJSON.json";
import "./App.css";

const DECK_SIZE = 12;
const agentsProcessed = processData(agentsJSON.data);

function Card({ uuid, displayName, image, bgImage, clicked, handleCardClick }) {
  return (
    <div
      className="card"
      onClick={(event) => handleCardClick(event, uuid, clicked)}
    >
      <div className="img-wrapper">
        <img src={image} alt="" />
      </div>
      <div className="card-name">
        <h4>{displayName}</h4>
      </div>
    </div>
  );
}

function Cards({ agents, handleCardClick, blur }) {
  const classList = "card-grid" + (blur ? " blur" : "");

  return (
    <div className={classList}>
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
        bgImage: agent.background,
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
  const [playingRound, setPlayingRound] = useState(true);
  const [glowingBtn, setGlowingBtn] = useState(false);
  const [newMaxScore, setNewMaxScore] = useState(false);

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
      setNewMaxScore(true);
    }
    setScore(0);
    setPlayingRound(false);
  }

  // Event Handlers

  function handleCardClick(event, uuid, clicked) {
    if (!clicked) {
      setClicked(uuid);
      setScore((prev) => prev + 1);
      shuffleAgents();
    } else {
      endRound();
    }
  }

  function handleStartBtn(event) {
    setAgents(initData());
    setScore(0);
    if (!playingRound) {
      setPlayingRound((playingRound) => !playingRound);
    }
    setGlowingBtn(false);
  }

  function glowRestartBtn(event) {
    setGlowingBtn((glowing) => !glowing);
  }

  return (
    <>
      <div className="header">
        <div className="title-info">
          <h1>Memory Card Game</h1>
          <p>
            Click on the cards to earn points, but don't click on the same card
            twice.
          </p>
        </div>
        <div className="game-info">
          <button
            onClick={handleStartBtn}
            onAnimationEnd={() => setGlowingBtn(false)}
            className={
              "btn btn-primary restart-btn" + (glowingBtn ? " glow" : "")
            }
          >
            Play Again
          </button>
          <div>
            <h3>Score: {score}</h3>
            <h3
              onAnimationEnd={() => setNewMaxScore(false)}
              className={"maxScore" + (newMaxScore ? " change" : "")}
            >
              Max. Score: {maxScore}
            </h3>
          </div>
        </div>
      </div>
      <div className="cards">
        <Cards
          agents={agents}
          handleCardClick={handleCardClick}
          blur={!playingRound}
        />
        {playingRound ? null : (
          <div className="overlay" onClick={glowRestartBtn}>
            <h2>Game Over</h2>
          </div>
        )}
      </div>
    </>
  );
}

function App() {
  return <GameController />;
}

export default App;
