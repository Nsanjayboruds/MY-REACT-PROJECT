import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/MapPin.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const animatedIcon = new L.DivIcon({
  className: '',
  html: `<div class="animated-pin"></div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

export default function MapView({ lat, lng }) {
  return (
    <MapContainer center={[lat, lng]} zoom={8} className="h-64 w-full mt-4 rounded z-10">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lng]} icon={animatedIcon}>
        <Popup>📍 Tracked Location</Popup>
      </Marker>
    </MapContainer>
  );
}
