import React, { lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppDispatch } from './stores/store';
import { initializeStore } from './stores/store';
import { DirectionProvider } from './DirectionProvider';

import HomePage from './pages/HomePage';
import CityPage from './pages/CityPage';
import Header from './components/templates/Header/Header';
import MapWithClusters from './pages/MapWithClusters';
import Footer from './components/templates/footer/Footer';

import './i18n';
import './App.css';

const AboutPage = lazy(() => import('./pages/AboutPage'));
const RecommendationsPage = lazy(() => import('./pages/RecommendationsPage'));
const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));
const Profile = lazy(() => import('./components/auth/Profile'));

const styles = {
  app: {
    marginTop: '44px',
  }
};

// GA Measurement ID
const GA_MEASUREMENT_ID = 'G-7GWK2T4DP9';

// Component to handle GA scripts and pageview tracking
function GoogleAnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Inject GA script once
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    const inlineScript = document.createElement('script');
    inlineScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${GA_MEASUREMENT_ID}', { page_path: window.location.pathname });
    `;
    document.head.appendChild(inlineScript);

    // Cleanup optional — remove scripts if component unmounts
    return () => {
      document.head.removeChild(script);
      document.head.removeChild(inlineScript);
    };
  }, []);

  useEffect(() => {
    // Track page views on route change
    if (typeof window.gtag === 'function') {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null; // no UI
}

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // init redux store on app start
    dispatch(initializeStore());
  }, [dispatch]);

  return (
    <DirectionProvider>
      <BrowserRouter>
        <GoogleAnalyticsTracker />
        <div style={{ height: "100%" }}>
          <Header title="Safety Data" />
          <div style={styles.app}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/city" element={<CityPage />} />
              <Route path="/recommend" element={<RecommendationsPage />} />
              <Route path="/map" element={<MapWithClusters />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </DirectionProvider>
  );
}

export default App;
