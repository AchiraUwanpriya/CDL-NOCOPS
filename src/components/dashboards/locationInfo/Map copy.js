import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './MyComponent.css'; // Create and import a CSS file for custom styles

// Sample locations array
const locations = [
  { id: 1, name: 'Location 1', lat: 7.9331, lng: 80.7718 },
  { id: 2, name: 'Location 2', lat: 6.0802, lng: 80.7728 },
  // Add more locations as needed 6.080260017210131, 80.51241149243332
];

const containerStyle = {
  height: '85vh',
  width: '100%',
};

const center = {
  lat: 7.9331,
  lng: 80.7718,
};

const defaultProps = {
  center: {
    lat: 7.9331,
    lng: 80.7718,
  },
  disableDefaultUI: false,
  zoom: 8,
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyC8OTQD0BWExwMt04-goV9c5hV9cfer6DM',
  });

  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef(null);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const handleCardClick = (location) => {
    setSelectedLocation(location);
    if (mapRef.current) {
      mapRef.current.panTo({ lat: location.lat, lng: location.lng });
      mapRef.current.setZoom(10); // Adjust the zoom level as needed
    }
  };

  const handleMarkerClick = (location) => {
    setSelectedLocation(location);
    if (mapRef.current) {
      mapRef.current.panTo({ lat: location.lat, lng: location.lng });
      mapRef.current.setZoom(10); // Adjust the zoom level as needed
    }
  };

  useEffect(() => {
    if (selectedLocation) {
      document.getElementById(`location-${selectedLocation.id}`).scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedLocation]);

  return isLoaded ? (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '30%', overflowY: 'scroll', padding: '10px' }}>
        <TransitionGroup>
          {locations.map((location) => (
            <CSSTransition key={location.id} timeout={3000} classNames="fade">
              <div
                id={`location-${location.id}`}
                onClick={() => handleCardClick(location)}
                style={{
                  padding: '10px',
                  margin: '10px 0',
                  cursor: 'pointer',
                  backgroundColor: selectedLocation?.id === location.id ? '#f0f0f0' : '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  transition: 'background-color 0.3s',
                }}
              >
                {location.name}
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
      <div style={{ width: '70%' }}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
          center={selectedLocation ? { lat: selectedLocation.lat, lng: selectedLocation.lng } : center}
          zoom={8}
          options={{
             zoomControl: true,
           // maxZoom: 8,
           // minZoom: 8,
          }}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={{ lat: location.lat, lng: location.lng }}
              onClick={() => handleMarkerClick(location)}
            />
          ))}
        </GoogleMap>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
