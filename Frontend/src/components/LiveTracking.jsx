import React, { useEffect, useState } from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps';

// Mapbox tile provider for pigeon-maps
const MAPBOX_TOKEN = import.meta.env.MAPBOX_API_KEY;
const mapboxProvider = (x, y, z, dpr) =>
  `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/${256 * dpr}/${z}/${x}/${y}?access_token=${MAPBOX_TOKEN}`;

const LiveTracking = ({ userId }) => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  // Get user's current location
  useEffect(() => {
    let intervalId;
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }
    // Initial fetch
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
          setError(null);
        },
        (err) => {
          setError('Unable to retrieve your location');
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 }
      );
    };
    fetchLocation();
    intervalId = setInterval(fetchLocation, 10000); // update every 10 seconds
    return () => clearInterval(intervalId);
  }, []);

  // Optionally: send position to backend or socket for real-time updates
  // useEffect(() => {
  //   if (position && userId) {
  //     // send position to backend or socket
  //   }
  // }, [position, userId]);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      {position ? (
        <Map
          provider={mapboxProvider}
          dprs={[1, 2]}
          height={400}
          center={position}
          zoom={16}
        >
          <Marker width={50} anchor={position} color="#007aff" />
          <Overlay anchor={position} offset={[0, -30]}>
            <div style={{ background: 'white', padding: '2px 8px', borderRadius: 6, fontSize: 12, boxShadow: '0 1px 4px #0002' }}>
              You are here
            </div>
          </Overlay>
        </Map>
      ) : (
        <div className="text-center py-8">{error || 'Locating...'}</div>
      )}
    </div>
  );
};

export default LiveTracking;