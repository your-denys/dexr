import { useNavigate } from "react-router-dom";
import '../../table.css'

const CoinTable = ({ coins, currentPage, perPage }) => {
  const navigate = useNavigate();

  return (
    <table className="coin-table">
            <thead>
              <tr>
                <th>TOKEN</th>
                <th>PRICE</th>
                <th>MCAP</th>
                <th>VOLUME</th>
                <th>24H</th>
              </tr>
            </thead>
            <tbody>
              {coins.length > 0 ? (
                coins.map((coin, index) => (
                  <tr
                    key={coin.id}
                    onClick={() => navigate(`/coin/${coin.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="coin-name">
                      <span>{(currentPage - 1) * perPage + index + 1}</span>
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="coin-icon"
                      />
                      {coin.name} ({coin.symbol.toUpperCase()})
                    </td>
                    <td>${coin.current_price.toLocaleString()}</td>
                    <td>${coin.market_cap.toLocaleString()}</td>
                    <td>${coin.total_volume.toLocaleString()}</td>
                    <td
                      className={
                        coin.price_change_percentage_24h > 0
                          ? "positive"
                          : "negative"
                      }
                    >
                      {coin.price_change_percentage_24h?.toFixed(2) ||
                        "Нет данных"}
                      %
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    Данных нет
                  </td>
                </tr>
              )}
            </tbody>
          </table>
  );
};

export default CoinTable;
