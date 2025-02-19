// src/components/Map.js
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import io from 'socket.io-client';
import TRUCK_ICON from '../assets/truck.png'
import TRUCK_GIF from '../assets/truck.gif'
import { useSelector } from 'react-redux';
// Initialize socket connection
// const socket = io('https://sanvahan-server.onrender.com');
const socket = io('http://localhost:5000');

const Map = () => {
    const mapContainer = useRef(null);  // ref for the map container
    const [markers, setMarkers] = useState({});
    const user = useSelector((state) => state.loggedInUser);
    user.mobile = "7066649832"
    // Custom marker icon
    // const customIcon = L.icon({
    //     iconUrl: TRUCK_ICON,
    //     iconSize: [60, 60],
    // });

    const customIcon = L.icon({
        iconUrl: TRUCK_ICON, // Replace with your custom icon path
        iconSize: [32, 32],  // Size of the icon
        iconAnchor: [16, 32], // Point of the icon which will correspond to marker's position
        popupAnchor: [0, -32] // Position of the popup relative to the icon
    });
    const hoverIcon = L.icon({
        iconUrl: TRUCK_GIF, // Replace with your custom icon path
        iconSize: [38, 38],  // Size of the icon
        iconAnchor: [16, 32], // Point of the icon which will correspond to marker's position
        popupAnchor: [0, -32] // Position of the popup relative to the icon
    });

    // This function adds offset to the position to avoid overlap


    useEffect(() => {
        // Initialize the map 
        const map = L.map(mapContainer.current).setView([0, 0], 10);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Sanvahan'
        }).addTo(map);
        let lat_long = {}
        // Handle geolocation
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => {
                const { latitude: lat, longitude: long } = position.coords;

                if (!lat_long?.lat) {
                    map.setView([lat, long]);
                    lat_long = { lat, long }
                }
                socket.emit("send-location", { lat, long, name: user.name, mobile: user.mobile });
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

            // Set the map view to the new location
            // map.setView([lat, long]);

            // Update markers state
            setMarkers((prevMarkers) => {
                if (prevMarkers[id]) {
                    prevMarkers[id].setLatLng([lat, long]);
                } else {
                    let temp_marker = L.marker([lat, long], { icon: customIcon })

                    temp_marker.on('mouseover', () => {
                        temp_marker.setIcon(hoverIcon); // Change icon on hover
                    });

                    temp_marker.on('mouseout', () => {
                        temp_marker.setIcon(customIcon); // Reset icon when mouse leaves
                    });
                    temp_marker.bindPopup(`<strong> Name : ${data.name} , Mobile : <a href='tel:${data.mobile}'>${data.mobile} </a> </strong>`)
                    prevMarkers[id] = temp_marker.addTo(map);
                    // const marker = L.marker([lat, long], { icon: customIcon })

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


// https://lab.digital-democracy.org/leaflet-bing-layer/