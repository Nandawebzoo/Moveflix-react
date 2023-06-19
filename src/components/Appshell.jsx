import React from 'react';
import { Outlet } from 'react-router-dom';
import MoveflixNavbar from './MoveflixNavbar';

function AppShell() {
  return (
    <>
      <MoveflixNavbar />
      <Outlet />
      <footer>Copyright MoveFlix 2023</footer>
    </>
  );
}

export default AppShell;
