import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import SearchModal from "./SearchModal";
import './SearchModal.css'


const SearchButton = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  React.useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "/") {
        event.preventDefault();
        handleShow();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <>
      <div className="mt-1 search-button-wrapper">
        <Button className="search-button" onClick={handleShow}>
          <Search className="search-icon" />
          <span className="search-text">Search token</span>
          <span className="search-shortcut">/</span>
        </Button>
      </div>
      <SearchModal show={showModal} handleClose={handleClose} />
    </>
  );
};

export default SearchButton;
