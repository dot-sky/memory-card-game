import "../styles/CardDeck.css";
import { Card } from "./Card";

function CardDeck({ agents, handleCardClick, blur }) {
  const classList = "card-grid" + (blur ? " blur" : "");

  return (
    <div className={classList}>
      {agents.map((agent) => (
        <Card key={agent.uuid} {...agent} handleCardClick={handleCardClick} />
      ))}
    </div>
  );
}

export { CardDeck };
