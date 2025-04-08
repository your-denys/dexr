import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Form } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import "../../Sidebar/SearchModal/SearchModal.css";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const ModalCharts = ({ show, handleClose, onSelectCoin }) => {
  const [searchName, setSearchName] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchCoins = async () => {
      if (searchName.trim()) {
        try {
          const response = await axios.get(`${API_URL}/search`, {
            params: { query: searchName.trim() },
            headers: { "x-api-key": API_KEY },
          });
          if (response.data.coins) {
            setFilteredResults(
              response.data.coins.slice(0, 10).map((coin) => ({
                name: coin.name,
                id: coin.id,
                marketCapRank: coin.market_cap_rank,
                thumb: coin.thumb,
              }))
            );
          }
        } catch (error) {
          console.error("Error fetching data from CoinGecko:", error);
        }
      } else {
        setFilteredResults([]);
      }
    };

    fetchCoins();
  }, [searchName]);

  const handleSearch = (id, name) => {
    if (id) {
      onSelectCoin({ id, name });
      setSearchName("");
      setFilteredResults([]);
      handleClose();
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="search-modal"
    >
      <Modal.Body className="search-modal-body">
        <div className="search-input-wrapper">
          <Search className="search-input-icon" />
          <Form.Control
            type="text"
            placeholder="Search by token name or contract address"
            className="search-input"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        {filteredResults.length > 0 && searchName.length > 0 && (
          <div className="search-suggestions">
            {filteredResults.map((coin) => (
              <div
                key={coin.id}
                className="search-suggestion-item"
                onClick={() => handleSearch(coin.id, coin.name)}
              >
                <img src={coin.thumb} alt={coin.name} className="coin-thumb" />
                <div className="coin-info">
                  <span className="coin-name">{coin.name}</span>
                  <span className="coin-rank">#{coin.marketCapRank}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ModalCharts;
