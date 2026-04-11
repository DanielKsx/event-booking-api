import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Container, Spinner } from 'reactstrap';
import { getConcerts, getRequest, loadConcertsRequest } from '../../../redux/concertsRedux';

const Prices = () => {
  const dispatch = useDispatch();
  const concerts = useSelector(getConcerts);
  const request = useSelector(getRequest);

  useEffect(() => {
    dispatch(loadConcertsRequest());
  }, [dispatch]);

  if (request.pending) return <Spinner />;
  if (request.error) return <p>Error: {request.error}</p>;

  return (
    <Container>
      <h1>Prices</h1>
      <p>
        Prices may differ according the day of the festival. Remember that ticket includes not only the star performance,
        but also 10+ workshops.
      </p>

      <Alert color="info">
        Attention! <strong>Children under 4 can go freely with you without any other fee!</strong>
      </Alert>

      {concerts.map(concert => (
        <div key={concert._id}>
          <h2>Day {concert.day}</h2>
          <p>Price: {concert.price}$</p>
          <p>Performer: {concert.performer}</p>
        </div>
      ))}
    </Container>
  );
};

export default Prices;