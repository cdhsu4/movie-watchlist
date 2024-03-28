const movieWatchlist = document.getElementById('movie-watchlist');
const globalStorageArr = [];
// IF Condition (localStorage)
    // localStorage.getItem(movieIdentifier)
    // fetch("api-address/?=movieIdentifier")
        //.then(res => res.json())
            //.then(data =>{movieResults.innerHTMl+=
            //`Target all data obj sub-keys wanted`})

if (localStorage.movieIdentifier.length > 0 && document.URL.includes('watchlist.html')
) {
    let myWatchlistArr = JSON.parse(localStorage.getItem("movieIdentifier"));
    console.log(myWatchlistArr);
    try {

        movieWatchlist.innerHTML = ``;
        movieWatchlist.classList.remove('movie-results-empty');

        htmlGeneration(myWatchlistArr);

    } catch (err) {
        console.log("I'm broken on the try-catch");
    } 
} else {
    console.log("I'm broken on the if-else");
}

const addMovieBtn = document.getElementById("add-movie-btn");

document.addEventListener('click', function(e) {
    if (e.target.dataset.imdbid) {
        //e.preventDefault();
        globalStorageArr.splice(e.target.dataset.imdbid);
        console.log(globalStorageArr);

        localStorage.setItem("movieIdentifier", JSON.stringify(globalStorageArr));
        console.log(localStorage);
    }
})

function htmlGeneration(array) {
    for (let i = 0; i < array.length; i++) {
        fetch(`http://www.omdbapi.com/?apikey=34d707e9&i=${myWatchlistArr[i]}`)
            .then(res => res.json())
            .then(data => {
                
                movieWatchlist.innerHTML += `
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
                        <button class="add-movie-btn"><i class="fa-solid fa-circle-minus" data-imdbid="${data.imdbID}"></i></button>
                        <p>Remove</p>
                    </div>
                    <p class="movie-small-text">${data.Plot}</p>
                </div>
            </div>
            `
            globalStorageArr.push(data.imdbID);
            console.log(globalStorageArr);
        })
    }
}