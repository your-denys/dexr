import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Plus, Trash } from "react-bootstrap-icons";
import ModalCharts from "./ModalCharts";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Multicharts.css";
import AdsBanner from "../../AdsBanner/AdsBanner";

const API_URL = "https://api.coingecko.com/api/v3";
const DEFAULT_CURRENCY = "usd";
const DEFAULT_DAYS = "30";
const MIN_RANGE = 10;
const MAX_RANGE = 100;

function Multicharts() {
  const [show, setShow] = useState(false);
  const [visibleRange, setVisibleRange] = useState(24);
  const [offset, setOffset] = useState(0);
  const navigate = useNavigate();

  const [columns, setColumns] = useState(
    () => JSON.parse(localStorage.getItem("columns")) || 3
  );
  const [cardHeight, setCardHeight] = useState(
    () => JSON.parse(localStorage.getItem("cardHeight")) || 45
  );
  const [spacing, setSpacing] = useState(
    () => JSON.parse(localStorage.getItem("spacing")) || 3
  );

  const [coins, setCoins] = useState(() => {
    const storedCoins = localStorage.getItem("coins");
    return storedCoins ? JSON.parse(storedCoins) : [];
  });

  useEffect(() => {
    localStorage.setItem("coins", JSON.stringify(coins));
  }, [coins]);
  const addCoin = async (coin) => {
    try {
      const chartResponse = await axios.get(
        `${API_URL}/coins/${coin.id}/market_chart`,
        { params: { vs_currency: DEFAULT_CURRENCY, days: DEFAULT_DAYS } }
      );
      let chartData = [];
      if (chartResponse.data && chartResponse.data.prices) {
        chartData = chartResponse.data.prices.map((price) => ({
          date: new Date(price[0]).toLocaleDateString(),
          value: price[1],
        }));
      }
      const coinResponse = await axios.get(`${API_URL}/coins/${coin.id}`);
      const data = coinResponse.data;
      const minimalCoinData = {
        id: data.id,
        name: data.name,
        image: { small: data.image.small },
        market_data: {
          market_cap: {
            [DEFAULT_CURRENCY]: data.market_data.market_cap[DEFAULT_CURRENCY],
          },
          price_change_percentage_24h:
            data.market_data.price_change_percentage_24h,
        },
      };

      setCoins((prev) => [
        ...prev,
        { coin, chartData, coinData: minimalCoinData },
      ]);
    } catch (error) {
      console.error("Ошибка при добавлении монеты:", error);
    }
  };

  const removeCoin = (index) => {
    setCoins((prev) => prev.filter((_, i) => i !== index));
  };

  const getVisibleData = (chartData) => {
    if (!chartData) return { labels: [], datasets: [] };
    const start = Math.max(0, chartData.length - visibleRange - offset);
    const end = start + visibleRange;
    const visibleData = chartData.slice(start, end);
    return {
      labels: visibleData.map((data) => data.date),
      datasets: [
        {
          data: visibleData.map((data) => data.value),
          borderColor: "#4CAF50",
          backgroundColor: "rgba(76, 175, 80, 0.3)",
          fill: true,
          tension: 0.4,
          pointRadius: 0,
        },
      ],
    };
  };

  const handleWheel = (event) => {
    setVisibleRange((prev) =>
      Math.max(
        MIN_RANGE,
        Math.min(MAX_RANGE, prev + (event.deltaY > 0 ? 5 : -5))
      )
    );
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      setOffset((prev) => Math.min(1000, prev + 5));
    } else if (event.key === "ArrowRight") {
      setOffset((prev) => Math.max(0, prev - 5));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [visibleRange]);

  const handleCoinClick = (coinInfo) => {
    if (coinInfo) {
      navigate(`/coin/${coinInfo.id}`);
    }
  };

  const updateColumns = (value) => {
    setColumns(value);
    localStorage.setItem("columns", JSON.stringify(value));
  };

  const updateCardHeight = (value) => {
    setCardHeight(value);
    localStorage.setItem("cardHeight", JSON.stringify(value));
  };

  const updateSpacing = (value) => {
    setSpacing(value);
    localStorage.setItem("spacing", JSON.stringify(value));
  };

  return (
    <div className="multichart">
      <AdsBanner />
      <div className="multichart-controller">
        <div className="multichart-controls">
          <button onClick={() => updateColumns(Math.max(1, columns - 1))}>
            -
          </button>
          <span>Columns: {columns}</span>
          <button onClick={() => updateColumns(Math.min(5, columns + 1))}>
            +
          </button>
        </div>
        <div className="multichart-controls">
          <button
            onClick={() => updateCardHeight(Math.max(45, cardHeight - 5))}
          >
            -
          </button>
          <span>Card height: {cardHeight}%</span>
          <button
            onClick={() => updateCardHeight(Math.min(200, cardHeight + 5))}
          >
            +
          </button>
        </div>
        <div className="multichart-controls">
          <button onClick={() => updateSpacing(Math.max(0, spacing - 1))}>
            -
          </button>
          <span>Spacing: {spacing}</span>
          <button onClick={() => updateSpacing(Math.min(5, spacing + 1))}>
            +
          </button>
        </div>
        <div
            className="multicharts-card-trash"
              onClick={() => setCoins([])}
            >
              <Trash color='#fff' /> {' '}
              <span>Clear tab</span>
            </div>
      </div>

      <div
        className="multicharts-wrapper"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${spacing}rem`,
        }}
      >
        {coins.map((item, index) => (
          <Card
            key={item.coin.id + index}
            className="multicharts-card-wrapper"
            style={{
              height: cardHeight + "vh",
            }}
            onWheel={handleWheel}
          >
            <div
              onClick={() => handleCoinClick(item.coinData)}
              className="multicharts-card-info"
            >
              {item.coinData && (
                <>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={item.coinData.image.small}
                      alt={item.coinData.name}
                    />
                    <p className="multicharts-card-name">{item.coinData.name}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p>
                      MCap: {" "}
                      <span>
                      ${item.coinData.market_data.market_cap[DEFAULT_CURRENCY]}
                      </span>
                    </p>
                    <p >
                      24h:{" "}
                      <span
                        style={{
                          color:
                            item.coinData.market_data
                              .price_change_percentage_24h > 0
                              ? "green"
                              : "red",
                        }}
                      >
                        {item.coinData.market_data.price_change_percentage_24h.toFixed(
                          2
                        )}
                        %
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="multicharts-card-chart">
              <Line
                data={getVisibleData(item.chartData)}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: { x: { ticks: { maxTicksLimit: 5 } } },
                }}
              />
            </div>

            <div
            className="multicharts-card-trash"
              onClick={() => removeCoin(index)}
            >
              <Trash />
            </div>
          </Card>
        ))}

        <Card
          onClick={() => setShow(true)}
          className= "multicharts-card-add"
          style={{
            height: cardHeight + "vh",
          }}
        >
          <Plus size={50} />
          <h5 className="mt-2">Add Chart</h5>
          <p style={{ fontWeight: "200", fontSize: "12px", color: "#a8a8a8" }}>
            Click to select a cryptocurrency
          </p>
        </Card>

        <ModalCharts
          show={show}
          handleClose={() => setShow(false)}
          onSelectCoin={(coin) => {
            addCoin(coin);
            setShow(false);
          }}
        />
      </div>
    </div>
  );
}

export default Multicharts;
