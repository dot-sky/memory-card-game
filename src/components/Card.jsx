import "../styles/Card.css";

function Card({ uuid, displayName, image, clicked, handleCardClick }) {
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

export { Card };
