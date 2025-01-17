import React from 'react';
import { useNavigate } from 'react-router-dom';

function Misssion() {
  const navigate = useNavigate();
  return (
    <>
      <div>Misssion</div>
      <button onClick={() => navigate('/')}>Geriye Dön</button>
    </>
  );
}

export default Misssion;
