import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../public/pageNotFound.css';

function PageNotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/welcome');
  };

  return (
    <div className="page-not-found-container">
      <h1 className="error-code">404</h1>
      <p className="error-message">¡Oops! La página que buscas no existe.</p>
      <button className="go-home-button" onClick={handleGoHome}>
        Volver al inicio
      </button>
    </div>
  );
}

export default PageNotFound;
