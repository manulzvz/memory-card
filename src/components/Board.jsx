import Card from "./Card";
import "./Board.css";

function Board({ artworks }) {
  return (
    <div className="board">
      {artworks.map((art, idx) => (
        <Card
          key={idx}
          image={art.primaryImageSmall}
          title={art.title}
          url={art.objectURL}
        />
      ))}
    </div>
  );
}

export default Board;
