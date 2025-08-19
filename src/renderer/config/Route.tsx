import { HashRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { MainLayout } from '../layout/Maylayout';
import { Home } from '../pages/Home/Home';
import { ChangingBanner } from '../pages/ChangingBanner/ChangingBanner';
import { Package } from '../pages/Package/Package';

export const RouteRender: React.FC = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="changingBanner" element={<ChangingBanner />} />
        <Route path="package" element={<Package />} />
      </Route>
    </Routes>
  </HashRouter>
);
