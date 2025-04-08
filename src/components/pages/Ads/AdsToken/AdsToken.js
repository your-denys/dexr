import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import AdsHeader from "../AdsHeader/AdsHeader";
import "./AdsToken.css";
import { useNavigate } from "react-router-dom";


const adPackages = [
  { id: 1, oldViews: "10k", newViews: "20k", price: 299 },
  { id: 2, oldViews: "25k", newViews: "50k", price: 699 },
  { id: 3, oldViews: "50k", newViews: "100k", price: 999 },
  { id: 4, oldViews: "100k", newViews: "200k", price: 1999 },
  { id: 5, oldViews: "200k", newViews: "400k", price: 3999 },
  { id: 6, oldViews: "400k", newViews: "800k", price: 6999 },
];

const AdsToken = () => {
  const navigate = useNavigate();

    const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [selectedPackage, setSelectedPackage] = useState(null);

  const [chain, setChain] = useState("Sol");
  const [address, setAddress] = useState("");

  const [showWebsite, setShowWebsite] = useState(false);
  const [showX, setShowX] = useState(false);
  const [showTg, setShowTg] = useState(false);
  const [showDiscord, setShowDiscord] = useState(false);

  const [website, setWebsite] = useState("");
  const [x, setX] = useState("");
  const [tg, setTg] = useState("");
  const [discord, setDiscord] = useState("");

  const [title, setTitle] = useState("");
  const [pitch, setPitch] = useState("");

  const [icon, setIcon] = useState(null);
  const [iconError, setIconError] = useState("");

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

  const validateImage = (file, type, onError, onValid) => {
    const allowedTypes = ["image/png", "image/jpeg", "image/webp", "image/gif"];
    const maxSize = 4.5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      onError("Unsupported file format!");
      return;
    }

    if (file.size > maxSize) {
      onError("File is too large!");
      return;
    }

    const img = new Image();
    img.onload = () => {
      const { width, height } = img;

      if (type === "icon") {
        if (width < 100 || width !== height) {
          onError("Invalid aspect ratio! (required 1:1)");
        } else {
          onValid(file);
        }
      }
    };

    img.src = URL.createObjectURL(file);
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    validateImage(
      file,
      type,
      (err) => {
        if (type === "icon") {
          setIcon(null);
          setIconError(err);
        }
      },
      (validFile) => {
        if (type === "icon") {
          setIcon(validFile);
          setIconError("");
        }
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      chain,
      address,
      selectedPackage,
      website,
      x,
      tg,
      discord,
      title,
      pitch,
      icon,
      contactDiscord,
      contactTg,
    });

    setIsSubmitted(true);

    // добавить логику отправки
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

          <h4 className="fw-bold mb-2 mt-5 ">Ad info</h4>
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
                    <div className=" small mb-1">
                      <s>{pkg.oldViews} views</s>
                    </div>
                    <h5 className="fw-bold">{pkg.newViews} views</h5>
                    <span className=" mt-2">${pkg.price.toFixed(2)}</span>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* {/* Title and pitch */}

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

          <Form.Group className="mb-3">
            <Form.Label>Pitch</Form.Label>
            <Form.Control
              type="text"
              placeholder="A short description of your project to get people interested"
              value={pitch}
              onChange={(e) => setPitch(e.target.value)}
            />
          </Form.Group>

          {/* Images */}

          <label className=" mb-3 mt-4 ">Images</label>
          <div className="mb-4">
            <ul className="small text-muted mb-2">
              <li>
                1:1 aspect ratio (square, for example <code>100×100px</code> or{" "}
                <code>500×500px</code>)
              </li>
              <li>min. image width: 100px</li>
              <li>support formats: png, jpg, webp and gif</li>
              <li>max. file size: 4.5MB</li>
            </ul>

            <Form.Group>
              <Form.Label className="visually-hidden">Icon Upload</Form.Label>
              <Button
                variant="outline-light"
                onClick={() => document.getElementById("icon-upload").click()}
                className="mb-2"
              >
                Upload image
              </Button>
              <Form.Control
                id="icon-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => handleImageUpload(e, "icon")}
              />
              {icon && (
                <div className="text-success small">Uploaded: {icon.name}</div>
              )}
              {iconError && (
                <div className="text-danger small">
                  Invalid aspect ratio! (required 1:1)
                </div>
              )}
            </Form.Group>
          </div>

          {/* Links */}

          <h4 className="fw-bold mt-5 mb-3">
            Links
            {/* <span className=" fw-normal">(optional)</span> */}
          </h4>

          <div className="d-flex flex-column align-items-start gap-2 mb-4">
            {!showWebsite && (
              <Button
                variant="outline-light"
                onClick={() => setShowWebsite(true)}
              >
                Add Website URL
              </Button>
            )}
            {showWebsite && (
              <Form.Group style={{ width: "100%" }}>
                <Form.Label className="fw-semibold">Website URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="https://..."
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </Form.Group>
            )}

            {!showX && (
              <Button variant="outline-light" onClick={() => setShowX(true)}>
                Add X URL
              </Button>
            )}
            {showX && (
              <Form.Group style={{ width: "100%" }}>
                <Form.Label className="fw-semibold">X (Twitter) URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="https://..."
                  value={x}
                  onChange={(e) => setX(e.target.value)}
                />
              </Form.Group>
            )}

            {!showTg && (
              <Button variant="outline-light" onClick={() => setShowTg(true)}>
                Add Telegram URL
              </Button>
            )}
            {showTg && (
              <Form.Group style={{ width: "100%" }}>
                <Form.Label className="fw-semibold">Telegram URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="https://..."
                  value={tg}
                  onChange={(e) => setTg(e.target.value)}
                />
              </Form.Group>
            )}

            {!showDiscord && (
              <Button
                variant="outline-light"
                onClick={() => setShowDiscord(true)}
              >
                Add Discord URL
              </Button>
            )}
            {showDiscord && (
              <Form.Group style={{ width: "100%" }}>
                <Form.Label className="fw-semibold">Discord URL</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="https://..."
                  value={discord}
                  onChange={(e) => setDiscord(e.target.value)}
                />
              </Form.Group>
            )}
          </div>

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
                  <div className=" small">{selectedPackage.newViews} views</div>
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

export default AdsToken;
