import { useEffect } from 'react';
import Places from './Places.jsx';
import { useState } from 'react';
import Error from './Error.jsx';
import {fetchAvailablePlaces} from '../http.js';
import { sortPlacesByDistance } from '../loc.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces,setAvailablePlaces] = useState([]);
  const [isFetching,setIsFetching] = useState(false);
  const [error,setError] = useState();
 
useEffect(()=>{
  const fetchPlaces = async () => {
    setIsFetching(true);
    try{
      const places = await fetchAvailablePlaces(); 
      navigator.geolocation.getCurrentPosition(position=>{
        const sortedPlaces = sortPlacesByDistance(places,position.coords.latitude,position.coords.longitude);
        setAvailablePlaces(sortedPlaces);
        setIsFetching(false)
      })
    }catch(error){
      setError({message:error.message || 'could not fetch the place try again later'});
      setIsFetching(false);
    }
  }
  fetchPlaces();
},[])

if(error){
  return <Error title="An error occured" message={error.message}/>
}

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      loadingText='fetching places'
      isLoading = {isFetching}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
