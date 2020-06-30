//TMDB API key 
const API_KEY = '9f2ae0cac26bf029300d1293e441efbf'
//search for movies, I have added the /search/movie after the /3/ so the user can dynamicly search for movies that are contained in the TMDB database.
const searchQuery = "https://api.themoviedb.org/3/search/movie/?api_key=9f2ae0cac26bf029300d1293e441efbf&language=en-US&page=1"
//Image URL, removes the movie image so I can add it in dynamiclly
const IMAGE_URL = "https://image.tmdb.org/t/p/w500"


//DOM elements
//grab the search id from the document
const searchVal = document.getElementById('search');
//grab the input-value id from the document
const inputVal = document.getElementById('input-value');
//grab the movie-search id from the document
const movieSearch = document.getElementById('movie-search');
const imgElement = document.querySelector('img');




function movieSection(movies) {
    return movies.map((movie) => {
        //if the image has no value, do not display
        if (movie.poster_path){
            //displays the image from the api
            return `<img 
                src=${IMAGE_URL + movie.poster_path}
                data-movie-id=${movie.id}
            />`;
        }
    })
}

//36.00;
function createMovieContainer(movies) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const movieTemplate = `
        <section class="section">
            ${movieSection(movies)}
        </section>
        <div class="content">
            <p id="content-close">X</p>
        </div>
    `;
    movieElement.innerHTML = movieTemplate;
        return movieElement;
}

function renderMovies(data){
    //8. data results, gets all the movies from the database
    const movies = data.results;
    //9. putting the createMovieContainer on line 24 inside a constant 'movieBlock' 
    const movieBlock = createMovieContainer(movies);
    //10. appending 'movieBlock' and placing it inside of the document on line 38
    movieSearch.appendChild(movieBlock);
    //11. logs the .json data to the console as an object
    console.log('Data: ', data);    
}

//1. on event 'click' fire the anonymous function with the parameter 'event'
searchVal.addEventListener('click', event => {
    //2. prevents the default of the event parameter from submitting the form to a server
    event.preventDefault();
    
    //3. grab the vale of the constant 'inputVal' and store it in constant 'value' 
    const value = inputVal.value;
    
    //4. this adds the &query= search option to the end of the 'searchQuery' constant, read more here: https://developers.themoviedb.org/3/search/search-movies
    const newQuery = searchQuery + '&query=' + value;
    
    //5. fetch the constant 'newQuery' 
    fetch(newQuery)
        //6. this returns the data in .json format
        .then((res) => {
            return res.json()
        })
        //7. grab the data in .json format
        .then(renderMovies)
        //display an error when something is wrong
        .catch((error) => {
            console.err('Error: ', error);
        })
        //empty the user search value on click
        inputVal.value = '';
    console.log('Value:', value);
});

document.addEventListener('click', event => {
    const target = event.target;

    if (target.tagName.toLowerCase() === 'img'){
        console.log('Hello World');
        const section = event.target.parentElement;
        const content = section.nextElementSibling;
        content.classList.add('content-display');
    }
})

//unfinished