const key = 'A remplir'

const main = document.querySelector('main')
let pageIndex;
let totalResult;
let moviesList = [];
let movieName = "batman";
let notFound = 'https://aeroclub-issoire.fr/wp-content/uploads/2020/05/image-not-found.jpg'

const indexesContainer = document.querySelector('.indexes-container');

const indexPagesDisplayer = (data) => {

    data > 200 ? data = 200 : data;
    let numberOfPages = Math.floor(data / 20)

    indexesContainer.innerHTML = "";
    for (let i = 1; i < numberOfPages + 1; i++) {
        var pageIndex = document.createElement("span");
        pageIndex.className = "page-index";
        pageIndex.id = i;
        pageIndex.textContent = i;
        indexesContainer.appendChild(pageIndex);
        pageIndex = document.querySelectorAll('.page-index');
    }
    pageIndex.forEach((index) => {
        index.addEventListener('click', () => {
            console.log(movieName, index.id)
            movieNameFetcher(movieName, index.id)
        });
    });
}

const moviesDisplayer = (movies) => {
    console.log(movies)
    let img;
    main.innerHTML = "";

    for (let i = 0; i < movies.length; i++) {

        if (movies[i].poster_path == null) {
            img = notFound
        } else {
            img = `https://image.tmdb.org/t/p/original/${movies[i].poster_path}`
        }
        let movieContainer = document.createElement("div");
        movieContainer.className = "movie-container";

        let imgMovie = document.createElement("div");
        imgMovie.className = "img-movie";
        let imgElement = document.createElement("img");
        imgElement.src = img;
        imgElement.alt = "image du film " + movies[i].title;
        imgMovie.appendChild(imgElement);

        let titleMovieContainer = document.createElement("div");
        titleMovieContainer.className = "title-movie-container";
        let titleElement = document.createElement("h3");
        titleElement.textContent = movies[i].title;
        titleMovieContainer.appendChild(titleElement);

        let infosMovieContainer = document.createElement("div");
        infosMovieContainer.className = "infos-movie-container";
        let pElement = document.createElement("p");
        pElement.textContent = movies[i].overview;
        infosMovieContainer.appendChild(pElement);

        // Ajouter les éléments au conteneur principal
        movieContainer.appendChild(imgMovie);
        movieContainer.appendChild(titleMovieContainer);
        movieContainer.appendChild(infosMovieContainer);

        // Ajouter le conteneur principal à l'élément parent
        main.appendChild(movieContainer);
    }
}

const movieNameFetcher = async (movie, page) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + key
        }
    };

    await fetch('https://api.themoviedb.org/3/search/movie?&query=' + movie + "&page=" + page, options)
        .then(response => response.json())
        .then(data => {
            moviesList = data.results.slice(0, 200)
            totalResult = data.total_results
            console.log(moviesList);
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
        movieName = document.getElementById('search-text').value;
    } else {
        alert("Entrez un nom de film")
    }
});

