import Card from '../Card/Card';
import './Cards.css';

const Cards = ({ cats, setCats }) => {
  const updateFavored = (index, favoured) => {
    const updatedCats = [...cats];
    updatedCats[index].favoured = favoured;
    setCats(updatedCats);
  };

  return (
    <div className="pet-cards-container">
      {cats.map((cat, index) => (
        <Card
          key={cat.id}
          name={cat.name}
          phone={cat.phone}
          email={cat.email}
          image={cat.image}
          favoured={cat.favoured}
          updateFavored={updateFavored}
          index={index}
        />
      ))}
    </div>
  );
};

export default Cards;
