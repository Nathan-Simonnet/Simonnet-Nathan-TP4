console.log("movie db")

// 379cd6130723c7c61a78ce00569516c5
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzljZDYxMzA3MjNjN2M2MWE3OGNlMDA1Njk1MTZjNSIsInN1YiI6IjY1N2FlMTIxN2EzYzUyMDEwY2RmOWFiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5CMWVNczbg37OUH7kmPMoRvuNiNe4MK44IyWSdXI7TQ
// https://aeroclub-issoire.fr/wp-content/uploads/2020/05/image-not-found.jpg
// console.log("movie db");

const main = document.querySelector('main')
let pageIndex;
let totalResult;
let moviesList = [];
let movieName = "batman";

const indexesContainer = document.querySelector('.indexes-container');

const indexPagesDisplayer = (data) => {
    const numberOfPages = Math.floor(data / 20)
    console.log(numberOfPages)

    indexesContainer.innerHTML = "";
    for (let i = 1; i < numberOfPages + 1; i++) {
        indexesContainer.innerHTML += `
        <span class="page-index" id="${i}">${i}</span>
        `
        pageIndex = document.querySelectorAll('.page-index');
    }
    pageIndex.forEach((index) => {
        index.addEventListener('click', () => {
            // console.log(index.id)
            movieNameFetcher(movieName, index.id)
        });
    });
}

const moviesDisplayer = (movies, img) => {
    console.log(movies)

    main.innerHTML = "";

    for (let i = 0; i < movies.length; i++) {

        main.innerHTML +=
            `
        <div class="movie-container">
            <div class="img-movie">
                <img src="https://image.tmdb.org/t/p/original/${movies[i].poster_path}" alt="image du film ${movies[i].title}">
            </div>
            <div class="title-movie-container">
                <h3>${movies[i].title}</h3>
            </div>
            <div class="infos-movie-container">
                <p>${movies[i].overview}</p>
            </div>
        </div>
        
        `
    }
}


const movieNameFetcher = async (movie, page) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzljZDYxMzA3MjNjN2M2MWE3OGNlMDA1Njk1MTZjNSIsInN1YiI6IjY1N2FlMTIxN2EzYzUyMDEwY2RmOWFiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5CMWVNczbg37OUH7kmPMoRvuNiNe4MK44IyWSdXI7TQ'
        }
    };

    await fetch('https://api.themoviedb.org/3/search/movie?&query=' + movie + "&page=" + page, options)
        .then(response => response.json())
        .then(data => {
            moviesList = data.results
            totalResult = data.total_results
            console.log(data);
        })
        .catch(err => console.error(err));

    moviesDisplayer(moviesList)
    indexPagesDisplayer(totalResult)

}


window.addEventListener('load', () => {
    movieNameFetcher('batmAn', 1)
});

document.getElementById('search-btn').addEventListener('click', (e) => {
    e.preventDefault()
    if (document.getElementById('search-text').value.length > 0) {
        movieNameFetcher(document.getElementById('search-text').value, 1)
    } else {
        alert("Entrez un nom de film")
    }
});

