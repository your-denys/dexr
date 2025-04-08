import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdsHeader from "../AdsHeader/AdsHeader";
import "./AdsUpdate.css";

const AdsUpdate = () => {
  const navigate = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [chain, setChain] = useState("Sol");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const [showWebsite, setShowWebsite] = useState(false);
  const [showDocs, setShowDocs] = useState(false);
  const [showX, setShowX] = useState(false);
  const [showTg, setShowTg] = useState(false);
  const [showDiscord, setShowDiscord] = useState(false);

  const [website, setWebsite] = useState("");
  const [docs, setDocs] = useState("");
  const [x, setX] = useState("");
  const [tg, setTg] = useState("");
  const [discord, setDiscord] = useState("");

  const [icon, setIcon] = useState(null);
  const [iconError, setIconError] = useState("");
  const [headerImg, setHeaderImg] = useState(null);
  const [headerError, setHeaderError] = useState("");

  const [lockedAddresses, setLockedAddresses] = useState([]);
  const [lockedInput, setLockedInput] = useState("");
  const [lockedDescription, setLockedDescription] = useState("");
  const [showLockedInput, setShowLockedInput] = useState(false);

  const [contactDiscord, setContactDiscord] = useState("");
  const [contactTg, setContactTg] = useState("");

  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);

  const isFormValid = agree1 && agree2;

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

      if (type === "header") {
        const ratio = width / height;
        if (width < 600 || Math.abs(ratio - 3) > 0.05) {
          onError("Invalid aspect ratio! (required 3:1)");
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
        } else {
          setHeaderImg(null);
          setHeaderError(err);
        }
      },
      (validFile) => {
        if (type === "icon") {
          setIcon(validFile);
          setIconError("");
        } else {
          setHeaderImg(validFile);
          setHeaderError("");
        }
      }
    );
  };

  const addLockedAddress = () => {
    if (lockedInput && !lockedAddresses.includes(lockedInput)) {
      setLockedAddresses([...lockedAddresses, lockedInput]);
      setLockedInput("");
    }
  };

  const removeLockedAddress = (addr) => {
    setLockedAddresses(lockedAddresses.filter((a) => a !== addr));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      chain,
      address,
      description,
      website,
      docs,
      x,
      tg,
      discord,
      icon,
      headerImg,
      lockedAddresses,
      lockedDescription,
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
        className="py-5 ads-update"
        style={{ maxWidth: "800px", color: "white" }}
      >
        <h1 className="mb-4 fw-bold text-center">Enhanced Token Info</h1>
        {isSubmitted ? (
          <div className="text-center mt-5">
            <h2 className="fw-bold mb-3">Thank you for your submission!</h2>
            <p className="lead mb-4">
              We've successfully received your order and will start processing
              it shortly. If we need any additional details, we’ll reach out via
              the contact info provided.
            </p>
            <p>You will be redirected to the homepage in 5 seconds.</p>
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

            <Form.Group className="mb-4">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Project description. Plain text only..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            {/* Images */}

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

              {!showDocs && (
                <Button
                  variant="outline-light"
                  onClick={() => setShowDocs(true)}
                >
                  Add DOCS URL
                </Button>
              )}
              {showDocs && (
                <Form.Group style={{ width: "100%" }}>
                  <Form.Label className="fw-semibold">DOCS URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="https://..."
                    value={docs}
                    onChange={(e) => setDocs(e.target.value)}
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
                  <Form.Label className="fw-semibold">
                    X (Twitter) URL
                  </Form.Label>
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

            {/* Images */}

            <h4 className="fw-bold mb-3 mt-5 ">Images</h4>

            {/* ICON */}
            <div className="mb-4">
              <h6 className="fw-semibold mb-2">Icon</h6>
              <ul className="small text-muted mb-2">
                <li>
                  1:1 aspect ratio (square, for example <code>100×100px</code>{" "}
                  or <code>500×500px</code>)
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
                  <div className="text-success small">
                    Uploaded: {icon.name}
                  </div>
                )}
                {iconError && (
                  <div className="text-danger small">
                    Invalid aspect ratio! (required 1:1)
                  </div>
                )}
              </Form.Group>
            </div>

            {/* HEADER */}
            <div className="mb-4">
              <h6 className="fw-semibold mb-2">Header</h6>
              <ul className="small text-muted mb-2">
                <li>
                  3:1 aspect ratio (rectangle, for example{" "}
                  <code>600×200px</code> or <code>1500×500px</code>)
                </li>
                <li>min. image width: 600px</li>
                <li>support formats: png, jpg, webp and gif</li>
                <li>max. file size: 4.5MB</li>
              </ul>

              <Form.Group>
                <Form.Label className="visually-hidden">
                  Header Upload
                </Form.Label>
                <Button
                  variant="outline-light"
                  onClick={() =>
                    document.getElementById("header-upload").click()
                  }
                  className="mb-2"
                >
                  Upload image
                </Button>
                <Form.Control
                  id="header-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleImageUpload(e, "header")}
                />
                {headerImg && (
                  <div className="text-success small">
                    Uploaded: {headerImg.name}
                  </div>
                )}
                {headerError && (
                  <div className="text-danger small">
                    Invalid aspect ratio! (required 3:1)
                  </div>
                )}
              </Form.Group>
            </div>

            {/* Locked Supply */}

            <h4 className="fw-bold mt-5 mb-3">
              Locked Supply <span className=" fw-normal">(optional)</span>
            </h4>

            <p className="small mb-3">
              Locked Supply refers to the portion of a cryptocurrency's total
              supply that is not available for trading or circulation. These
              tokens are often held in reserve for future use, such as
              development, partnerships, or team incentives. Not to be confused
              with Locked Liquidity.
            </p>

            {!showLockedInput ? (
              <Button
                variant="outline-light"
                onClick={() => setShowLockedInput(true)}
                className="mb-3"
              >
                Add
              </Button>
            ) : (
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Locked address</Form.Label>
                <Row className="g-2">
                  <Col sm={9}>
                    <Form.Control
                      type="text"
                      placeholder="0x..."
                      value={lockedInput}
                      onChange={(e) => setLockedInput(e.target.value)}
                    />
                  </Col>
                  <Col sm={3}>
                    <Button
                      variant="outline-light"
                      className="w-100"
                      onClick={() => {
                        addLockedAddress();
                        setShowLockedInput(false);
                      }}
                      disabled={!lockedInput.trim()}
                    >
                      Add address
                    </Button>
                  </Col>
                </Row>
              </Form.Group>
            )}

            {lockedAddresses.length > 0 && (
              <div className="mb-3">
                <ul className="list-unstyled small mb-0">
                  {lockedAddresses.map((addr, idx) => (
                    <li
                      key={idx}
                      className="d-flex justify-content-between align-items-center py-1 px-2 bg-dark rounded mb-1"
                    >
                      <span className="text-break">{addr}</span>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-danger p-0"
                        onClick={() => removeLockedAddress(addr)}
                        style={{ textDecoration: "none" }}
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Form.Group className="mb-4">
              <Form.Label>Supply Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Provide a brief explanation of why and how supply is locked"
                value={lockedDescription}
                onChange={(e) => setLockedDescription(e.target.value)}
              />
            </Form.Group>

            {/* Contact Info */}

            <h4 className="fw-bold mt-5 mb-3">
              Contact Info <span className="fw-normal">(optional)</span>
            </h4>
            <p className="small mb-4">
              Provide your Discord and/or Telegram usernames if you want us to
              be able to quickly reach you out in case of any additional
              questions or clarifications. This can speed up the process of
              approving your order!
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

            {/* Order Summary */}
            <h4 className="fw-bold mt-5 mb-3">Order Summary</h4>
            <div className="d-flex justify-content-between border-bottom pb-2 mb-2">
              <div>
                <strong>Enhanced Token Info</strong>
                <div className="small text-info">
                  ETA: Average processing time after receiving payment is less
                  than 15 minutes.
                </div>
              </div>
              <div className="text-end">
                <div className="text-danger text-decoration-line-through">
                  $499.00
                </div>
                <div className="fw-bold">$299.00</div>
              </div>
            </div>

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

export default AdsUpdate;
