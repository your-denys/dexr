import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import AdsHeader from "../AdsHeader/AdsHeader";
import AdCard from "./AdCard";
import AdImg from "../../../../assets/adCardImg.jpg";


function AdsMain() {
  const steps = [
    {
      number: "1",
      title: "Set token info",
      description: "Fill out the form in under a minute",
    },
    {
      number: "2",
      title: "Pay",
      description: "All major cryptocurrencies and credit/debit cards accepted",
    },
    {
      number: "3",
      title: "Wait for processing",
      description:
        "Most orders are processed within just a few minutes, but please allow up to 12 hours",
    },
    {
      number: "✔",
      title: "Done!",
      description: "Your token info is live on the website and apps!",
    },
  ];

  
  return (
    <div>
      <AdsHeader />
      <div className=" text-light py-5 text-center">
        <h1>DEX ADVERTISE</h1>
        <p style={{fontWeight:200}}>
          Advertise your token on DEX Screener and give it the exposure it
          deserves
        </p>
      </div>
      <Container className="mb-5">
        <Row className="g-5">
          <Col md={4}>
            <AdCard
              title="Update Profile"
              description="Update the token page on DEX Screener by providing up-to-date information and social media links."
              imgSrc={AdImg}
              link='/ad/update-token'
            />
          </Col>
          <Col md={4}>
            <AdCard
              title="Banner Advertise"
              description="Place a banner on the token page to reach a wider audience."
              imgSrc={AdImg}
              link='/ad/banner-advertise'
            />
          </Col>
          <Col md={4}>
            <AdCard
              title="Text Advertise"
              description="Place a text advertisement with a custom message on the token page."
              imgSrc={AdImg}
              link='/ad/text-advertise'
            />
          </Col>
        </Row>
        <div className="how-it-works mt-5">
      <h2 className="text-center">How does it work?</h2>
      <div className="steps">
        {steps.map((step, index) => (
          <div key={index} className="step">
            <div className="circle">{step.number}</div>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
      </Container>
    </div>
  );
}

export default AdsMain;
