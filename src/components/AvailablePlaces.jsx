import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import {fetchAvailablePlaces} from '../http.js';

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
        const places = await fetchAvailablePlaces();
         navigator.geolocation.getCurrentPosition(position=>{
          const sortedPalces = sortPlacesByDistance(places,position.coords.latitude,position.coords.longitude)
          setAvailablePlaces(sortedPalces);
          setIsFetching(false);
        })
       
      } catch (error) {
        setError({ message: error.message || 'could not fetch places please try again later' })
        setIsFetching(false);
      }
    
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
