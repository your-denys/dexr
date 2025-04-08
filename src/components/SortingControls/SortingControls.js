import { Button, ButtonGroup } from "react-bootstrap";
import { Fire, ArrowUp, ArrowDown, Filter } from "react-bootstrap-icons";
import './SortingControls.css';

const SortingControls = ({
handleSortChange,
sortOrder,
timeframe,
handleTimeframeChange,
setShowFilterModal,
}) => {
  return (
    <div className="sort-wrapper">
      <div>
        <ButtonGroup className="sort-buttons">
          <Button
            className={`sort-button ${sortOrder === null ? "active" : ""}`}
            onClick={() => handleSortChange(null)}
          >
            <Fire /> Top
          </Button>
          <Button
            className={`sort-button ${sortOrder === "gainers" ? "active" : ""}`}
            onClick={() => handleSortChange("gainers")}
          >
            <ArrowUp /> Gainers
          </Button>
          <Button
            className={`sort-button ${sortOrder === "losers" ? "active" : ""}`}
            onClick={() => handleSortChange("losers")}
          >
            <ArrowDown /> Losers
          </Button>
        </ButtonGroup>

        <ButtonGroup className="sort-buttons">
          {["5m", "1h", "6h", "24h"].map((time) => (
            <Button
              key={time}
              className={`sort-button ${timeframe === time ? "active" : ""}`}
              onClick={() => handleTimeframeChange(time)}
            >
              {time.toUpperCase()}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div>
        <Button
          variant="primary"
          className="sort-button"
          onClick={() => setShowFilterModal(true)}
        >
          <Filter /> Filters
        </Button>
      </div>
    </div>
  );
};

export default SortingControls;
