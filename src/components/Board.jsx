import Card from "./Card";
import "./Board.css";

function Board({ cards, onCardClick }) {
  return (
    <div className="board">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  );
}

export default Board;
