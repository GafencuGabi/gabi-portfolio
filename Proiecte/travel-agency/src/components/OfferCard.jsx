import React from 'react';
import { Link } from 'react-router-dom';

export default function OfferCard({ offer, isFavorite, onToggleFavorite, user }) {
  return (
    <div className="offer-card">
      <div className="offer-image">
        <img src={offer.image} alt={offer.title} />
        {user && (
          <button 
            className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
            onClick={() => onToggleFavorite(offer.id)}
            title={isFavorite ? 'Elimină din favorite' : 'Adaugă la favorite'}
          >
            {isFavorite ? '💚' : '🤍'}
          </button>
        )}
      </div>
      <div className="offer-info">
        <h3>{offer.title}</h3>
        <p>{offer.description}</p>
        <p><b>{offer.price} €</b></p>
        <Link to={`/offers/${offer.id}`} className="details-link">Detalii</Link>
      </div>
    </div>
  );
}