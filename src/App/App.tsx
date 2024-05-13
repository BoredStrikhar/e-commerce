import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from 'components/Layout';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/useQueryParamsStoreInit';
import { routeConfig } from '../routes/routes';

const App = () => {
  useQueryParamsStoreInit();

  return (
    <Routes>
      <Route element={<Layout />}>
        {routeConfig.map(({ path, element: Tag }) => {
          return <Route key={path} path={path} element={<Tag />} />;
        })}
      </Route>
    </Routes>
  );
};

export default App;
