import React from 'react';
import { useParams } from 'react-router-dom';
import offers from '../data/offers';
import OfferDetails from '../components/OfferDetails';

export default function OfferDetailsPage() {
  const { id } = useParams();
  const offer = offers.find(o => o.id === id);
  return <OfferDetails offer={offer} />;
}