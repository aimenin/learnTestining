import Card from './components/Card/Card';
import Cards from './components/Cards/Cards';
import cats from './mocks/cats.json';

const cardProps = {
  name: 'Sydney',
  phone: '111-111-1111',
  email: 'test@nuimail.com',
  image: {
    url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80',
    alt: 'cute cat',
  },
  favoured: false,
};

function App() {
  return (
    <div>
      <Cards cats={cats} />
    </div>
  );
}

export default App;
