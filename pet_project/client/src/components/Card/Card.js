import { useContext, useState } from 'react';

import './Card.css';
import heart from '../../svgs/heart.svg';
import heartFilled from '../../svgs/heartFilled.svg';
import { PetsContext } from '../Pets/Pets';

const Card = ({ name, phone, email, image, favoured, index }) => {
  const { cats, setCats } = useContext(PetsContext);
  const [isFaVoured, setIsFavoured] = useState(favoured);

  const handleHeartClick = (event) => {
    setIsFavoured(!isFaVoured);
    updateFavored(index, !isFaVoured);
  };

  const updateFavored = (index, favoured) => {
    const updatedCats = [...cats];
    updatedCats[index].favoured = favoured;
    setCats(updatedCats);
  };

  return (
    <article className="card">
      <div className="card-header">
        <img
          src={image.url}
          alt={image.alt}
          className="card-image"
          width="100%"
          height="100%"
        />
        <button className="heart" onClick={handleHeartClick}>
          {isFaVoured ? (
            <img src={heartFilled} alt="filled heart" />
          ) : (
            <img src={heart} alt="outlined heart" />
          )}
        </button>
      </div>
      <div className="card-content">
        <h3>{name}</h3>
        <p>{phone}</p>
        <p>{email}</p>
      </div>
    </article>
  );
};

export default Card;
