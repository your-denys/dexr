import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

function Dnd({ coin }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: coin.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card className="watchlist-card mt-3" style={style}>
     {<span className ="watchlist-card-holder"
        ref={setNodeRef}
        style={{ cursor: "move" }}
        {...attributes}
        {...listeners}
      >
        ☰
      </span>}
      <Link className="watchlist-card-token" to={`/coin/${coin.name?.toLowerCase()}`}>
          <div>
            <strong className={coin.color}>{coin.name}</strong>
            <small className={""}>1H: {coin.change1H}</small>
          </div>
          <div>
            <strong>{coin.price}</strong>
            <small className={""}>24H: {coin.change24H}</small>
          </div>
      </Link>
    </Card>
  );
}

export default Dnd;
