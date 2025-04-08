import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar, Button } from "react-bootstrap";
import {
  StarFill,
  Fire,
  Grid3x3GapFill,
  MegaphoneFill,
  TwitterX,
  Telegram,
  Discord,
} from "react-bootstrap-icons";
import { auth } from "../pages/Ads/Authorization"; // Firebase Auth
import { signOut, onAuthStateChanged } from "firebase/auth"; // Firebase функции
import "./Sidebar.css";
import Watchlist from "./Watchlist/Watchlist";
import SearchButton from "./SearchModal/SearchButton";

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const truncatedEmail =
    user?.email.length > 20 ? `${user?.email.substring(0, 20)}...` : user?.email;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="sidebar">
      <Navbar.Brand className="nav-block" href="/">
        <svg
          width="50"
          height="50"
          viewBox="0 0 100 100"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="40" />
        </svg>
        Logo
      </Navbar.Brand>
      <SearchButton />

      <div className="sidebar-menu">
        <div className="sign-link-wrapper mt-2">
          {!user && (
            <Link to="/signin" className="sign-link">
              Sign Up
            </Link>
          )}
        </div>

        <ul className="mt-2">
          <li>
            <Link to="/">
              <StarFill className="me-2" />
              Top Meme
            </Link>
          </li>
          <li>
            <Link to="/new-pairs">
              <Fire className="me-2" />
              New Meme
            </Link>
          </li>
          <li>
            <Link to="/multicharts">
              <Grid3x3GapFill className="me-2" /> Multicharts
            </Link>
          </li>
          <li>
            <Link to="/ad">
              <MegaphoneFill className="me-2" />
              Advertise
            </Link>
          </li>
        </ul>
      </div>

      <Watchlist />
      <footer className="social-bar">
        {user && (
          <div className="user-info">
            <p
              className="user-email"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {truncatedEmail}
            </p>
            {isHovered && <div className="email-tooltip">{user.email}</div>}
            <button className="sign-out" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        )}
        <div className="sidebar-media">
          <TwitterX className="icon" />
          <Telegram className="icon" />
          <Discord className="icon" />
        </div>
      </footer>
    </div>
  );
};

export default Sidebar;
