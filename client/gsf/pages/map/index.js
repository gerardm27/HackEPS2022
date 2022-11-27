import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

const Mapa = dynamic(() => import("../../components/Mapa"), {
    loading: () => "Loading...",
    ssr: false
});

export default function Map() {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/greggs.json?access_token=sk.eyJ1IjoiZ2VyYXJkbTI3IiwiYSI6ImNsYXlhemFkYzA1d3Uzc21sa3Y4eXplZ3UifQ.A0bybwyLcfDfGc0Ejyh3rg&bbox=-0.227654%2C51.464102%2C0.060737%2C51.553421&limit=10`;
    const [locations, setLocations] = useState([]);
    useEffect(() => {
        const fetchLocations = async () => {
        await fetch(url).then((response) =>
            response.text()).then((res) => JSON.parse(res))
        .then((json) => {
            setLocations(json.features);
        }).catch((err) => console.log({ err }));
        };
        fetchLocations();
    }, []);
  return (<div>
    <Mapa />
  </div>);
}