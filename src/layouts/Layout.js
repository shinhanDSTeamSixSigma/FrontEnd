import Header from './Header';
import { Outlet } from 'react-router-dom';
import React from 'react';

export default function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
