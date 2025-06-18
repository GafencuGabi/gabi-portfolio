import React from 'react';
import offers from '../data/offers';
import OfferList from '../components/OfferList';

export default function OffersPage({ favorites, onToggleFavorite, user }) {
  return (
    <div>
      <h2>Oferte disponibile</h2>
      <OfferList offers={offers} favorites={favorites} onToggleFavorite={onToggleFavorite} user={user} />
    </div>
  );
}