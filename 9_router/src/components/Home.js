import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  // useNavigate hook'u - Sayfalar arası gecis yapmak icin kullanilir
  const navigate = useNavigate();
  return (
    <>
      <div>Home</div>
      {/* navigate('/mission') --> Mission sayfasına gecis yapar */}
      <button onClick={() => navigate('/mission')}>Mission a Git</button>
    </>
  );
}

export default Home;
