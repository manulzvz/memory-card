import "./Card.css";

function Card({ image, title, url, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img src={image} alt={title} />
        <p>{title}</p>
      </a>
    </div>
  );
}

export default Card;
