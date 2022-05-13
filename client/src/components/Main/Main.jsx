import "./Main.css";
import { Layout } from "../Layout/Layout";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MAPBOX } from "../../config/Config";
import { Room } from "@mui/icons-material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { getAllLocations, getWeatherDataByLocname } from "../../api/location";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Table } from "../UI/Table/Table";
import { FavLists } from "../UI/FavLists/FavLists";
import { Notification } from "../UI/Notification/Notification";
import { CommentSection } from "../UI/CommentSection/CommentSection";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export const Main = () => {
  // Get current login user
  const { user } = useContext(AuthContext);

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
  const [showComment, setShowComment] = useState(false);
  const [favLists, setFavLists] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [notifText, setNotifText] = useState("");

  // The initial location is Hong Kong
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "82vh",
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
    // Show comment trigger
    setShowComment(false);
    setShowComment(true);
  };

  // Close the popup and show the table again
  const handlePopupClose = () => {
    setCurrentLocId(null);
    setShowComment(false);
  };

  // Admin refresh dataset
  const handleRefresh = async () => {
    const locationResult = await getAllLocations();
    setLocationData(locationResult.data);
    setViewport({
      width: "100%",
      height: "82vh",
      latitude: 22.28,
      longitude: 114.15,
      zoom: 9,
    });
    setNotifText("REFRESH_SUCCESS");
    setShowNotif(true);
  };

  // Show notification
  const handleShowNotification = () => (
    <>
      {showNotif && (
        <Notification
          type={notifText}
          show={showNotif}
          setShow={setShowNotif}
        />
      )}
    </>
  );

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      {handleShowNotification()}
      <Grid container spacing={1} style={{ flexGrow: 1 }}>
        <Grid item md={8} sm={12} xs={12}>
          <div className="left-container">
            <Paper
              className="map-container"
              elevation={3}
              sx={{ borderRadius: 2 }}
            >
              {/* Mapbox */}
              <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={MAPBOX}
                onViewportChange={(nextViewport) => setViewport(nextViewport)}
                mapStyle="mapbox://styles/safak/cknndpyfq268f17p53nmpwira"
              >
                {locationData.map((locationItem) => (
                  <Box component="div" key={locationItem._id}>
                    <Marker
                      latitude={locationItem.lat}
                      longitude={locationItem.long}
                      offsetLeft={-3.5 * viewport.zoom}
                      offsetTop={-7 * viewport.zoom}
                    >
                      <Room
                        className="marker-icon"
                        onClick={() =>
                          handleMarker(
                            locationItem._id,
                            locationItem.lat,
                            locationItem.long,
                            locationItem.lname
                          )
                        }
                        style={{ fontSize: viewport.zoom * 7 }}
                      />
                    </Marker>
                    {locationItem._id === currentLocId &&
                      ((lastUpdatedTime && (
                        <Popup
                          latitude={locationItem.lat}
                          longitude={locationItem.long}
                          closeButton={true}
                          closeOnClick={false}
                          anchor="left"
                          onClose={handlePopupClose}
                        >
                          <Box component="div" className="popup-container">
                            <Box
                              component="div"
                              className="popup-title-container"
                            >
                              <Typography variant="h5" className="popup-title">
                                <b>{locationName}</b>
                              </Typography>
                              <Box
                                component="img"
                                src={weatherIcon}
                                alt={weatherText}
                              />
                            </Box>
                            <Divider
                              style={{ width: "110%", marginTop: "5px" }}
                            />
                            <Box component="label" className="popup-label">
                              Temperature
                            </Box>
                            <Typography variant="p" className="popup-desc">
                              {temperature}&#8451;
                            </Typography>
                            <Box component="label" className="popup-label">
                              Wind Speed
                            </Box>
                            <Typography variant="p" className="popup-desc">
                              {windSpeed} km/h
                            </Typography>
                            <Box component="label" className="popup-label">
                              Wind direction
                            </Box>
                            <Typography variant="p" className="popup-desc">
                              {windDirection}
                            </Typography>
                            <Box component="label" className="popup-label">
                              Humidity
                            </Box>
                            <Typography variant="p" className="popup-desc">
                              {humidity}%
                            </Typography>
                            <Box component="label" className="popup-label">
                              Precipitation
                            </Box>
                            <Typography variant="p" className="popup-desc">
                              {precipitation}%
                            </Typography>
                            <Box component="label" className="popup-label">
                              Visibility
                            </Box>
                            <Typography variant="p" className="popup-desc">
                              {visibility}km
                            </Typography>
                            <Typography
                              variant="p"
                              className="popup-time"
                              sx={{ pt: 1 }}
                            >
                              Last Updated Time: <br />
                              {lastUpdatedTime}
                            </Typography>
                          </Box>
                        </Popup>
                      )) || (
                        <Popup
                          latitude={locationItem.lat}
                          longitude={locationItem.long}
                          closeButton={false}
                          closeOnClick={false}
                          anchor="left"
                          onClose={handlePopupClose}
                        >
                          <div
                            style={{
                              padding: "10px 20px 3px 20px",
                              height: "fit-content",
                              display: "flex",
                            }}
                          >
                            <CircularProgress
                              size={20}
                              style={{ marginRight: "15px" }}
                              disableShrink
                            />
                            <b>LOADING</b>
                          </div>
                        </Popup>
                      ))}
                  </Box>
                ))}
              </ReactMapGL>
            </Paper>
          </div>
        </Grid>
        <Grid item md={4} sm={12} xs={12}>
          {showComment ? (
            <CommentSection currentLocId={currentLocId} />
          ) : (
            <div className="right-container">
              <Paper className="right-paper" elevation={3} sx={{ borderRadius: 2 }}>
                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <FavLists
                    favLists={favLists}
                    setFavLists={setFavLists}
                    handleMarker={handleMarker}
                    setShowNotif={setShowNotif}
                    setNotifText={setNotifText}
                  />
                  {user.isAdmin && (
                    <Button
                      variant="contained"
                      sx={{
                        my: 2,
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        "&:hover": { color: "tertiary.dark" },
                        margin: "20px",
                        width: "fit-content",
                      }}
                      onClick={handleRefresh}
                    >
                      <AutorenewIcon sx={{ paddingRight: "6px" }} />
                      REFRESH
                    </Button>
                  )}
                </Box>
                <div className="table-container">
                  <Table
                    locationData={locationData}
                    handleMarker={handleMarker}
                    setFavLists={setFavLists}
                    setShowNotif={setShowNotif}
                    setNotifText={setNotifText}
                  />
                </div>
              </Paper>
            </div>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
};
