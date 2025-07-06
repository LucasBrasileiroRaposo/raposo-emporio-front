import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/button/Button';
import './NotFound.css';

export default function NotFound() {
    const navigate = useNavigate(); 
    const handleGoHome = () => {
      navigate('/'); 
    };
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Oops! A página que você está procurando não foi encontrada.</p>
      <Button onClick={handleGoHome} className="not-found-button">Voltar para a Página Inicial</Button>
    </div>
  );
}