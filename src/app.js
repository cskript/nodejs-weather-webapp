const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Oli'
	})
})

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Oli'
	})
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		name: 'Oli',
		helpTxt: 'This is a sample help text'
	})
})

app.get('/weather', (req, res) => {
	const address = req.query.address
	if (!address) {
		return res.send({code: 'invalid request', error:'You must provide an address.'})
	}

	geocode(address, (error, {latitude, longitude, location} = {}) => {
		if (error) {
			return res.send({code: 'geocode', error})
		}
		
		forecast(latitude, longitude, (error, {description, temperature, feelslike} = {}) => {
			if (error) {
				return res.send({code: 'forecast', error})
			}
			const forecast =  description +", It is currently "+ temperature +" degrees out. It feels like "+ feelslike + " degrees out."
			res.send({
				forecast,
				location,
				description,
				temperature,
				feelslike,
				address
			})
		})
	})
	
})

app.get('/help/*', (req, res) => {
	res.render('error', {
		title: 'Error',
		name: 'Oli',
		errorMessage: 'Help article not found.'
	})
})

app.get('*', (req, res) => {
	res.render('error', {
		title: 'Error',
		name: 'Oli',
		errorMessage: 'Page not found.'
	})
})

app.listen(3000, () => {
	console.log('Server is up on port 3000')
})