import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-icon">🌍</span>
          <span className="logo-text">Travel Agency</span>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Acasă</Link>
          <Link to="/offers" className="nav-link">Oferte</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          {user ? (
            <>
              <Link to="/favorites" className="nav-link">Favorite</Link>
              <div className="user-section">
                <span className="welcome-text">Bun venit, {user}!</span>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            </>
          ) : (
            <Link to="/login" className="login-link">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}