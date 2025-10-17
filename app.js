const dropdown = document.querySelector('.dropdown')
const option = document.querySelector('.options')
const change = document.querySelector('.imperial')

dropdown.addEventListener('click', () => {
    option.classList.toggle('show')
})

let speedUnit = 'kmh'
let unit = 'celsius'
let rainUnit = 'mm'
change.addEventListener('click', () => {

    change.classList.remove("imperial")
    change.classList.add('metric')
    change.innerText = 'Switch to Metric'
    speedUnit = mph.value
    unit = fahrenheit.value
    rainUnit = inches.value

    for (const imperialMarks of imperialMark) {
        imperialMarks.style.display = 'block'
    }

    for (const metricMarks of metricMark) {
        metricMarks.style.display = 'none'
    }


    change.addEventListener('click', () => {
        change.classList.add("imperial")
        change.classList.remove('metric')
        change.innerText = 'Switch to Imperial'
        speedUnit = kmHr.value
        unit = celsius.value
        rainUnit = milimeter.value

        for (const imperialMarks of imperialMark) {
            imperialMarks.style.display = 'none'
        }

        for (const metricMarks of metricMark) {
            metricMarks.style.display = 'block'
        }

    })

})

const imperialMark = document.querySelectorAll('.imperial_mark')
const metricMark = document.querySelectorAll('.metric_mark')

const dailyCode = document.querySelector('.weather_code')
const locate = document.getElementById('location')


const kmHr = document.querySelector('.km');
const mph = document.querySelector('.mph');
const celsius = document.querySelector('.celsius');
const fahrenheit = document.querySelector('.fahrenheit')
const milimeter = document.querySelector('.milimeter')
const inches = document.querySelector('.inch')

const currentTemp = document.querySelector('.apparent_temperature')
const currentTemperature = document.querySelector('.temperature')
const currentHumidity = document.querySelector('.humidity')
const currentWind = document.querySelector('.wind')
const currentPrecipitation = document.querySelector('.precipitation')
const tempUnit = document.getElementById('temp_unit')
const humidityUnit = document.getElementById('humidity_unit')
const windUnit = document.getElementById('wind_unit')
const precipitationUnit = document.getElementById('precipitation_unit')

let maxTemps = document.querySelectorAll('.max_temp')
const minTemps = document.querySelectorAll('.min_temp')

const day = document.querySelectorAll('.day')

const dayCode = document.querySelectorAll('.daily_code')

for (let i = 0; i < maxTemps.length; i++) {
    maxTemps[i].id = `max-${i + 1}`
}
for (let i = 0; i < minTemps.length; i++) {
    minTemps[i].id = `min-${i + 1}`
}

for (let i = 0; i < day.length; i++) {
    day[i].id = `day-${i + 1}`
}

for (let i = 0; i < dayCode.length; i++) {
    dayCode[i].id = `dayCode-${i + 1}`

}

// default 







// const unit = 'celsius'
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

})



async function searchCountry() {
    try {
        const search = document.querySelector('.city_name');
        let cityName = search.value;

        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en`)

        if (!response.ok) {
            throw new Error("Resources not found");
        }

        const data1 = await response.json()
        const long = data1.results[0].longitude
        const lat = data1.results[0].latitude
        const name = data1.results[0].name
        const country = data1.results[0].country
        if (country == name) {
            const location = `${country}`
            locate.innerText = location

        } else {
            const location = `${name}, ${country}`
            locate.innerText = location

        }

        console.log(data1);


        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=weather_code,temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,apparent_temperature&wind_speed_unit=${speedUnit}&temperature_unit=${unit}&precipitation_unit=${rainUnit}&timezone=auto&timeformat=unixtime`)
        if (!res.ok) {
            throw new Error("Resources not found");
        }
        const data2 = await res.json()
        console.log(data2);

        const current = data2.current
        const currentUnits = data2.current_units
        const maxs = data2.daily.temperature_2m_max
        const mins = data2.daily.temperature_2m_min
        const unixTimestamp = data2.current.time
        const dailyUnixTimestamp = data2.daily.time
        const weatherCode = current.weather_code
        const dailyWeatherCode = data2.daily.weather_code
        console.log(dailyWeatherCode);

        const hide = document.querySelectorAll('.hide')
        for (const hides of hide) {
            hides.style.display = 'block'
        }



        if (weatherCode === 0) {
            dailyCode.src = 'material-symbols--cloud (1).svg'
            dailyCode.style.width = `45px`
        }
        else if (weatherCode === 1) {
            dailyCode.src = 'icon-sunny.webp'
        } else if (weatherCode === 2) {
            dailyCode.src = 'icon-partly-cloudy.webp'
        } else if (weatherCode === 3) {
            dailyCode.src = 'icon-overcast.webp'
        } else if (weatherCode === 45 || weatherCode === 48) {
            dailyCode.src = 'icon-fog.webp'
        } else if (weatherCode === 51 || weatherCode === 53 || weatherCode === 55) {
            dailyCode.src = 'icon-drizzle.webp'
        } else if (weatherCode === 61 || weatherCode === 63 || weatherCode === 65) {
            dailyCode.src = 'icon-rain.webp'
        } else if (weatherCode === 71 || weatherCode === 73 || weatherCode === 75) {
            dailyCode.src = 'icon-snow.webp'
        } else if (weatherCode === 95) {
            dailyCode.src = 'icon-storm.webp'
        }


        if (dailyWeatherCode[0] === 0) {
            document.getElementById('dayCode-1').src = 'material-symbols--cloud (1).svg'
            document.getElementById('dayCode-1').width = `45px`
        }
        else if (dailyWeatherCode[0] === 1) {
            document.getElementById('dayCode-1').src = 'icon-sunny.webp'
        } else if (dailyWeatherCode[0] === 2) {
            document.getElementById('dayCode-1').src = 'icon-partly-cloudy.webp'
        } else if (dailyWeatherCode[0] === 3) {
            document.getElementById('dayCode-1').src = 'icon-overcast.webp'
        } else if (dailyWeatherCode[0] === 45 || dailyWeatherCode[0] === 48) {
            document.getElementById('dayCode-1').src = 'icon-fog.webp'
        } else if (dailyWeatherCode[0] === 51 || dailyWeatherCode[0] === 53 || dailyWeatherCode[0] === 55) {
            document.getElementById('dayCode-1').src = 'icon-drizzle.webp'
        } else if (dailyWeatherCode[0] === 61 || dailyWeatherCode[0] === 63 || dailyWeatherCode[0] === 65) {
            document.getElementById('dayCode-1').src = 'icon-rain.webp'
        } else if (dailyWeatherCode[0] === 71 || dailyWeatherCode[0] === 73 || dailyWeatherCode[0] === 75) {
            document.getElementById('dayCode-1').src = 'icon-snow.webp'
        } else if (dailyWeatherCode[0] === 95) {
            document.getElementById('dayCode-1').src = 'icon-storm.webp'
        }

        if (dailyWeatherCode[1] === 0) {
            document.getElementById('dayCode-2').src = 'material-symbols--cloud (1).svg'
            document.getElementById('dayCode-2').width = `45px`
        }
        else if (dailyWeatherCode[1] === 1) {
            document.getElementById('dayCode-2').src = 'icon-sunny.webp'
        } else if (dailyWeatherCode[1] === 2) {
            document.getElementById('dayCode-2').src = 'icon-partly-cloudy.webp'
        } else if (dailyWeatherCode[1] === 3) {
            document.getElementById('dayCode-2').src = 'icon-overcast.webp'
        } else if (dailyWeatherCode[1] === 45 || dailyWeatherCode[1] === 48) {
            document.getElementById('dayCode-2').src = 'icon-fog.webp'
        } else if (dailyWeatherCode[1] === 51 || dailyWeatherCode[1] === 53 || dailyWeatherCode[1] === 55) {
            document.getElementById('dayCode-2').src = 'icon-drizzle.webp'
        } else if (dailyWeatherCode[1] === 61 || dailyWeatherCode[1] === 63 || dailyWeatherCode[1] === 65) {
            document.getElementById('dayCode-2').src = 'icon-rain.webp'
        } else if (dailyWeatherCode[1] === 71 || dailyWeatherCode[1] === 73 || dailyWeatherCode[1] === 75) {
            document.getElementById('dayCode-2').src = 'icon-snow.webp'
        } else if (dailyWeatherCode[1] === 95) {
            document.getElementById('dayCode-2').src = 'icon-storm.webp'
        }

        if (dailyWeatherCode[2] === 0) {
            document.getElementById('dayCode-3').src = 'material-symbols--cloud (1).svg'
            document.getElementById('dayCode-3').width = `45px`
        }
        else if (dailyWeatherCode[2] === 1) {
            document.getElementById('dayCode-3').src = 'icon-sunny.webp'
        } else if (dailyWeatherCode[2] === 2) {
            document.getElementById('dayCode-3').src = 'icon-partly-cloudy.webp'
        } else if (dailyWeatherCode[2] === 3) {
            document.getElementById('dayCode-3').src = 'icon-overcast.webp'
        } else if (dailyWeatherCode[2] === 45 || dailyWeatherCode[2] === 48) {
            document.getElementById('dayCode-3').src = 'icon-fog.webp'
        } else if (dailyWeatherCode[2] === 51 || dailyWeatherCode[2] === 53 || dailyWeatherCode[2] === 55) {
            document.getElementById('dayCode-3').src = 'icon-drizzle.webp'
        } else if (dailyWeatherCode[2] === 61 || dailyWeatherCode[2] === 63 || dailyWeatherCode[2] === 65) {
            document.getElementById('dayCode-3').src = 'icon-rain.webp'
        } else if (dailyWeatherCode[2] === 71 || dailyWeatherCode[2] === 73 || dailyWeatherCode[2] === 75) {
            document.getElementById('dayCode-3').src = 'icon-snow.webp'
        } else if (dailyWeatherCode[2] === 95) {
            document.getElementById('dayCode-3').src = 'icon-storm.webp'
        }

        if (dailyWeatherCode[3] === 0) {
            document.getElementById('dayCode-4').src = 'material-symbols--cloud (1).svg'
            document.getElementById('dayCode-4').width = `45px`
        }
        else if (dailyWeatherCode[3] === 1) {
            document.getElementById('dayCode-4').src = 'icon-sunny.webp'
        } else if (dailyWeatherCode[3] === 2) {
            document.getElementById('dayCode-4').src = 'icon-partly-cloudy.webp'
        } else if (dailyWeatherCode[3] === 3) {
            document.getElementById('dayCode-4').src = 'icon-overcast.webp'
        } else if (dailyWeatherCode[3] === 45 || dailyWeatherCode[3] === 48) {
            document.getElementById('dayCode-4').src = 'icon-fog.webp'
        } else if (dailyWeatherCode[3] === 51 || dailyWeatherCode[3] === 53 || dailyWeatherCode[3] === 55) {
            document.getElementById('dayCode-4').src = 'icon-drizzle.webp'
        } else if (dailyWeatherCode[3] === 61 || dailyWeatherCode[3] === 63 || dailyWeatherCode[3] === 65) {
            document.getElementById('dayCode-4').src = 'icon-rain.webp'
        } else if (dailyWeatherCode[3] === 71 || dailyWeatherCode[3] === 73 || dailyWeatherCode[3] === 75) {
            document.getElementById('dayCode-4').src = 'icon-snow.webp'
        } else if (dailyWeatherCode[3] === 95) {
            document.getElementById('dayCode-4').src = 'icon-storm.webp'
        }

        if (dailyWeatherCode[4] === 0) {
            document.getElementById('dayCode-5').src = 'material-symbols--cloud (1).svg'
            document.getElementById('dayCode-5').width = `45px`
        }
        else if (dailyWeatherCode[4] === 1) {
            document.getElementById('dayCode-5').src = 'icon-sunny.webp'
        } else if (dailyWeatherCode[4] === 2) {
            document.getElementById('dayCode-5').src = 'icon-partly-cloudy.webp'
        } else if (dailyWeatherCode[4] === 3) {
            document.getElementById('dayCode-5').src = 'icon-overcast.webp'
        } else if (dailyWeatherCode[4] === 45 || dailyWeatherCode[4] === 48) {
            document.getElementById('dayCode-5').src = 'icon-fog.webp'
        } else if (dailyWeatherCode[4] === 51 || dailyWeatherCode[4] === 53 || dailyWeatherCode[4] === 55) {
            document.getElementById('dayCode-5').src = 'icon-drizzle.webp'
        } else if (dailyWeatherCode[4] === 61 || dailyWeatherCode[4] === 63 || dailyWeatherCode[4] === 65) {
            document.getElementById('dayCode-5').src = 'icon-rain.webp'
        } else if (dailyWeatherCode[4] === 71 || dailyWeatherCode[4] === 73 || dailyWeatherCode[4] === 75) {
            document.getElementById('dayCode-5').src = 'icon-snow.webp'
        } else if (dailyWeatherCode[4] === 95) {
            document.getElementById('dayCode-5').src = 'icon-storm.webp'
        }

        if (dailyWeatherCode[5] === 0) {
            document.getElementById('dayCode-6').src = 'material-symbols--cloud (1).svg'
            document.getElementById('dayCode-6').width = `45px`
        }
        else if (dailyWeatherCode[5] === 1) {
            document.getElementById('dayCode-6').src = 'icon-sunny.webp'
        } else if (dailyWeatherCode[5] === 2) {
            document.getElementById('dayCode-6').src = 'icon-partly-cloudy.webp'
        } else if (dailyWeatherCode[5] === 3) {
            document.getElementById('dayCode-6').src = 'icon-overcast.webp'
        } else if (dailyWeatherCode[5] === 45 || dailyWeatherCode[5] === 48) {
            document.getElementById('dayCode-6').src = 'icon-fog.webp'
        } else if (dailyWeatherCode[5] === 51 || dailyWeatherCode[5] === 53 || dailyWeatherCode[5] === 55) {
            document.getElementById('dayCode-6').src = 'icon-drizzle.webp'
        } else if (dailyWeatherCode[5] === 61 || dailyWeatherCode[5] === 63 || dailyWeatherCode[5] === 65) {
            document.getElementById('dayCode-6').src = 'icon-rain.webp'
        } else if (dailyWeatherCode[5] === 71 || dailyWeatherCode[5] === 73 || dailyWeatherCode[5] === 75) {
            document.getElementById('dayCode-6').src = 'icon-snow.webp'
        } else if (dailyWeatherCode[5] === 95) {
            document.getElementById('dayCode-6').src = 'icon-storm.webp'
        }

        if (dailyWeatherCode[6] === 0) {
            document.getElementById('dayCode-7').src = 'material-symbols--cloud (1).svg'
            document.getElementById('dayCode-7').width = `45px`
        }
        else if (dailyWeatherCode[6] === 1) {
            document.getElementById('dayCode-7').src = 'icon-sunny.webp'
        } else if (dailyWeatherCode[6] === 2) {
            document.getElementById('dayCode-7').src = 'icon-partly-cloudy.webp'
        } else if (dailyWeatherCode[6] === 3) {
            document.getElementById('dayCode-7').src = 'icon-overcast.webp'
        } else if (dailyWeatherCode[6] === 45 || dailyWeatherCode[6] === 48) {
            document.getElementById('dayCode-7').src = 'icon-fog.webp'
        } else if (dailyWeatherCode[6] === 51 || dailyWeatherCode[6] === 53 || dailyWeatherCode[6] === 55) {
            document.getElementById('dayCode-7').src = 'icon-drizzle.webp'
        } else if (dailyWeatherCode[6] === 61 || dailyWeatherCode[6] === 63 || dailyWeatherCode[6] === 65) {
            document.getElementById('dayCode-7').src = 'icon-rain.webp'
        } else if (dailyWeatherCode[6] === 71 || dailyWeatherCode[6] === 73 || dailyWeatherCode[6] === 75) {
            document.getElementById('dayCode-7').src = 'icon-snow.webp'
        } else if (dailyWeatherCode[6] === 95) {
            document.getElementById('dayCode-7').src = 'icon-storm.webp'
        }



        //current time

        const timestampInMilliseconds = unixTimestamp * 1000;
        const dateObject = new Date(timestampInMilliseconds);
        const dateString = `${dateObject.getUTCFullYear()}-${dateObject.getMonth() + 1}-${dateObject.getUTCDate()}`
        const date = new Date(dateString)
        const options = {
            weekday: 'long', // "day in words"
            year: 'numeric', // "year"
            month: 'long', // "month"
            day: 'numeric' // "day in number"
        };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        document.getElementById('currentDate').innerHTML = formattedDate


        //daily forecast 
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        document.getElementById('day-1').innerText = days[new Date(dailyUnixTimestamp[0] * 1000).getDay()]
        document.getElementById('day-2').innerText = days[new Date(dailyUnixTimestamp[1] * 1000).getDay()]
        document.getElementById('day-3').innerText = days[new Date(dailyUnixTimestamp[2] * 1000).getDay()]
        document.getElementById('day-4').innerText = days[new Date(dailyUnixTimestamp[3] * 1000).getDay()]
        document.getElementById('day-5').innerText = days[new Date(dailyUnixTimestamp[4] * 1000).getDay()]
        document.getElementById('day-6').innerText = days[new Date(dailyUnixTimestamp[5] * 1000).getDay()]
        document.getElementById('day-7').innerText = days[new Date(dailyUnixTimestamp[6] * 1000).getDay()]




        document.getElementById('max-1').innerText = Math.round(maxs[0])
        document.getElementById('max-2').innerText = Math.round(maxs[1])
        document.getElementById('max-3').innerText = Math.round(maxs[2])
        document.getElementById('max-4').innerText = Math.round(maxs[3])
        document.getElementById('max-5').innerText = Math.round(maxs[4])
        document.getElementById('max-6').innerText = Math.round(maxs[5])
        document.getElementById('max-7').innerText = Math.round(maxs[6])

        document.getElementById('min-1').innerText = Math.round(mins[0])
        document.getElementById('min-2').innerText = Math.round(mins[1])
        document.getElementById('min-3').innerText = Math.round(mins[2])
        document.getElementById('min-4').innerText = Math.round(mins[3])
        document.getElementById('min-5').innerText = Math.round(mins[4])
        document.getElementById('min-6').innerText = Math.round(mins[5])
        document.getElementById('min-7').innerText = Math.round(mins[6])

        tempUnit.innerText = currentUnits.temperature_2m
        humidityUnit.innerText = currentUnits.relative_humidity_2m
        windUnit.innerText = currentUnits.wind_speed_10m
        precipitationUnit.innerText = currentUnits.precipitation

        currentTemperature.innerText = current.temperature_2m
        currentTemp.innerText = current.apparent_temperature
        currentHumidity.innerText = current.relative_humidity_2m
        currentWind.innerText = current.wind_speed_10m
        currentPrecipitation.innerText = current.precipitation


    } catch (error) {
        console.error(error);

    }

}

