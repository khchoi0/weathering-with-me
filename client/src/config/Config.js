const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const TIMEOUT = process.env.REACT_APP_API_TIMEOUT;
const MAPBOX = process.env.REACT_APP_MAPBOX;

if (!API_BASE_URL) {
	throw new Error(
		'.env is missing the definition for REACT_APP_API_BASE_URL environment variable.',
	);
}

if (!TIMEOUT) {
	throw new Error(
		'.env is missing the definition for REACT_APP_API_TIMEOUT environment variable.',
	);
}

if (!MAPBOX) {
	throw new Error(
		'.env is missing the definition for REACT_APP_MAPBOX environment variable.',
	);
}

export { API_BASE_URL, TIMEOUT, MAPBOX };
