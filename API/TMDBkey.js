// API/TMDBApi.js

const API_TOKEN = "117573e02f83d77fb3eba4bc42fed0d3";
export function getFilmsFromApiWithSearchedText (text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text +'&page=' + page
    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))  
}
export function getImageFromAPI(endurl){
    return 'https://image.tmdb.org/t/p/w300' + endurl
}

export function getFilmDetailFromAPI(id){
    return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + API_TOKEN + '&language=fr') 
    .then((response) => response.json())
    .catch((error) => console.error(error))  
}
