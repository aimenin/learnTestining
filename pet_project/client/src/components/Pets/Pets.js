import { useEffect, useState } from 'react';
import axios from 'axios';

import Filter from '../Filter/Filter';
import Cards from '../Cards/Cards';

import './Pets.css';

const Pets = () => {
  const [cats, setCats] = useState([]);

  const fetchCats = async () => {
    const { data } = await axios.get('http://localhost:4000/cats');
    setCats(data);
  };

  useEffect(() => {
    fetchCats();
  });

  return (
    <div className="container">
      <div className="app-container">
        <Filter />
        <Cards cats={cats} />
      </div>
    </div>
  );
};

export default Pets;
