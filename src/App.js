import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Card from 'react-bootstrap/Card';
// import HomePage from './components/pages/HomePage';
// import CityPage from './components/pages/CityPage';
//import AboutPage from './components/pages/AboutPage';
import Header from './components/templates/Headr';
// import Footer from './components/templates/Footer';
import Loader from './components/atoms/Loader';
import './i18n';
import './App.css';
// import Drawer from './components/organisms/Drawer';
// import MyFilters from './components/pages/MyFilters';
// import { useTranslate } from './hooks/transelate'

const AboutPage = lazy(() => import('./components/pages/AboutPage'));
// const UpdateImagePage = lazy(() => import('./components/pages/UpdateImagePage'));
// const MyFilters = lazy(() => import('./components/pages/MyFilters'))


const styles = {
   app: {
      marginTop: '44px',
   }
};

function App() {
   return (
      <BrowserRouter>
         {/* <Card display="flex" height="100%"> */}
         <div style={{ height: "100%" }}>
            <Header title="Safety Data" />
            <div style={styles.app}>
        
               <Routes>
               <Route path="/" element={<AboutPage />}>
                  <Route index element={<AboutPage />} />
                  <Route path="blogs" element={<AboutPage />} />
                  <Route path="contact" element={<AboutPage />} />
                  <Route path="*" element={<AboutPage />} />
               </Route>
               </Routes>
           
            </div>
            {/* <Footer /> */}
         </div>
         {/* </Card> */}
      </BrowserRouter>
   );
}


export default App;