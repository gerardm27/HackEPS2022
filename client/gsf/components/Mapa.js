import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import MarkerList from './MarkerList'


export default function Mapa ({ forats, canals }) {
  return (
    <MapContainer 
      //Options for the map
      attributionControl={false} 
      center={[51.505, -0.09]} 
      zoom={13} 
      scrollWheelZoom={true} 
      boxZoom={true}
      touchZoom={true}
      style={{height: 800, width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerList 
        forats = {forats}
        canals = {canals}
      />
    </MapContainer>
  )
}