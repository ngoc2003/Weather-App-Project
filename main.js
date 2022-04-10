/*
    MADE BY BUI NGOC WITH HEART
    DESIGN IDEA BY NODEMY
*/
const search =document.querySelector('.search');
const city =document.querySelector('.city');
const country =document.querySelector('.country');
const value =document.querySelector('.value');
const des =document.querySelector('.des');
const visibility =document.querySelector('.visibility');
const wind =document.querySelector('.wind');
const sun =document.querySelector('.sun');
const time = document.querySelector('.time');
const content = document.querySelector('.content');
const weather = document.querySelector('#weather');
const backGround = ['./cold.png','./warm.jpg','./hot.png'];
function changeBg(url) {
    document.body.style.background = `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,1)), url(${url}) center/cover no-repeat`;
    weather.style.background = `url(${url}) center/cover no-repeat`
}
async function changeWeatherUI() {
        let capitalSearch = search.value.trim()         
        let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${capitalSearch}&appid=ebef9cab71c7a773a1b41e2eaa82348b`
        let data = await fetch(apiUrl).then(res=> res.json());   
        if (data.cod == 200) {
            let temp = Math.round(data.main.temp-273.15);
            content.style.display = 'block';
            value.innerHTML = temp +' <sup>o</sup>C';
            city.innerText = data.name+' ,';
            country.innerText = data.sys.country;
            visibility.innerText = data.visibility + 'm';
            wind.innerText = data.wind.speed + 'm/s';
            sun.innerText = data.clouds.all + '%';
            des.innerText = data.weather[0].main; 
            if(temp>25) {
                changeBg(backGround[2])
            } else if(temp>18) {
                changeBg(backGround[1])
            } else {
                changeBg(backGround[0])
            }
        } else {
            content.style.display = 'none';
            alert('Hey Bro, I cant find your location:(. Please try other country instead!');
        }
}

setInterval( () => {
    time.innerText = new Date().toLocaleString('vi');
},1000);
content.style.display = 'none';
// content.classList.add('hide');
search.addEventListener('keyup', (e)=> {
    if (e.key == 'Enter') {
        changeWeatherUI();
        search.value='';
    }
})
