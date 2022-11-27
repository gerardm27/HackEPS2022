import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const formatCoords = (coords) => {
    let positions = [];
    for (let i = 0; i < coords.length; i++) {
        positions.push([coords[i].lat, coords[i].lng]);
    }
    console.log(positions);
    return positions;
}

const MarkerList = (props) => {
    console.log(props.canals);
    var brokenIcon = L.icon({
        iconUrl: 'brokenMarker.png',    
        iconSize:     [32, 32], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [32, 32], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    var missingIcon = L.icon({
        iconUrl: 'missingMarker.png',    
        iconSize:     [32, 32], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [32, 32], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    var OKIcon = L.icon({
        iconUrl: 'OKMarker.png',    
        iconSize:     [32, 32], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [32, 32], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    return(
        <div>
            {props.forats.map((forat) => (
                
                <Marker position={[forat.lat, forat.lng]}
                    icon = {forat.status === "OK" ? OKIcon : ((forat.status === "MISSING") ? missingIcon : brokenIcon)}
                    >
                    <Popup>
                        <h1>{forat.description}</h1>
                        <img src={forat.image}/>
                    </Popup>
                </Marker>
            ))}
            {props.canals.map((canal) => (
                <Polyline pathOptions={{color: 'blue', weight: 7}} 
                    positions={formatCoords(canal.coords)}
                    
                >
                    <Popup>
                        <h1>{canal.description}</h1>
                        <img src={canal.photo}/>
                    </Popup>
                </Polyline>
            ))}
        </div>
    )  
}
export default MarkerList
