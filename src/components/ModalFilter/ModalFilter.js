import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import './ModalFilter.css'

const ModalFilter = ({ show, handleClose, applyFilters }) => {
  const [filters, setFilters] = useState({
    liquidityMin: "",
    liquidityMax: "",
    marketCapMin: "",
    marketCapMax: "",

    txns24hMin: "",
    txns24hMax: "",
    buys24hMin: "",
    buys24hMax: "",
    sells24hMin: "",
    sells24hMax: "",
    volume24hMin: "",
    volume24hMax: "",
    change24hMin: "",
    change24hMax: "",

    txns6hMin: "",
    txns6hMax: "",
    buys6hMin: "",
    buys6hMax: "",
    sells6hMin: "",
    sells6hMax: "",
    volume6hMin: "",
    volume6hMax: "",
    change6hMin: "",
    change6hMax: "",

    txns1hMin: "",
    txns1hMax: "",
    buys1hMin: "",
    buys1hMax: "",
    sells1hMin: "",
    sells1hMax: "",
    volume1hMin: "",
    volume1hMax: "",
    change1hMin: "",
    change1hMax: "",

    txns5mMin: "",
    txns5mMax: "",
    buys5mMin: "",
    buys5mMax: "",
    sells5mMin: "",
    sells5mMax: "",
    volume5mMin: "",
    volume5mMax: "",
    change5mMin: "",
    change5mMax: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleApply = () => {
    applyFilters(filters);
    handleClose();
  };

  return (
    <Modal className="filter-modal" show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Customize Filters</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Liquidity & Market Cap */}
          <Form.Group>
            <Form.Label>Liquidity ($)</Form.Label>
            <div className="d-flex">
              <Form.Control name="liquidityMin" type="number" placeholder="Min" onChange={handleChange} />
              <Form.Control name="liquidityMax" type="number" placeholder="Max" onChange={handleChange} />
            </div>
          </Form.Group>

          <Form.Group>
            <Form.Label>Market Cap ($)</Form.Label>
            <div className="d-flex">
              <Form.Control name="marketCapMin" type="number" placeholder="Min" onChange={handleChange} />
              <Form.Control name="marketCapMax" type="number" placeholder="Max" onChange={handleChange} />
            </div>
          </Form.Group>

          {/* Timeframes */}
          {["24h", "6h", "1h", "5m"].map((time) => (
            <div key={time}>
              <h5 className="mt-3">{time} Filters</h5>

              <Form.Group>
                <Form.Label>Txns ($)</Form.Label>
                <div className="d-flex">
                  <Form.Control name={`txns${time}Min`} type="number" placeholder="Min" onChange={handleChange} />
                  <Form.Control name={`txns${time}Max`} type="number" placeholder="Max" onChange={handleChange} />
                </div>
              </Form.Group>

              <Form.Group>
                <Form.Label>Buys</Form.Label>
                <div className="d-flex">
                  <Form.Control name={`buys${time}Min`} type="number" placeholder="Min" onChange={handleChange} />
                  <Form.Control name={`buys${time}Max`} type="number" placeholder="Max" onChange={handleChange} />
                </div>
              </Form.Group>

              <Form.Group>
                <Form.Label>Sells</Form.Label>
                <div className="d-flex">
                  <Form.Control name={`sells${time}Min`} type="number" placeholder="Min" onChange={handleChange} />
                  <Form.Control name={`sells${time}Max`} type="number" placeholder="Max" onChange={handleChange} />
                </div>
              </Form.Group>

              <Form.Group>
                <Form.Label>Volume ($)</Form.Label>
                <div className="d-flex">
                  <Form.Control name={`volume${time}Min`} type="number" placeholder="Min" onChange={handleChange} />
                  <Form.Control name={`volume${time}Max`} type="number" placeholder="Max" onChange={handleChange} />
                </div>
              </Form.Group>

              <Form.Group>
                <Form.Label>Change (%)</Form.Label>
                <div className="d-flex">
                  <Form.Control name={`change${time}Min`} type="number" placeholder="Min" onChange={handleChange} />
                  <Form.Control name={`change${time}Max`} type="number" placeholder="Max" onChange={handleChange} />
                </div>
              </Form.Group>
            </div>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleApply}>
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalFilter;
