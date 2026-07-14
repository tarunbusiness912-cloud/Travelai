import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapView({
  latitude,
  longitude,
  destination,
}) {
  return (
    <div className="rounded-3xl overflow-hidden shadow-xl border">

      <MapContainer
        center={[latitude, longitude]}
        zoom={12}
        scrollWheelZoom={true}
        style={{
          width: "100%",
          height: "450px",
        }}
      >
        <TileLayer
          attribution="© OpenStreetMap Contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[latitude, longitude]}>
          <Popup>

            <h2 className="font-bold">
              📍 {destination}
            </h2>

            Welcome to TravelOS

          </Popup>
        </Marker>

      </MapContainer>

    </div>
  );
}

export default MapView;