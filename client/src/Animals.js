import React, { useEffect, useState } from 'react';
import AnimalCard from './AnimalCard';
import "./Animals.css";

function Animals() {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/animals')
      .then((response) => response.json())
      .then((data) => setAnimals(data));
  }, []);

  return (
    <div>
      <h2>Animals</h2>
      <div className="container">
        <div className="row animal-grid">
          {animals.map((animal) => (
            <div key={animal.id} className="col-md-4">
              <AnimalCard animal={animal} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Animals;
