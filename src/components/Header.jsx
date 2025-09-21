import "../styles/Header.css";

function Header({
  handleStartBtn,
  glowingBtn,
  setGlowingBtn,
  score,
  maxScore,
  setNewMaxScore,
  newMaxScore,
}) {
  return (
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
          className={"btn restart-btn" + (glowingBtn ? " glow" : "")}
        >
          Play Again
        </button>
        <div>
          <h3>
            Score: <span className="accented-text">{score}</span>
          </h3>
          <h3
            onAnimationEnd={() => setNewMaxScore(false)}
            className={"maxScore" + (newMaxScore ? " change" : "")}
          >
            Max. Score: <span className="accented-text">{maxScore}</span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export { Header };
