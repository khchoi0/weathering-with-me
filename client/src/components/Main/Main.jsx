import './Main.css';
import { Layout } from '../Layout/Layout';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { MAPBOX } from '../../config/Config';
import { Room } from '@mui/icons-material';
import { getAllLocations, getWeatherDataByLocname } from '../../api/location';
import Grid from '@mui/material/Grid';

export const Main = () => {
	const [locationData, setLocationData] = useState([]);
	const [currentLocId, setCurrentLocId] = useState(null);
	const [locationName, setLocationName] = useState(null);
	const [temperature, setTemperature] = useState(null);
	const [windSpeed, setWindSpeed] = useState(null);
	const [windDirection, setWindDirection] = useState(null);
	const [humidity, setHumidity] = useState(null);
	const [precipitation, setPrecipitation] = useState(null);
	const [visibility, setVisibility] = useState(null);
	const [weatherIcon, setWeatherIcon] = useState(null);
	const [weatherText, setWeatherText] = useState(null);
	const [lastUpdatedTime, setLastUpdatedTime] = useState(null);

	// The initial location is Hong Kong
	const [viewport, setViewport] = useState({
		width: '100%',
		height: '100vh',
		latitude: 22.28,
		longitude: 114.15,
		zoom: 9,
	});

	// Show the corresponding marker, move to marker's location, and show weather details
	const handleMarker = async (id, lat, long, locName) => {
		// Show popup
		setCurrentLocId(id);
		// Move to the position of the clicked marker
		setViewport({ ...viewport, latitude: lat, longitude: long });
		// Fetch weather data by locaton name
		const weatherData = await getWeatherDataByLocname(locName);
		// Store weather details
		setLocationName(weatherData.data.location.name);
		setTemperature(weatherData.data.current.temp_c);
		setWindSpeed(weatherData.data.current.wind_kph);
		setWindDirection(weatherData.data.current.wind_dir);
		setHumidity(weatherData.data.current.humidity);
		setPrecipitation(weatherData.data.current.precip_mm);
		setVisibility(weatherData.data.current.vis_km);
		setWeatherIcon(weatherData.data.current.condition.icon);
		setWeatherText(weatherData.data.current.condition.text);
		setLastUpdatedTime(weatherData.data.current.last_updated);
	};

	// Initialize
	const init = async () => {
		try {
			const locations = await getAllLocations();
			setLocationData(locations.data);
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
			<Grid container spacing={2}>
				<Grid item md={8} xs={12} sm={12}>
					{/* Mapbox */}
					<ReactMapGL
						{...viewport}
						mapboxApiAccessToken={MAPBOX}
						onViewportChange={(nextViewport) => setViewport(nextViewport)}
						mapStyle='mapbox://styles/safak/cknndpyfq268f17p53nmpwira'
					>
						{locationData.map((locationItem) => (
							<div key={locationItem._id}>
								<Marker
									latitude={locationItem.lat}
									longitude={locationItem.long}
									offsetLeft={-3.5 * viewport.zoom}
									offsetTop={-7 * viewport.zoom}
								>
									<Room
										className='marker-icon'
										onClick={() =>
											handleMarker(
												locationItem._id,
												locationItem.lat,
												locationItem.long,
												locationItem.lname,
											)
										}
										style={{ fontSize: viewport.zoom * 7 }}
									/>
								</Marker>
								{locationItem._id === currentLocId && (
									<Popup
										latitude={locationItem.lat}
										longitude={locationItem.long}
										closeButton={true}
										closeOnClick={false}
										anchor='left'
										onClose={() => setCurrentLocId(null)}
									>
										<div className='popup-container'>
											<div className='popup-title-container'>
												<h4 className='popup-title'>{locationName}</h4>
												<img src={weatherIcon} alt={weatherText} />
											</div>
											<label className='popup-label'>Temperature</label>
											<p className='popup-desc'>{temperature}&#8451;</p>
											<label className='popup-label'>Wind Speed</label>
											<p className='popup-desc'>{windSpeed} km/h</p>
											<label className='popup-label'>Wind direction</label>
											<p className='popup-desc'>{windDirection}</p>
											<label className='popup-label'>Humidity</label>
											<p className='popup-desc'>{humidity}%</p>
											<label className='popup-label'>Precipitation</label>
											<p className='popup-desc'>{precipitation}%</p>
											<label className='popup-label'>Visibility</label>
											<p className='popup-desc'>{visibility}km</p>
											<p className='popup-time'>Last Updated Time: {lastUpdatedTime}</p>
										</div>
									</Popup>
								)}
							</div>
						))}
					</ReactMapGL>
				</Grid>
				<Grid item md={4} xs={12} sm={12}>
					<div style={{ backgroundColor: 'red' }}>
						<h1>Right</h1>
					</div>
				</Grid>
			</Grid>
		</Layout>
	);
};
