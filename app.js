const searchBox = document.querySelector('#cityInput')
const minMax = document.querySelector('.minmax')
const city = document.querySelector('.city')
const cs = document.querySelector('.graus')
const searchButton = document.querySelector('.material-icons')

const api = {
    key: 'c706a5262fa327f359ff4e388bb7c79b',
    base: 'https://api.openweathermap.org/data/2.5/'
}

searchBox.addEventListener('keypress', SetCity)
searchButton.addEventListener('click', () => {
    GetResults(searchBox.value)
})

function SetCity(event){
    if(event.keyCode == 13){
       GetResults(searchBox.value)
    }
}

function GetResults(city){
    fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json()
    }).then(DisplayResults)
}

function DisplayResults(weather){
    console.log(weather)
    if(weather.cod != 404){
        let newCity = weather.name
        let newCountry = weather.sys.country
        let newMin = String(weather.main.temp_min).substring(0, 2)
        let newMax = String(weather.main.temp_max).substring(0, 2)
        let newCs = String(weather.main.temp).substring(0, 2)
        city.innerHTML = `${newCity} - ${newCountry}`
        minMax.innerHTML = `${newMin}ºc  /  ${newMax}ºc`
        cs.innerHTML = `${newCs}ºc`
    }else{
        alert('cidade não encontrada.')
    }

}
