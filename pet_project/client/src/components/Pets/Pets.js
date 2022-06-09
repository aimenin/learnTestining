import { useEffect, useState } from 'react';
import axios from 'axios';

import Filter from '../Filter/Filter';
import Cards from '../Cards/Cards';

import './Pets.css';

const Pets = () => {
  const [cats, setCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);
  const [filters, setFilters] = useState({
    gender: 'any',
  });

  const fetchCats = async () => {
    const { data } = await axios.get('http://localhost:4000/cats');
    setCats(data);
    setFilteredCats(data);
  };

  useEffect(() => {
    fetchCats();
  }, []);

  useEffect(() => {
    let catsFiltered = [...cats];
    if (filters.gender !== 'any') {
      catsFiltered = catsFiltered.filter(
        (cat) => cat.gender === filters.gender
      );
      setFilteredCats(catsFiltered);
    } else {
      setFilteredCats(cats);
    }
  }, [filters]);

  return (
    <div className="container">
      <div className="app-container">
        <Filter filters={filters} setFilters={setFilters} />
        <Cards cats={filteredCats} />
      </div>
    </div>
  );
};

export default Pets;
