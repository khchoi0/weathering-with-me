import './Main.css';
import { Layout } from '../Layout/Layout';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { MAPBOX } from '../../config/Config';
import { Room } from '@mui/icons-material';
import { getAllLocations, getWeatherDataByLocname } from '../../api/location';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';

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
	const [searchValue, setSearchValue] = useState('');
	const [searchResult, setSearchResult] = useState([]);

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

	// Table search
	const searchFilterTable = (e) => {
		if (e.target.value !== '') {
			setSearchValue(e.target.value);
			const filteredTable = locationData.filter((o) =>
				Object.keys(o).some((k) =>
					String(o[k]).toLowerCase().includes(e.target.value.toLowerCase()),
				),
			);
			setSearchResult([...filteredTable]);
		} else {
			setSearchValue(e.target.value);
			locationData([...locationData]);
		}
	};

	// Initialize
	const init = async () => {
		try {
			const locations = await getAllLocations();
			console.log(locations.data);
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
			<Grid container spacing={1}>
				<Grid item md={8} sm={12} xs={12}>
					{/* Mapbox */}
					<ReactMapGL
						{...viewport}
						mapboxApiAccessToken={MAPBOX}
						onViewportChange={(nextViewport) => setViewport(nextViewport)}
						mapStyle='mapbox://styles/safak/cknndpyfq268f17p53nmpwira'
					>
						{locationData.map((locationItem) => (
							<Box component='div' key={locationItem._id}>
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
										<Box component='div' className='popup-container'>
											<Box component='div' className='popup-title-container'>
												<Typography variant='h5' className='popup-title'>
													{locationName}
												</Typography>
												<Box component='img' src={weatherIcon} alt={weatherText} />
											</Box>
											<Box component='label' className='popup-label'>
												Temperature
											</Box>
											<Typography variant='p' className='popup-desc'>
												{temperature}&#8451;
											</Typography>
											<Box component='label' className='popup-label'>
												Wind Speed
											</Box>
											<Typography variant='p' className='popup-desc'>
												{windSpeed} km/h
											</Typography>
											<Box component='label' className='popup-label'>
												Wind direction
											</Box>
											<Typography variant='p' className='popup-desc'>
												{windDirection}
											</Typography>
											<Box component='label' className='popup-label'>
												Humidity
											</Box>
											<Typography variant='p' className='popup-desc'>
												{humidity}%
											</Typography>
											<Box component='label' className='popup-label'>
												Precipitation
											</Box>
											<Typography variant='p' className='popup-desc'>
												{precipitation}%
											</Typography>
											<Box component='label' className='popup-label'>
												Visibility
											</Box>
											<Typography variant='p' className='popup-desc'>
												{visibility}km
											</Typography>
											<Typography variant='p' className='popup-time' sx={{ pt: 1 }}>
												Last Updated Time: {lastUpdatedTime}
											</Typography>
										</Box>
									</Popup>
								)}
							</Box>
						))}
					</ReactMapGL>
				</Grid>
				<Grid item md={4} sm={12} xs={12}>
					<Box component='div' sx={{ pr: 1, pt: 1, height: '100vh', overflow: 'scroll' }}>
						<InputBase
							className='searchInput'
							type='text'
							placeholder='Search location...'
							value={searchValue}
							onChange={searchFilterTable}
						/>
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 560 }} aria-label='simple table'>
								<TableHead>
									<TableRow>
										<TableCell>#</TableCell>
										<TableCell align='right'>LocName</TableCell>
										<TableCell align='right'>Add To Fav</TableCell>
										<TableCell align='right'>Search</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{searchValue.length > 0
										? searchResult.map((location, index) => (
												<TableRow
													key={location._id}
													sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
												>
													<TableCell component='th' scope='row'>
														{index + 1}
													</TableCell>
													<TableCell align='right'>{location.lname}</TableCell>
													<TableCell align='right'>Add</TableCell>
													<TableCell align='right'>
														<Button
															variant='outlined'
															onClick={() =>
																handleMarker(
																	location._id,
																	location.lat,
																	location.long,
																	location.lname,
																)
															}
														>
															Search
														</Button>
													</TableCell>
												</TableRow>
										  ))
										: locationData.map((location, index) => (
												<TableRow
													key={location._id}
													sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
												>
													<TableCell component='th' scope='row'>
														{index + 1}
													</TableCell>
													<TableCell align='right'>{location.lname}</TableCell>
													<TableCell align='right'>Add</TableCell>
													<TableCell align='right'>
														<Button
															variant='outlined'
															onClick={() =>
																handleMarker(
																	location._id,
																	location.lat,
																	location.long,
																	location.lname,
																)
															}
														>
															Search
														</Button>
													</TableCell>
												</TableRow>
										  ))}
								</TableBody>
							</Table>
						</TableContainer>
					</Box>
				</Grid>
			</Grid>
		</Layout>
	);
};
