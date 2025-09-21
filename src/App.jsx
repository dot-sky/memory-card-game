import { useEffect, useState } from "react";
import { CardDeck } from "./components/CardDeck";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import "./styles/App.css";

const DECK_SIZE = 12;
let agentsProcessed = [];

async function getData() {
  const url = "https://valorant-api.com/v1/agents";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    agentsProcessed = json;
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
        bgGradient: agent.backgroundGradientColors,
      });
    }
  }
  return newAgents;
}

function initData(agents) {
  shuffleArray(agents);
  const newAgents = [];
  for (let index in agents) {
    if (index < DECK_SIZE) {
      newAgents[index] = { ...agents[index], clicked: false };
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
    getData().then((json) => {
      agentsProcessed = processData(json);
      setAgents(initData(agentsProcessed));
    });
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

  function addGlowing() {
    setGlowingBtn(true);
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
    setAgents(initData(agentsProcessed));
    setScore(0);

    if (!playingRound) {
      setPlayingRound((playingRound) => !playingRound);
    }
  }

  return (
    <>
      <Header
        handleStartBtn={handleStartBtn}
        glowingBtn={glowingBtn}
        setGlowingBtn={setGlowingBtn}
        score={score}
        maxScore={maxScore}
        newMaxScore={newMaxScore}
        setNewMaxScore={setNewMaxScore}
      />
      <div className="cards">
        <CardDeck
          agents={agents}
          handleCardClick={handleCardClick}
          blur={!playingRound}
        />
        {playingRound ? null : (
          <div className="overlay" onClick={addGlowing}>
            <h2>Game Over</h2>
          </div>
        )}
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <GameController />
      <Footer />
    </>
  );
}

export default App;
