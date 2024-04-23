import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import { routeConfig } from '../routes/routes.ts';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {routeConfig.map(({ path, element }) => {
            const Tag = element;
            return <Route key={path} path={path} element={<Tag />} />;
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
