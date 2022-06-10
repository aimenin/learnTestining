import { useState } from 'react';

import './Card.css';
import heart from '../../svgs/heart.svg';
import heartFilled from '../../svgs/heartFilled.svg';

const Card = ({
  name,
  phone,
  email,
  image,
  favoured,
  updateFavored,
  index,
}) => {
  const [isFaVoured, setIsFavoured] = useState(favoured);

  const handleHeartClick = (event) => {
    setIsFavoured(!isFaVoured);
    updateFavored(index, !isFaVoured);
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
