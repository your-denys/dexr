import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import AdsHeader from "../AdsHeader/AdsHeader";
import { useNavigate } from "react-router-dom";

import "./AdsText.css";

const adPackages = [
  { id: 1,  time: "24 hours", price: 2000 },
  { id: 2,  time: "2 days", price: 4000 },
  { id: 3,  time: "1 week", price: 14000 },

];

const AdsText = () => {
  const navigate = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const [selectedPackage, setSelectedPackage] = useState(null);

  const [chain, setChain] = useState("Sol");
  const [address, setAddress] = useState("");


  const [title, setTitle] = useState("");


  const [contactDiscord, setContactDiscord] = useState("");
  const [contactTg, setContactTg] = useState("");

  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);

  const isFormValid = agree1 && agree2 && selectedPackage;

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => navigate("/"), 5000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      chain,
      address,
      selectedPackage,
      title,
      contactDiscord,
      contactTg,
    });
    setIsSubmitted(true);


  };

  return (
    <>
      <AdsHeader />
      <Container
        className="py-5 ads-token"
        style={{ maxWidth: "800px", color: "white" }}
      >
        <h1 className="mb-4 fw-bold text-center">Banner Advertise</h1>
        {isSubmitted ? (
          <div className="text-center mt-5">
            <h2 className="fw-bold mb-3">Thank you for your submission!</h2>
            <p className="lead mb-4">
              We've successfully received your order and will start processing it shortly.
              If we need any additional details, we’ll reach out via the contact info provided.
            </p>
            <p>
              You will be redirected to the homepage in 5 seconds.
            </p>
          </div>
        ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Chain</Form.Label>
            <Form.Select
              required
              value={chain}
              onChange={(e) => setChain(e.target.value)}
            >
              <option>Sol</option>
              <option>Eth</option>
              <option>BNB</option>
              <option>TON</option>
              <option>Sui</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Token Address</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="0x000..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          {/* Package */}

          <h4 className="fw-bold mb-2 mt-5 ">Trending Bar Ad Info</h4>
          <p className="mb-3 ">Ad package</p>

          <Row className="g-3">
            {adPackages.map((pkg) => (
              <Col xs={12} sm={6} md={4} key={pkg.id}>
                <Card
                  className={`h-100 text-center border-secondary ${
                    selectedPackage?.id === pkg.id
                      ? "border-primary bg-dark"
                      : "bg-black"
                  }`}
                  onClick={() => setSelectedPackage(pkg)}
                  style={{ cursor: "pointer" }}
                >
                  <Card.Body>
                    <h5 className="fw-bold">{pkg.time}</h5>
                    <span className=" mt-2">${pkg.price.toFixed(2)}</span>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* {/* Title */}

          <Form.Group className="mb-3 mt-5">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder=""
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

         
          {/* Contact */}

          <h4 className="fw-bold mt-5 mb-3">
            Contact Info <span className="fw-normal">(optional)</span>
          </h4>
          <p className="small mb-4">
            Provide your Discord and/or Telegram usernames if you want us to be
            able to quickly reach you out in case of any additional questions or
            clarifications. This can speed up the process of approving your
            order!
          </p>

          <Form.Group className="mb-3">
            <Form.Label>Discord Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. myusername#1234"
              value={contactDiscord}
              onChange={(e) => setContactDiscord(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Telegram Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="@username"
              value={contactTg}
              onChange={(e) => setContactTg(e.target.value)}
            />
          </Form.Group>

          {/* {/*Order summary */}

          {selectedPackage && (
            <div className="mt-5 mb-4">
              <h4 className="fw-bold mb-3">Order summary</h4>

              <Row className=" fw-medium mb-2">
                <Col>Product</Col>
                <Col className="text-end">Price</Col>
              </Row>
              <hr className="border-secondary" />
              <Row>
                <Col>
                  <div className="fw-semibold">Token Advertising</div>
                  <div className=" small">{selectedPackage.time}</div>
                </Col>
                <Col className="text-end fw-semibold">
                  ${selectedPackage.price.toFixed(2)}
                </Col>
              </Row>
            </div>
          )}

          <Form.Group className="mb-2">
            <Form.Check
              type="checkbox"
              label="I understand that all supplied data must be verifiable through official channels such as website and socials."
              checked={agree1}
              onChange={(e) => setAgree1(e.target.checked)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Check
              type="checkbox"
              label="I understand and accept that DEX Screener reserves the right to reject or modify the provided information."
              checked={agree2}
              onChange={(e) => setAgree2(e.target.checked)}
              required
            />
          </Form.Group>

          <div className="text-center">
            <Button
              type="submit"
              variant="primary"
              disabled={!isFormValid}
              className="order"
            >
              Order Now
            </Button>
          </div>
        </Form>
        )}
      </Container>
    </>
  );
};

export default AdsText;
