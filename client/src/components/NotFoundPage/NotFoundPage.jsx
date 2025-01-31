import React from 'react';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404</h1>
      <p className="not-found-message">Oops! The page you're looking for doesn't exist.</p>
      <a href="/" className="not-found-link">Go Back Home</a>
    </div>
  );
};

export default NotFoundPage;
