const request = require('postman-request')

/**
 * https://docs.mapbox.com/api/overview/
 * e.g.: https://api.mapbox.com/{endpoint}?access_token={your_access_token}
 * 
 * Forward geocoding
 * GET /geocoding/v5/{endpoint}/{search_text}.json
 * 
 * https://api.mapbox.com/geocoding/v5/mapbox.places/Manila.json?access_token=pk.eyJ1IjoiY3NrcmlwdCIsImEiOiJja2t6cmVkankwbGl4MnhueGJ6ZnN5Y25nIn0.bEJ--KNIoSS7Vk-Kmu2Krw
 */

// const geocodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Manila.json?access_token=pk.eyJ1IjoiY3NrcmlwdCIsImEiOiJja2t6cmVkankwbGl4MnhueGJ6ZnN5Y25nIn0.bEJ--KNIoSS7Vk-Kmu2Krw"
// request({url:geocodeUrl, json:true}, (err, resp, body) => {
// 	if (err) {
// 		//console.log(JSON.stringify(err))
// 		console.log("Unable to connect to location service!")
// 	} else if (resp.body.features.length === 0) {
// 		//console.log(JSON.stringify(resp.body))
// 		console.log("Unable to find location. Try another search.")
// 	} else {
// 		const data = resp.body
// 		const longitude = data.features[0].center[0]
// 		const latitude = data.features[0].center[1]
//
// 		console.log(latitude, longitude)
// 	}
//  })

const geocode = (address, callback) => {
	const token = "subscribe-and-get-your-token"
	const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token="+ token +"&limit=1"

	request({url, json:true}, (error, {body} = {}) => {
		if (error) {
			callback("Unable to connect to location service.")
		} else if (body.features.length === 0) {
			callback("Unable to find location. Try another search.")
		} else {
			const feature = body.features[0]
			callback(undefined, {
				longitude: feature.center[0],
				latitude: feature.center[1],
				location: feature.place_name
			})
		}
	})
}

module.exports = geocode