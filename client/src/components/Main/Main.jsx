import './Main.css';
import { Layout } from '../Layout/Layout';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { MAPBOX } from '../../config/Config';
import { Room } from '@mui/icons-material';
import { getAllLocations } from '../../api/location';

export const Main = () => {
	const [locationData, setLocationData] = useState([]);
	const [viewport, setViewport] = useState({
		width: '100vw',
		height: '100vh',
		latitude: 22.28,
		longitude: 114.15,
		zoom: 8,
	});

	// Initialize
	const init = async () => {
		try {
			const locations = await getAllLocations();
			setLocationData(locations.data);
			console.log(locations.data);
		} catch (error) {
			if (error.response) {
				console.log(error.response.data.error);
			}
		}
	};

	// Reload when refresh
	useEffect(() => {
		init();
	}, []);

	return (
		<Layout>
			<ReactMapGL
				{...viewport}
				mapboxApiAccessToken={MAPBOX}
				onViewportChange={(nextViewport) => setViewport(nextViewport)}
				mapStyle='mapbox://styles/safak/cknndpyfq268f17p53nmpwira'
			>
				<Marker latitude={22.28} longitude={114.15} offsetLeft={-20} offsetTop={-10}>
					<Room style={{ fontSize: viewport.zoom * 7, color: '#51969c' }} />
				</Marker>
				<Popup
					latitude={22.28}
					longitude={114.15}
					closeButton={true}
					closeOnClick={false}
					anchor='left'
				>
					<div className='loc-details-container'>
						<label>Location</label>
						<label>Temperature</label>
						<label>Wind Speed</label>
						<label>Wind direction</label>
						<label>Humidity</label>
						<label>Precipitation</label>
						<label>Visibility</label>
					</div>
				</Popup>
			</ReactMapGL>
		</Layout>
	);
};
