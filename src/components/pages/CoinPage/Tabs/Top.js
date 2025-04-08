import { useState, useEffect } from "react";

function Top() {
  const [top, setTop] = useState([]);

  useEffect(() => {
    const fetchTop = async () => {
      try {
        setTop([
          {
            id: 1,
            maker: "7dL...ZbU",
            bought: 43000,
            sold: 33000,
          },
          {
            id: 2,
            maker: "7dL...ZbU",
            bought: 43000,
            sold: 53000,
          },
          {
            id: 3,
            maker: "7dL...ZbU",
            bought: 43000,
            sold: 33000,
          },
          {
            id: 4,
            maker: "7dL...ZbU",
            bought: 43000,
            sold: 33000,
          },
          {
            id: 5,
            maker: "7dL...ZbU",
            bought: 43000,
            sold: 33000,
          },
          {
            id: 6,
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
          <th>RANK</th>
          <th>MAKER</th>
          <th>BOUGHT</th>
          <th>SOLD</th>
          <th>PNL</th>
        </tr>
      </thead>
      <tbody>
        {top.map((tp, index) => {
          const pnl = tp.sold - tp.bought; // Вычисляем PNL
          const pnlColor = pnl >= 0 ? "#a4cf5e" : "#f45b5b"; // Цвет в зависимости от значения

          return (
            <tr key={index} style={{ color: pnlColor }}>
              <td style={{ color: '#808080', fontWeight: 200 }}>#{tp.id}</td>
              <td style={{ color: '#a4cf5e' }}>{tp.maker}</td>
              <td style={{ color: '#a4cf5e' }}>${tp.bought.toFixed(2)}</td>
              <td style={{ color: '#f45b5b' }}>${tp.sold.toFixed(2)}</td>
              <td style={{ color: pnlColor }}>${pnl.toFixed(2)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Top;
