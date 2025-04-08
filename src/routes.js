// src/routes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout.js";
import MainPage from "./components/pages/MainPage/MainPage.js";
import NewPairPage from "./components/pages/NewPairPage/NewPairPage.js";
import CoinPage from "./components/pages/CoinPage/CoinPage.js";
import Multicharts from "./components/pages/Multicharts/Multicharts.js";
import AdsMain from "./components/pages/Ads/AdsMain/AdsMain.js";
import AdsSignIn from "./components/pages/Ads/AdsSignIn/AdsSignIn";
import AdsUpdate from "./components/pages/Ads/AdsUpdate/AdsUpdate.js";
import ProtectedRoute from "./components/pages/Ads/ProtectedRoute.js";
import AdsToken from "./components/pages/Ads/AdsToken/AdsToken.js";
import AdsText from "./components/pages/Ads/AdsText/AdsText.js";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<MainPage />} />
        <Route path="/new-pairs" element={<NewPairPage />} />
        <Route path="/new-pairs/:page" element={<NewPairPage />} />
        <Route path="/:page" element={<MainPage />} />

        <Route path="/coin/:id" element={<CoinPage />} />
        <Route
          path="/:page/coin/:id"
          element={<Navigate to="/coin/:id" replace />}
        />
        <Route path="/multicharts" element={<Multicharts />} />
      </Route>
      <Route path="/ad" element={<AdsMain />} />
      import ProtectedRoute from "./ProtectedRoute";

<Route
  path="/ad/update-token"
  element={
    <ProtectedRoute>
      <AdsUpdate />
    </ProtectedRoute>
  }
/>

<Route
  path="/ad/banner-advertise"
  element={
    <ProtectedRoute>
      <AdsToken/>
    </ProtectedRoute>
  }
/>
<Route
  path="/ad/text-advertise"
  element={
    <ProtectedRoute>
      <AdsText/>
    </ProtectedRoute>
  }
/>
      <Route path="/signin" element={<AdsSignIn />} />
    </Routes>
  );
};

export default AppRoutes;
