const axios = require('axios');

/**
 * Get coordinates (latitude, longitude) for a given address using Mapbox Geocoding API.
 * @param {string} address - The address to geocode.
 * @returns {Promise<{ ltd: number, lang: number }>} - Object with ltd (latitude) and lang (longitude).
 */
module.exports.getAddressCoordinate = async (address) => {
	if (!address) throw new Error('Address is required');
	const MAPBOX_TOKEN = process.env.MAPBOX_API_KEY;
	if (!MAPBOX_TOKEN) throw new Error('Mapbox API key not set in environment');

	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json`;
	try {
		const response = await axios.get(url, {
			params: {
				access_token: MAPBOX_TOKEN,
				limit: 1
			}
		});
		const features = response.data.features;
		if (!features || features.length === 0) {
			throw new Error('No coordinates found for the given address');
		}
		const [ lang, ltd ] = features[0].center;
		return { ltd, lang };
	} catch (err) {
		throw new Error('Failed to fetch coordinates: ' + err.message);
	}
}

module.exports.getDistanceTime = async (source, destination) => {
	if (!source || !destination) throw new Error('Source and Destination addresses are required');
	const MAPBOX_TOKEN = process.env.MAPBOX_API_KEY;
	if (!MAPBOX_TOKEN) throw new Error('Mapbox API key not set in environment');

	// const getCoords = this.getAddressCoordinate();
	const getCoords = module.exports.getAddressCoordinate;  //FIXED

	try {
		const sourceCoord = await getCoords(source);
		const destinationCoord = await getCoords(destination);
		const coordinates = `${sourceCoord.lang},${sourceCoord.ltd};${destinationCoord.lang},${destinationCoord.ltd}`;
		const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}`;
		const response = await axios.get(url, {
			params: {
				access_token: MAPBOX_TOKEN,
				overview: 'simplified',
				geometries: 'geojson',
				steps: false
			}
		});
		const routes = response.data.routes;
		if (!routes || routes.length === 0) {
			throw new Error('No route found between source and destination');
		}
		const { distance, duration } = routes[0];
		return { distance, duration };
	} catch (err) {
		throw new Error('Failed to get distance and time: ' + err.message);
	}
}

module.exports.getAutoCompleteSuggestions = async (input) => {
	if (!input) throw new Error('Input is required');
	const MAPBOX_TOKEN = process.env.MAPBOX_API_KEY;
	if (!MAPBOX_TOKEN) throw new Error('Mapbox API key not set in environment');

	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(input)}.json`;
	try {
		const response = await axios.get(url, {
			params: {
				access_token: MAPBOX_TOKEN,
				autocomplete: true,
				limit: 5
			}
		});
		const features = response.data.features || [];
		// Map to array of { place_name, ltd, lang }
		return features.map(f => ({
			place_name: f.place_name,
			ltd: f.center[1],
			lang: f.center[0]
		}));
	} catch (err) {
		throw new Error('Failed to get autocomplete suggestions: ' + err.message);
	}
}