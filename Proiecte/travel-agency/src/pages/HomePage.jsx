import React from 'react';

export default function HomePage() {
  return (
    <div className="home-page">
      <h1>Bine ai venit la Travel Agency!</h1>
      <p>Descoperă cele mai bune oferte de vacanță, city break sau aventură. Rezervă-ți următoarea experiență chiar acum!</p>
      <img src={process.env.PUBLIC_URL + '/grecia.jpg'} alt="Vacanță" className="home-image" />
    </div>
  );
}