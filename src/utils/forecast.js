const request = require("postman-request")
/** 
 * Base URL = http://api.weatherstack.com/ | cskript@gmail.com:happyCoding-778 | API Access Key = 72fd9ff499e64d90c4461d7c9da76c06
 * 
 * There are several API endpoints to choose from:
 *    Current Weather: Get current weather data.
 *    Historical Weather: Get historical weather data.
 *    Historical Time-Series: Get historical time-series weather data.
 *    Weather Forecast: Get weather forecast for up to 14 days.
 * 
 * Location Lookup: Look up one or multiple locations.
 * e.g.: http://api.weatherstack.com/current?access_key=72fd9ff499e64d90c4461d7c9da76c06&query=37.8267,-122.4233
 */

// const url = "http://api.weatherstack.com/current?access_key=72fd9ff499e64d90c4461d7c9da76c06&query="

// request({url:url, json:true}, (err, resp, body) => {
// 	if (err) {
// 		//console.log(JSON.stringify(err))
// 		console.log("Unable to connect to WeatherStack service!")
// 	} else if (resp.body.error) {
// 		//console.log(JSON.stringify(resp.body))
// 		console.log("Unable to find location")
// 	} else {
// 		const data = resp.body.current
// 		console.log(data.weather_descriptions[0] + ". It is currently " + data.temperature + " degress out. It feels like " + data.feelslike + " degress out.")
// 	}
// })

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
//
// forecast(-75.7088, 44.1545, (error, data) => {
//   console.log('Error', error)
//   console.log('Data', data)
// })

const forecast = (lat, long, callback) => {
	const token = "subscribe-and-get-your-token"
	const url = "http://api.weatherstack.com/current?access_key="+ token +"&query="+ encodeURIComponent(lat) +","+ encodeURIComponent(long)
	
	request({url, json:true}, (error, {body} = {}) => {
		if (error) {
			callback("Unable to connect to weather service.")
		} else if (body.error) {
			callback("Unable to find location")
		} else {
			callback(undefined, {
				description: body.current.weather_descriptions[0], 
				temperature: body.current.temperature,
				feelslike: body.current.feelslike
			})
		}
	})
}

module.exports = forecast

