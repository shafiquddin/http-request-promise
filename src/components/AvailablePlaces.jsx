import { useEffect, useState } from 'react';
import Places from './Places.jsx';

export default function AvailablePlaces({ onSelectPlace }) {

const [availablePlaces,setAvailablePlaces] = useState([]);

//using fetch and then response
// useEffect(()=> {
//   fetch('http://localhost:3000/places').then(response=> response.json()).then(data => setAvailablePlaces(data.places))
// },[])

useEffect(()=>{
const fetchPlaces =async () => {
  const response = await fetch('http://localhost:3000/places');
  const resData = await response.json();
  setAvailablePlaces(resData.places)
}
fetchPlaces();
},[])


  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
