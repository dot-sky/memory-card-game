import "../styles/Card.css";

function Card({
  uuid,
  displayName,
  image,
  bgImage,
  bgGradient,
  clicked,
  handleCardClick,
}) {
  const bgStyles = {
    "--img": `url(${bgImage})`,
    "--gradient0": "#" + bgGradient[0],
    "--gradient1": "#" + bgGradient[1],
    "--gradient2": "#" + bgGradient[2],
    "--gradient3": "#" + bgGradient[3],
  };
  return (
    <div
      className="card"
      onClick={(event) => handleCardClick(event, uuid, clicked)}
      style={bgStyles}
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
