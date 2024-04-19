import * as React from 'react';
import Header from 'components/Header';
import MainPage from './pages/MainPage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SingleProductPage from './pages/SingleProductPage';

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/product">
          <Route path=":id" element={<SingleProductPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
