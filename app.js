const searchBox = document.querySelector('#cityInput')
const minMax = document.querySelector('.minmax')
const city = document.querySelector('.city')
const cs = document.querySelector('.graus')
const searchButton = document.querySelector('.material-icons')
const time = document.querySelector('.centerDiv .time')
const greetings = document.querySelector('.greetings')
const api = {
    key: 'c706a5262fa327f359ff4e388bb7c79b',
    base: 'https://api.openweathermap.org/data/2.5/'}
const data = new Date()
let statIcon = document.querySelectorAll('.statIcon')
let horas = data.getHours()

searchBox.addEventListener('keypress', SetCity)
searchButton.addEventListener('click', () => {
    GetResults(searchBox.value)
})

function DataBuild(){
    let diaS = data.getDay()
    let diaM = data.getDate()
    let mes = data.getMonth()
    let ano = data.getFullYear()

    const dias = ['Domingo','Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    time.innerHTML = `<strong>${dias[diaS]}, ${diaM} de ${meses[mes]} ${ano}</strong>`
    if(horas >= 5 && horas <= 12){
        GreetingsWriter('Bom dia!')
    }else if(horas >= 12 && horas < 18){
        GreetingsWriter('Boa tarde!')
    }else{
        GreetingsWriter('Boa noite!')
    }
}
function GreetingsWriter(txt){
    greetings.innerHTML = `<strong>${txt}</strong>`
}
function ChangeWallpaper(hr, status){
    if(hr >= 5 && hr <= 12){
        if(status == 'Rain'){
            document.body.style.backgroundImage = "url('images/rainy-day2.jpg')"
        }else{
            document.body.style.backgroundImage = "url('images/day.jpg')"
        }
    }else if(hr >= 12 && hr < 18){
        if(status == 'Rain'){
            document.body.style.backgroundImage = "url('images/rainy-afternoon.jpg')"
        }else{
            document.body.style.backgroundImage = "url('images/afternoon.jpeg')"
        }
    }else{
        if(status == 'Rain'){
            document.body.style.backgroundImage = "url('images/rainy-night2.jpg')"
        }else{
            document.body.style.backgroundImage = "url('images/night.jpg')"
        }
    }
}
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
function ChangeStatusIcon(status){
    let imagePath = ''
    switch (status){
        case 'Rain':
            imagePath = 'images/rainyIcon.png'
            break
        case 'Clouds':
            imagePath = 'images/cloudyIcon.png' 
            break
        case 'Clear':
            imagePath = 'images/sunnyIcon.png'
            break
    }
    statIcon.forEach((e) =>{
        e.src = imagePath
    })
}

function DisplayResults(weather){
    console.log(weather)
    if(weather.cod != 404){
        let newCity = weather.name
        let newCountry = weather.sys.country
        let newMin = Math.round(weather.main.temp_min)
        let newMax = Math.round(weather.main.temp_max)
        let newCs = Math.round(weather.main.temp)
        city.innerHTML = `${newCity} - ${newCountry}`
        minMax.innerHTML = `${newMin}ºc  /  ${newMax}ºc`
        cs.innerHTML = `${newCs}ºc`
        let status = weather.weather[0].main
        ChangeStatusIcon(status)
        ChangeWallpaper(horas, status)



    }else{
        alert('cidade não encontrada.')
    }

}
DataBuild()
