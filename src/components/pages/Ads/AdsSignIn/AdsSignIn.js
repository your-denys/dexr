import React, { useEffect } from "react";
import {Authorization} from '../Authorization.js'
import { Button, Container } from "react-bootstrap";
import { Google } from "react-bootstrap-icons"; // Иконка Google
import './AdsSignIn.css'
import { onAuthStateChanged } from "firebase/auth"; // Отслеживание авторизации
import { auth } from '../Authorization.js' // Импорт Firebase Auth
import { useNavigate } from "react-router-dom"; // Импортируем навигацию


const AdsSignIn = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const redirectPath = localStorage.getItem("redirectAfterLogin") || "/ad";
        localStorage.removeItem("redirectAfterLogin"); // Очищаем после редиректа
        navigate(redirectPath);
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div className="signin-wrapper">
    <Container className="signin-container">
    <h1>Sign In</h1>
    <p>Access your account securely</p>
      <Button onClick={Authorization} className="google-btn">
      <Google className="google-icon" /> Sign in with Google
      </Button>
      </Container>
    </div>
  );
};

export default AdsSignIn;
