import Pets from './components/Pets/Pets';

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
      <Pets />
    </div>
  );
}

export default App;
