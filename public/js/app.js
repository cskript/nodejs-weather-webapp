const searchFrm = document.querySelector('form')
const searchTxt = document.querySelector('input')
const msg1 = document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')

searchFrm.addEventListener('submit', (e) => {
	e.preventDefault()
	
	const address = searchTxt.value
	
	msg1.textContent = 'Loading...'
	msg2.textContent = ''

	fetch('/weather?address='+address).then((res) => {
		res.json().then((data) =>{
			if (data.error) {
				msg1.textContent = data.error
			} else {
				msg1.textContent = data.location
				msg2.textContent = data.forecast
			}
		})
	})
})