import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'


const Mapa = () => {
  return (
    <MapContainer 
      //Options for the map
      attributionControl={false} 
      center={[51.505, -0.09]} 
      zoom={13} 
      scrollWheelZoom={true} 
      boxZoom={true}
      touchZoom={true}
      style={{height: 500, width: "100%"}}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker 
        position={[51.505, -0.09]}>
        
        <Popup>  
          This is a PopUp.
          <a href='/report'>Click me</a>
        </Popup>
      </Marker>
      <Marker 
        position={[51.52, -0.2]}>
        
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Mapa