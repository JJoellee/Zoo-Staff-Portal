import React from 'react';
import './AnimalCard.css'; // Import the CSS for the AnimalCard component


import { useState } from 'react';



function getRandomImage() {
    const totalImages = 5; // Replace this with the number of images in your assets folder
    const randomIndex = Math.floor(Math.random() * totalImages) + 1;
    return `/Assets/a${randomIndex}.png`;
  }

  function DateToAge(date){
    const birthdate = new Date(date);
    const ageInMs = Date.now() - birthdate.getTime();
    const ageInYears = Math.floor(ageInMs / 31557600000);
    return ageInYears
  }
  

function AnimalCard({ animal }) {
    const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="card" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`card-inner ${isFlipped ? 'card-flip' : ''}`}>
            <div className="card-front">
                <img src={getRandomImage()} alt="Animal" className="card-img-top" />
                <h5 className="card-title">Name: {animal.name}</h5>
            </div>
            <div className="card-back">
                <p className="card-text">Specie: {animal.specie}</p>
                <br/>
                <p className="card-text">Age: {DateToAge(animal.date_of_birth)}</p>
            </div>
        </div>
</div>

  );
}

export default AnimalCard;
