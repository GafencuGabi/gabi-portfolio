import React from 'react';
import OfferCard from './OfferCard';

export default function OfferList({ offers, favorites, onToggleFavorite, user }) {
  return (
    <div className="offer-list">
      {offers.map(offer => (
        <OfferCard
          key={offer.id}
          offer={offer}
          isFavorite={favorites.includes(offer.id)}
          onToggleFavorite={onToggleFavorite}
          user={user}
        />
      ))}
    </div>
  );
}