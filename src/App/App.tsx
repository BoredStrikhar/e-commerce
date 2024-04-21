import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import SingleProductPage from './pages/SingleProductPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/product">
            <Route path=":id" element={<SingleProductPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
