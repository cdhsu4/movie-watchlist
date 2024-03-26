const searchBarContainer = document.getElementById('search-bar');
const searchBarBtn = document.getElementById('search-bar-btn');

searchBarContainer.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(searchBarContainer);
    console.log(formData.get('movie-search'));

    // Store form input in variable
    // Fetch request to movie API 
    // Store movie list data
    // Format movie data into template literals
});

// Button event listener to add to watch list
    // Store movies added to watchlist to Local Storage

    