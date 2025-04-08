import { useState, useEffect } from "react";

function Snipers() {
  const [snipers, setSnipers] = useState([]);

  useEffect(() => {
    const fetchTop = async () => {
      try {
        setSnipers([
          {
            balance: [0, 150000],
            maker: "7dL...ZbU",
            bought: 43000,
            sold: 33000,
          },
          {
            balance: [145000, 150000],
            maker: "7dL...ZbU",
            bought: 43000,
            sold: 53000,
          },
          {
            balance: [150000, 150000],
            maker: "7dL...ZbU",
            bought: 43000,
            sold: 33000,
          },
          {
            balance: [0, 150000],
            maker: "7dL...ZbU",
            bought: 43000,
            sold: 33000,
          },
          {
            balance: [0, 150000],
            maker: "7dL...ZbU",
            bought: 43000,
            sold: 33000,
          },
          {
            balance: [0, 150000],
            maker: "7dL...ZbU",
            bought: 43000,
            sold: 33000,
          },
        ]);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    fetchTop();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>STATUS</th>
          <th>MAKER</th>
          <th>BOUGHT</th>
          <th>SOLD</th>
          <th>PNL</th>
          <th>BAlANCE</th>
        </tr>
      </thead>
      <tbody>
        {snipers.map((snpr, index) => {
          const pnl = snpr.sold - snpr.bought;
          const pnlColor = pnl >= 0 ? "#a4cf5e" : "#f45b5b";
          let status = snpr.balance[0] > 0 && snpr.balance[0] < snpr.balance[1]
          ? "Sold some"
          : snpr.balance[0] === snpr.balance[1]
          ? "Held all"
          : "Sold all"
          return (
            <tr key={index} style={{ color: pnlColor }}>
              <td style={{ color: '#808080', fontWeight: 200 }}>{status}</td>
              <td style={{collor: status === 'Held all' ? '#a4cf5e' : '#f45b5b'}}>{snpr.maker}</td>
              <td style={{ color: '#f45b5b' }}>${snpr.bought.toFixed(2)}</td>
              <td style={{ color: '#a4cf5e' }}>${snpr.sold.toFixed(2)}</td>
              <td style={{ color: pnlColor }}>${pnl.toFixed(2)}</td>
              <td style={{ color: '#ffff' }}>{snpr.balance[0]} <span style={{ color: '#808080' }}>of</span> {snpr.balance[1]} </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Snipers;
