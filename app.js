const ApiKey = '0aca98c0093bf8319775dda792836a8f'

const input = document.getElementById('input')
const btn = document.getElementById('btn')

const weatherIcon = document.querySelector('.main-img')
const weather = document.querySelector('.weather')
const btnExpanded = document.querySelector('.expand_more')

async function fetchData(inp) {
	const response = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${inp}&appid=${ApiKey}&units=metric&lang=ru`
	)
	if (response.status == 404) {
		document.querySelector('.error').style.display = 'block'
		weather.style.display = 'none'
	} else {
		const data = await response.json()
		console.log(data)
		document.querySelector('#temperature').innerHTML = Math.round(
			data.main.temp
		)
		document.querySelector('.text-city').innerHTML = data.name
		document.querySelector('.humidity').innerHTML = data.main.humidity
		document.querySelector('.speed_wind').innerHTML = data.wind.speed

		if (data.weather[0].main == 'Clouds') {
			weatherIcon.src = 'images/clouds.png'
		} else if (data.weather[0].main == 'Clear') {
			weatherIcon.src = 'images/clear.png'
		} else if (data.weather[0].main == 'Drizzle') {
			weatherIcon.src = 'images/drizzle.png'
		} else if (data.weather[0].main == 'Mist') {
			weatherIcon.src = 'images/mist.png'
		} else if (data.weather[0].main == 'Rain') {
			weatherIcon.src = 'images/rain.png'
		} else if (data.weather[0].main == 'Snow') {
			weatherIcon.src = 'images/snow.png'
		}

		weather.style.display = 'block'
		document.querySelector('.error').style.display = 'none'

		let arr = [data.main.temp_max, data.main.temp_min]
		return arr
	}
}

btn.addEventListener('click', () => {
	fetchData(input.value)
	weather.classList.remove('expanded')
})

input.addEventListener('click', () => {
	input.value = ''
})

const more = document.querySelector('.more')

btnExpanded.addEventListener('click', function () {
	const arr = fetchData(input.value)
	arr.then(function (result) {
		weather.classList.toggle('expanded')
		btnExpanded.classList.toggle('flipped')

		const moreF = document.querySelector('.futures-more')
		if (moreF) {
			document.querySelector('.futures-more').remove()
		} else {
			more.insertAdjacentHTML(
				'beforeend',
				`<div class="futures futures-more">
						<div class="block">
							<img src="images/max_temp.png" alt="" />
							<div class="f-content">
								<h3 class="number"><span class="max">${result[0]}</span>℃</h3>
								<h3 class="text text-t">Максимальная температура</h3>
							</div>
						</div>
						<div class="block">
							<img src="images/min_temp.png" alt="" />
							<div class="f-content">
								<h3 class="number">
									<span class="min">${result[1]}</span>℃
								</h3>
								<h3 class="text text-t">Минимальная температура</h3>
							</div>
						</div>
					</div>`
			)
		}
	})
})
