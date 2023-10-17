import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../../styles/CardsStyles.css';

function Home() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/api/productsBd/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setdata(data.payload);
      });
  }, []);
  return (
    <div>
      {data.map((element) => (
        <Card className="card">
          <Card.Img variant="top" src={element.thumbnail} />
          <Card.Body>
            <Card.Title>{element.title}</Card.Title>
            <Card.Text>{element.description}</Card.Text>
            <Card.Text>{element.price}</Card.Text>
            <Button variant="primary">Agregar al carrito</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Home;
