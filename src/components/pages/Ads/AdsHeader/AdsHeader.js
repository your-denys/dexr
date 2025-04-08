import { useState, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../Authorization"; // Firebase auth
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./AdsHeader.css";

function AdsHeader() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/ad");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="ad-header">
      <Navbar expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="/" className="text-light">
            <svg
              width="50"
              height="50"
              viewBox="0 0 100 100"
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="40" />
            </svg>
            DEX Screener <span className="marketplace">Marketplace</span>
          </Navbar.Brand>
          <Nav className="ms-auto d-flex align-items-center">
            {user ? (
              <div className="user-panel">
                <p className="username">{user.displayName}</p>
                <button onClick={handleLogout} className="sign-link">
                  Log Out
                </button>
              </div>
            ) : (
              <Link to="/signin" className="sign-link">
                Sign Up
              </Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default AdsHeader;
