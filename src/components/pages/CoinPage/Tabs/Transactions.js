import { useEffect, useState } from "react";

function Transactions({ chainName }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setTransactions([
          {
            date: "2s ago",
            type: "Sell",
            usd: 295,
            amount: 1833.25,
            [chainName]: 20,
            price: 0.001614,
          },
          {
            date: "2s ago",
            type: "Buy",
            usd: 295,
            amount: 1833.25,
            [chainName]: 20,
            price: 0.001614,
          },
          {
            date: "2s ago",
            type: "Sell",
            usd: 250.74,
            amount: 155117,
            [chainName]: 20,
            price: 0.001614,
          },
          {
            date: "2s ago",
            type: "Sell",
            usd: 250.74,
            amount: 155117,
            [chainName]: 20,
            price: 0.001614,
          },
          {
            date: "2s ago",
            type: "Sell",
            usd: 250.74,
            amount: 155117,
            [chainName]: 20,
            price: 0.001614,
          },
          {
            date: "2s ago",
            type: "Sell",
            usd: 12.16,
            amount: 7497.11,
            [chainName]: 20,
            price: 0.001626,
          },
        ]);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    fetchTransactions();
  }, [chainName]);

  return (
      <table>
        <thead>
          <tr>
            <th>DATE</th>
            <th>TYPE</th>
            <th>USD</th>
            <th>AMOUNT</th>
            <th>{chainName.toUpperCase()}</th>
            <th>PRICE</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, index) => (
            <tr key={index} className={tx.type.toLowerCase()}>
              <td style={{ color: '#808080', fontWeight: 200 }}>{tx.date}</td>
              <td>{tx.type}</td>
              <td>${tx.usd?.toFixed(2)}</td>
              <td>{tx.amount?.toFixed(2)}</td>
              <td>{tx[chainName]?.toFixed(2)}</td>
              <td>${tx.price?.toFixed(6)}</td>
            </tr>
          ))}
        </tbody>
      </table>
  );
}

export default Transactions;
