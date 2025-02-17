// src/components/Map.js
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import io from 'socket.io-client';
import TRUCK_ICON from '../assets/truck_icon.png'
// Initialize socket connection
const socket = io('http://localhost:5000');

const Map = () => {
    const mapContainer = useRef(null);  // ref for the map container
    const [markers, setMarkers] = useState({});

    // Custom marker icon
    const customIcon = L.icon({
        iconUrl: TRUCK_ICON,
        iconSize: [60, 60],
    });



    // This function adds offset to the position to avoid overlap


    useEffect(() => {
        // Initialize the map
        const map = L.map(mapContainer.current).setView([0, 0], 10);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'OpenStreetMap'
        }).addTo(map);

        // Handle geolocation
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => {
                const { latitude: lat, longitude: long } = position.coords;
                console.log(lat, long);
                socket.emit("send-location", { lat, long });
            }, (error) => {
                console.log(error);
            }, {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: 5000
            });
        }

        // Handle receiving location updates from the server
        socket.on('get-location', (data) => {
            const { id, lat, long } = data;
            console.log(`Data received from ${id}: ${lat} : ${long}`);


            // Set the map view to the new location
            map.setView([lat, long], 16);

            // Update markers state
            setMarkers((prevMarkers) => {
                if (prevMarkers[id]) {
                    prevMarkers[id].setLatLng([lat, long]);
                } else {
                    prevMarkers[id] = L.marker([lat, long], { icon: customIcon }).addTo(map);
                }
                return { ...prevMarkers };
            });
        });

        // Handle user disconnection
        socket.on('user-disconnected', (id) => {
            setMarkers((prevMarkers) => {
                if (prevMarkers[id]) {
                    map.removeLayer(prevMarkers[id]);
                    delete prevMarkers[id];
                }
                return { ...prevMarkers };
            });
        });

        // Cleanup on unmount
        return () => {
            map.remove();
        };
    }, []);

    return <div ref={mapContainer} style={{ height: '500px' }}></div>;
};

export default Map;
