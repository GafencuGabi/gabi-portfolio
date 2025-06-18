import React from 'react';

export default function OfferDetails({ offer }) {
  if (!offer) return <p>Oferta nu există.</p>;
  return (
    <div className="offer-details">
      <img src={offer.image} alt={offer.title} className="details-image" />
      <h2>{offer.title}</h2>
      <p><b>Locație:</b> {offer.location}</p>
      <p><b>Durată:</b> {offer.duration}</p>
      <p><b>Categorie:</b> {offer.category}</p>
      <p><b>Preț:</b> {offer.price} €</p>
      <p className="details-desc">{offer.details}</p>
    </div>
  );
}