import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function History() {
  return (
    <>
      <div>History</div>
      <nav>
        {/* içiçe router oluşturma  */}
        <Link to="about">About</Link>
        <Link to="company">Our Companies</Link>
        <Link to="team">Team</Link>
      </nav>
      {/* içe içe router kullanımı içi outlet gerekli */}
      <Outlet />
    </>
  );
}

export default History;
