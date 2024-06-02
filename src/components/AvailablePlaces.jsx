import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false)
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  //using fetch and then response
  // useEffect(()=> {
  //   fetch('http://localhost:3000/places').then(response=> response.json()).then(data => setAvailablePlaces(data.places))
  // },[])

  useEffect(() => {
    const fetchPlaces = async () => {
      setIsFetching(true);
      try {
        const response = await fetch('http://localhost:3000/places');
        const resData = await response.json();
        if (!response.ok) {
          const error = new Error('failed to fetch here');
          throw error
        }
        setAvailablePlaces(resData.places);
      } catch (error) {
        setError({ message: error.message || 'could not fetch places please try again later' })
      }
      setIsFetching(false);
    }
    fetchPlaces();
  }, [])


  if (error) {
    return <Error title="An Error occured!" message={error.message} />
  }


  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="fetching place data"
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
