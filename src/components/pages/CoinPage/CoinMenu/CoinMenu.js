/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState, useEffect } from "react";
import { Tabs, Tab, Accordion, Button, Card, Badge  } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CoinMenu.css";
import x from "../../../../assets/x-icon.png";
import tg from "../../../../assets/tg-icon.png";
import { Link } from "react-router-dom";

const CoinMenu = ({ coin }) => {
  const [data, setData] = useState({});
  const [key, setKey] = useState("30d"); // По умолчанию вкладка за 24 часа
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (coin) {
      setData({
        name: coin.name,
        symbol: coin.image.small,
        img: coin.image.large,
        rank: coin.market_cap_rank,
        boost: 3000,
        description: coin.description?.en,
        socialMedia: {
          twitter: {
            link: "https://x.com/",
            img: x,
          },
          telegram: {
            link: "https://t.me/",
            img: tg,
          },
          // web: {
          //   link: "https://t.me/",
          //   img: tg,
          // },
        },
        priceUSD: coin.market_data.current_price.usd?.toFixed(2),
        priceETH: coin.tickers[0]?.converted_last?.eth,
        liquidity: 126034,
        marketCap: coin.market_data.market_cap.usd?.toFixed(2),
        change: {
          "30d": {
            price: coin.market_data.price_change_percentage_30d?.toFixed(2),
            transactions: 175723,
            volume: coin.market_data.total_volume.usd,
            makers: 85608,
            buys: 90359,
            sells: 85364,
            buyVolume: 13.7,
            sellVolume: 13.7,
            buyers: 84195,
            sellers: 48911,
          },
          "14d": {
            price: coin.market_data.price_change_percentage_14d?.toFixed(2),
            transactions: 175723,
            volume: coin.market_data.total_volume.usd,
            makers: 85608,
            buys: 90359,
            sells: 85364,
            buyVolume: 13.7,
            sellVolume: 13.7,
            buyers: 84195,
            sellers: 48911,
          },
          "7d": {
            price: coin.market_data.price_change_percentage_7d?.toFixed(2),
            transactions: 175723,
            volume: coin.market_data.total_volume.usd,
            makers: 85608,
            buys: 90359,
            sells: 85364,
            buyVolume: 13.7,
            sellVolume: 13.7,
            buyers: 84195,
            sellers: 48911,
          },
          "24h": {
            price: coin.market_data.price_change_percentage_24h?.toFixed(2),
            transactions: 175723,
            volume: coin.market_data.total_volume.usd,
            makers: 85608,
            buys: 90359,
            sells: 85364,
            buyVolume: 13.7,
            sellVolume: 13.7,
            buyers: 84195,
            sellers: 48911,
          },
        },
        emojis: {
          "🚀": 20,
          "🔥": 12,
          "💩": 23,
          "🚩": 3,
        },
        pairs: "2A4tJzQi9o4wu81VxB1mcc3Eu9bg8pQbcP7GmXSevetk",
        token: "fiYsJnMggjZ4zSyHLcFk4LdJB6xaWcQrTYxQ1btpump",
      });
    }
  }, [coin]);

  const formatNumber = (num) => {
    if (num >= 1_000_000_000_000)
      return (num / 1_000_000_000_000).toFixed(2) + "T";
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(2) + "K";
    return num?.toString();
  };
  if (!data || !data.change) return <p>Loading...</p>;

  const handleCopy = (text) => {
    navigator.clipboard
      .writeText(text) 
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => console.error("Error", err));
  };

  return coin ? (
    <div className="coin-menu">
      <div className="coin-menu-header d-flex justify-content-between align-items-center">
        <img
          className="coin-menu-header-img"
          src={data.symbol}
          alt={data.name}
        />
        <div className="coin-menu-header-content">
          <h4 className="coin-menu-title align-self-center">{data.name}</h4>
          <span className="coin-menu-rank">
            #{data.rank}⚡{data.boost}
          </span>
        </div>
      </div>
      <img className="coin-menu-img" src={data.img} alt={data.name} />
      <div className="coin-menu-body">
        <p className="coin-description">{data.description?.slice(0, 100)}...</p>
        <div className="coin-menu-social-media d-flex justify-content-between">
          {data.socialMedia &&
            Object.keys(data.socialMedia).map((key) => {
              const social = data.socialMedia[key];
              return (
                <a
                  key={key}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="coin-menu-social-media-img"
                    src={social.img}
                    alt={key}
                  />
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </a>
              );
            })}
        </div>

        <div className="stats-container">
          <div className="stats-card">
            <span className="stats-title">PRICE USD</span>
            <span className="stats-value">${data.priceUSD}</span>
          </div>
          <div className="stats-card">
            <span className="stats-title">PRICE</span>
            <span className="stats-value">{data.priceETH} ETH</span>
          </div>
          <div className="stats-card">
            <span className="stats-title">LIQUIDITY</span>
            <span className="stats-value">
              ${formatNumber(data.liquidity)}{" "}
              <span className="lock-icon">🔒</span>
            </span>
          </div>
          <div className="stats-card">
            <span className="stats-title">MKT CAP</span>
            <span className="stats-value">${formatNumber(data.marketCap)}</span>
          </div>
        </div>
        <div className="coin-menu-actions d-flex justify-content-between mt-1 mb-3">
          <button className="btn coin-menu-buy">BUY</button>
          <button className="btn coin-menu-sell">SELL</button>
        </div>
        <div className="coin-menu-details-container">
          <Tabs
            id="cryptoTabs"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="coin-main-details"
          >
            {Object.entries(data.change).map(([tabKey, value]) => {
              const totalTrades = value.buys + value.sells;
              const buyPercentage = (value.buys / totalTrades) * 100;
              const sellPercentage = (value.sells / totalTrades) * 100;

              const totalVolume = value.buyVolume + value.sellVolume;
              const buyVolPercentage = (value.buyVolume / totalVolume) * 100;
              const sellVolPercentage = (value.sellVolume / totalVolume) * 100;

              const totalParticipants = value.buyers + value.sellers;
              const buyersPercentage = (value.buyers / totalParticipants) * 100;
              const sellersPercentage =
                (value.sellers / totalParticipants) * 100;
              return (
                <Tab
                  className=""
                  key={tabKey}
                  eventKey={tabKey}
                  title={
                    <div>
                      <p className="coin-main-details-dates">
                        {tabKey.toUpperCase()}
                      </p>{" "}
                      <p className={value.price > 0 ? "success" : "danger"}>
                        {value.price}%
                      </p>
                    </div>
                  }
                >
                  <div className="coin-menu-tab-box">
                    <div className="coin-menu-tab-box-section">
                      <div className="market ">
                        <span>TXNS</span>
                        <p>{value.transactions}</p>
                      </div>
                      <div className="market ">
                        <span>Volume</span>
                        <p>${formatNumber(value.volume)}</p>
                      </div>
                      <div className="market">
                        <span>Makers</span>
                        <p>{value.makers}</p>
                      </div>
                    </div>
                    <div className="coin-menu-tab-box-section">
                      <div className="crypto-stat-row">
                        <div className="crypto-stat">
                          <span className="crypto-label">BUYS</span>
                          <span className="crypto-value ">{value.buys}</span>
                        </div>
                        <div className="crypto-stat">
                          <span className="crypto-label">SELLS</span>
                          <span className="crypto-value ">{value.sells}</span>
                        </div>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress green"
                          style={{ width: `${buyPercentage}%` }}
                        ></div>
                        <div
                          className="progress red"
                          style={{ width: `${sellPercentage}%` }}
                        ></div>
                      </div>
                      <div className="crypto-stat-row">
                        <div className="crypto-stat">
                          <span className="crypto-label">BUY VOL</span>
                          <span className="crypto-value ">
                            ${value.buyVolume}M
                          </span>
                        </div>
                        <div className="crypto-stat">
                          <span className="crypto-label">SELL VOL</span>
                          <span className="crypto-value ">
                            ${value.sellVolume}M
                          </span>
                        </div>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress green"
                          style={{ width: `${buyVolPercentage}%` }}
                        ></div>
                        <div
                          className="progress red"
                          style={{ width: `${sellVolPercentage}%` }}
                        ></div>
                      </div>
                      <div className="crypto-stat-row">
                        <div className="crypto-stat">
                          <span className="crypto-label">BUYERS</span>
                          <span className="crypto-value">{value.buyers}</span>
                        </div>
                        <div className="crypto-stat">
                          <span className="crypto-label">SELLERS</span>
                          <span className="crypto-value">{value.sellers}</span>
                        </div>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress green"
                          style={{ width: `${buyersPercentage}%` }}
                        ></div>
                        <div
                          className="progress red"
                          style={{ width: `${sellersPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </Tab>
              );
            })}
          </Tabs>
        </div>
        <div className="coin-menu-watchlist mt-3 text-center">
          <button className="btn">☆ Watchlist</button>
        </div>
        <div className="coin-menu-boost mt-2 text-center">
          <button className="btn">⚡︎ Boost</button>
        </div>
        <div className="coin-menu-emoji-container mt-2">
          {Object.entries(data.emojis).map(([symbol, count], index) => (
            <button key={index} className=" btn coin-menu-emoji">
              <span className="coin-menu-emoji-symbol">{symbol}</span>
              <span className="coin-menu-emoji-count">{count}</span>
            </button>
          ))}
        </div>
        <div className="mt-3 coin-menu-addresses">
          <div className="coin-menu-addresses-wrapper">
            <div>
              <p>Pair</p>
            </div>
            <div>
              <button onClick={() => handleCopy(data.pairs)} className="btn">
                {data.pairs.slice(0, 5)}...{data.pairs.slice(-4)}
              </button>
              <a
                href={"https://solscan.io/account/" + data.pairs}
                target="blank"
              >
                EXP
              </a>
            </div>
          </div>
          <div className="coin-menu-addresses-wrapper">
            <div>
              <p>{data.name}</p>
            </div>
            <div>
              <button onClick={() => handleCopy(data.token)} className="btn">
                {data.token.slice(0, 5)}...{data.token.slice(-4)}
              </button>
              <a href={"https://solscan.io/token/" + data.token} target="blank">
                EXP
              </a>
            </div>
          </div>
          {copied && <span>Address copied to clipboard!</span>}
        </div>
        <Accordion className="coin-menu-audit mt-4">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Audit</Accordion.Header>
            <Accordion.Body>
              <span>Mintable</span>
              <span>No</span>
            </Accordion.Body>
            <Accordion.Body>
              <span>Freezable</span>
              <span>No</span>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <p className="warning mt-2">
          <span>Warning!</span> Audits may not be 100% accurate!
        </p>

        {visible && (
          <>
          <Card className="bg-dark text-white mt-3 p-3 shadow-lg rounded">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <strong>🤖 DEEP AI / CEX Listing confirmed! 🤖</strong>
              <Badge bg="secondary">Ad</Badge>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle bg-primary d-flex align-items-center justify-content-center"
                style={{ width: "40px", height: "40px" }}
              >
                <span className="fs-4">🌊</span>{" "}
              </div>
              <p
                className="mb-0"
                style={{ fontSize: "12px", fontWeight: "normal" }}
              >
                Take a look at the chart and feel free to join the TG Community
                to find out which CEX will list $DEEP first! 🌕
              </p>
            </div>

            <Button
              variant="secondary"
              className="w-100 mt-3 d-flex align-items-center justify-content-center gap-2"
            >
              📊 Chart
            </Button>
          </Card>
        <div className=" d-flex justify-content-between text-muted mt-0">
                      <Link to="/ad">
          
          <Button
            variant="link"
            className="text-light text-decoration-none"
            style={{ fontSize: "12px", fontWeight: "normal", color: "#a9a9a9"}}
          >
            ⚡ Advertise your token
          </Button>
          </Link>
          <Button
            variant="link"
            className="text-light text-decoration-none"
            style={{ fontSize: "12px", fontWeight: "normal", color: "#a9a9a9"}}
            onClick={() => setVisible(false)}
          >
            ❌ Hide ad
          </Button>
        </div>
        </>
        )}
      </div>
    </div>
  ) : (
    <p>Loading</p>
  );
};

export default CoinMenu;
