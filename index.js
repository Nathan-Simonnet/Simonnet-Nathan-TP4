console.log("movie db")

// 379cd6130723c7c61a78ce00569516c5
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzljZDYxMzA3MjNjN2M2MWE3OGNlMDA1Njk1MTZjNSIsInN1YiI6IjY1N2FlMTIxN2EzYzUyMDEwY2RmOWFiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5CMWVNczbg37OUH7kmPMoRvuNiNe4MK44IyWSdXI7TQ

// console.log("movie db");

const main = document.querySelector('main')
let totalResult;
let currentPage = 1;
let moviesList = [];


const indexesContainer = document.querySelector('.indexes-container');

const indexPagesDisplayer = (data) => {
    const numberOfPages = Math.floor(data / 20)
    console.log(numberOfPages)

    indexesContainer.innerHTML = "";
    for (let i = 1; i < numberOfPages + 1; i++) {
        indexesContainer.innerHTML += `
        <span class="pages-index" id="${i}">${i}</span>
        `
    }

}

const moviesDisplayer = (movies, img) => {
    console.log(movies)

    main.innerHTML = "";

    for (let i = 0; i < movies.length; i++) {
        main.innerHTML +=
            `
        <div class="movie-container">
            <div class="img-movie">
                <img src="doc/batman-img.png" alt="image du film ${movies[i].title}">
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
    movieNameFetcher('batmAn', currentPage)
});


// const moviesImagesFetcher = async (id) => {
//     const options = {
//         method: 'GET',
//         headers: {
//             accept: 'application/json',
//             Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzljZDYxMzA3MjNjN2M2MWE3OGNlMDA1Njk1MTZjNSIsInN1YiI6IjY1N2FlMTIxN2EzYzUyMDEwY2RmOWFiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5CMWVNczbg37OUH7kmPMoRvuNiNe4MK44IyWSdXI7TQ'
//         }
//     };
//     await fetch('https://api.themoviedb.org/3/movie/' + 268 + '/images', options)
//         .then(response => response.json())
//         .then(data => console.log(data))
//         .catch(err => console.error(err));

// }

// moviesImagesFetcher(870358)