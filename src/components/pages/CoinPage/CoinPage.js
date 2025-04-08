import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./CoinPage.css";
import { chartOptions } from "./Chart";
import ChartData from "./ChartData";
import { Tabs, Tab, Card, Badge } from "react-bootstrap";

import Transactions from "./Tabs/Transactions";
import Top from "./Tabs/Top";
import Holders from "./Tabs/Holders";
import Snipers from "./Tabs/Snipers";
import Providers from "./Tabs/Providers";
import CoinMenu from "./CoinMenu/CoinMenu";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 часа в миллисекундах

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [timeframe, setTimeframe] = useState(1);
  const [holdersCount, setHoldersCount] = useState(0);
  const [activeTab, setActiveTab] = useState("transactions");

  useEffect(() => {
    const fetchCoinData = async () => {
      const coinCacheKey = `coinData-${id}`;
      const coinCacheTimestampKey = `${coinCacheKey}-timestamp`;
      const currentTime = Date.now();

      const cachedCoinData = localStorage.getItem(coinCacheKey);
      const coinTimestamp = localStorage.getItem(coinCacheTimestampKey);

      try {
        if (
          cachedCoinData &&
          coinTimestamp &&
          currentTime - coinTimestamp < CACHE_DURATION
        ) {
          console.log("Используем кешированные данные о монете");
          setCoin(JSON.parse(cachedCoinData));
        } else {
          const response = await axios.get(`${API_URL}/coins/${id}`, {
            headers: { "x-cg-demo-api-key": API_KEY },
          });
          setCoin(response.data);

          localStorage.setItem(coinCacheKey, JSON.stringify(response.data));
          localStorage.setItem(coinCacheTimestampKey, Date.now().toString());
        }
      } catch (error) {
        console.error("Ошибка загрузки данных монеты:", error);
      }
    };

    fetchCoinData();
  }, [id]);

  useEffect(() => {
    const fetchChartData = async () => {
      const chartCacheKey = `chartData-${id}-${timeframe}`;
      const chartCacheTimestampKey = `${chartCacheKey}-timestamp`;
      const currentTime = Date.now();

      const cachedChartData = localStorage.getItem(chartCacheKey);
      const chartTimestamp = localStorage.getItem(chartCacheTimestampKey);

      try {
        if (
          cachedChartData &&
          chartTimestamp &&
          currentTime - chartTimestamp < CACHE_DURATION
        ) {
          console.log("Используем кешированные данные графика");
          setChartData(JSON.parse(cachedChartData));
        } else {
          const chartResponse = await axios.get(
            `${API_URL}/coins/${id}/market_chart?vs_currency=usd&days=${timeframe}`,
            {
              headers: { "x-cg-demo-api-key": API_KEY },
            }
          );
          const chartData = ChartData({ chartResponse });
          setChartData(chartData);

          localStorage.setItem(chartCacheKey, JSON.stringify(chartData));
          localStorage.setItem(chartCacheTimestampKey, Date.now().toString());
        }
      } catch (error) {
        console.error("Ошибка загрузки данных графика:", error);
      }
    };

    fetchChartData();
  }, [id, timeframe]);

  if (!coin || !chartData) return <p>Загрузка...</p>;

  console.log(coin);
  return (
    <div className="coin-container">
      <div className="content-transaction">
          <Card >
            <a href='https://www.google.com/' target="blank" style={{textDecoration:'none'}}>
            <div className="d-flex align-items-center gap-2">
              <Badge bg="secondary">Ad</Badge>
              <div
                className="rounded-circle bg-primary d-flex align-items-center justify-content-center"
                style={{ width: "40px", height: "40px" }}
              >
                <span className="fs-2">🌊</span>
              </div>
              <p
                className="mb-0"
                style={{ fontSize: "12px", fontWeight: "normal" }}
              >
                <strong>🤖 DEEP AI / CEX Listing confirmed! 🤖</strong>
              </p>
            </div>
            </a>
          </Card>
        <div className="chart-container">
          <div className="timeframe-selector">
            <button
              className={timeframe === 1 ? "active" : ""}
              onClick={() => setTimeframe(1)}
            >
              1D
            </button>
            <button
              className={timeframe === 7 ? "active" : ""}
              onClick={() => setTimeframe(7)}
            >
              7D
            </button>
            <button
              className={timeframe === 30 ? "active" : ""}
              onClick={() => setTimeframe(30)}
            >
              1M
            </button>
            <button
              className={timeframe === 365 ? "active" : ""}
              onClick={() => setTimeframe(365)}
            >
              1Y
            </button>
          </div>
          <div className="chart-wrapper">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Вкладки */}
        <div className="coin-tabs">
          <Tabs
            id="transaction-tabs"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k || "transactions")}
          >
            <Tab eventKey="transactions" title="Transactions">
              <Transactions chainName={coin.name} />
            </Tab>

            <Tab eventKey="topTraders" title="Top Traders">
              <Top />
            </Tab>

            <Tab eventKey="snipers" title="Snipers">
              <Snipers />
            </Tab>

            <Tab
              eventKey="holders"
              title={<span>Holders({holdersCount})</span>}
            >
              <Holders onDataUpdate={setHoldersCount} />
            </Tab>

            <Tab eventKey="providers" title="Liquidity Providers">
              <Providers />
            </Tab>
          </Tabs>
        </div>
      </div>
      <CoinMenu coin={coin} />
    </div>
  );
};

export default CoinPage;
