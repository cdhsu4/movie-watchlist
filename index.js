const searchBarContainer = document.getElementById('search-bar');
const searchBarBtn = document.getElementById('search-bar-btn');
const movieResults = document.getElementById('movie-results');

const globalStorageArr = [];

searchBarContainer.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(searchBarContainer);
    

    async function fetchMovies() {
        try {
            //const searchResults = [];

            const responseSearch = await fetch(`http://www.omdbapi.com/?apikey=34d707e9&s=${formData.get('movie-search')}`);
            const dataSearch = await responseSearch.json();

            movieResults.innerHTML = ``;
            movieResults.classList.remove('movie-results-empty');

            for (let i = 0; i < 3; i++) {
                fetch(`http://www.omdbapi.com/?apikey=34d707e9&i=${dataSearch.Search[i].imdbID}&plot=full`)
                    .then(res => res.json())
                    .then(data => {
                        const movieHTML = `
                        <div class="movie">
                            <img src="${data.Poster}" alt="A movie poster"/>
                            <div class="movie-info">
                                <div class="movie-header">
                                    <p class="movie-title">${data.Title}</p>
                                    <i class="fa-solid fa-star"></i>
                                    <p class="movie-rating movie-small-text">${data.imdbRating}</p>
                                </div>
                                <div class="movie-details">
                                    <p class="movie-small-text">${data.Runtime}</p>
                                    <p class="movie-small-text">${data.Genre}</p>
                                    <button class="add-movie-btn"><i class="fa-solid fa-circle-plus" data-imdbid="${data.imdbID}"></i></button>
                                    <p>Watchlist</p>
                                </div>
                                <p class="movie-small-text">${data.Plot}</p>
                            </div>
                        </div>
                        `
                        console.log(data.imdbID);
                        movieResults.innerHTML += movieHTML;

                        //searchResults.push(movieHTML);
                    })
                //.then()
            }   
            console.log(dataSearch);
        } catch(error) {
            console.log(error);
        }
    }

    fetchMovies();


    // Store form input in variable
    // Fetch request to movie API 
    // Store movie list data
    // Format movie data into template literals
});


// Button event listener to add to watch list
    // Store movies added to watchlist to Local Storage
        const addMovieBtn = document.getElementById('add-movie-btn');



        document.addEventListener('click', function(e) {
            if (e.target.dataset.imdbid) {
                //e.preventDefault();
                globalStorageArr.push(e.target.dataset.imdbid);
                console.log(globalStorageArr);

                localStorage.setItem("movieIdentifier", JSON.stringify(globalStorageArr));
                console.log(localStorage);
            }
        })