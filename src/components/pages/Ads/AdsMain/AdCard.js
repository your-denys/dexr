import React from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth } from "../Authorization"; // Firebase auth
import { onAuthStateChanged } from "firebase/auth";
import "./AdsMain.css";

const AdCard = ({ title, description, imgSrc, link }) => {
  const navigate = useNavigate();
  const [user, setUser] = React.useState(null);

  // Отслеживаем авторизацию пользователя
  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleBuyClick = () => {
    if (user) {
      navigate(link); 
    } else {
      localStorage.setItem("redirectAfterLogin", link); // Сохраняем ссылку в localStorage

      navigate("/signin"); 
    }
  };

  return (
    <Card className="h-100 text-center ad-card">
      <Card.Img src={imgSrc} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary" onClick={handleBuyClick}>
          Buy
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AdCard;
