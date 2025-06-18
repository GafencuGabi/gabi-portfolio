import React from 'react';
import offers from '../data/offers';
import OfferList from '../components/OfferList';

export default function FavoritesPage({ favorites, onToggleFavorite, user }) {
  const favOffers = offers.filter(o => favorites.includes(o.id));
  return (
    <div>
      <h2>Favorite</h2>
      {favOffers.length === 0 ? (
        <p>Nu ai încă oferte favorite. Adaugă câteva din pagina de oferte!</p>
      ) : (
        <OfferList offers={favOffers} favorites={favorites} onToggleFavorite={onToggleFavorite} user={user} />
      )}
    </div>
  );
}