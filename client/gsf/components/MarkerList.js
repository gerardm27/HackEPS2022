import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const MarkerList = (props) => {
    console.log(props.forats);
    return(
        <div>
            {props.forats.map((forat) => (
                <Marker position={[forat.lat, forat.lng]}>
                    <Popup>
                        <h1>{forat.description}</h1>
                        <img src={forat.photo}/>
                    </Popup>
                </Marker>
            ))}
            {/* {props.canals.map((canal) => (
                <Marker position={[canal.lat, canal.lng]}>
                    <Popup>
                        <h1>{canal.description}</h1>
                        <img src={canal.photo}/>
                    </Popup>
                </Marker>
            ))} */}
        </div>
    )  
}
export default MarkerList
