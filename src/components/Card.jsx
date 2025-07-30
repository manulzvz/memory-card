import "./Card.css";

function Card({ card, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-image-container">
        <img src={card.image} alt={card.name} className="card-image" />
        <div className="card-info">
          <p className="card-title">{card.name}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
