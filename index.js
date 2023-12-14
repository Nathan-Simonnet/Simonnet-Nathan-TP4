console.log("movie db")

// 379cd6130723c7c61a78ce00569516c5
// eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzljZDYxMzA3MjNjN2M2MWE3OGNlMDA1Njk1MTZjNSIsInN1YiI6IjY1N2FlMTIxN2EzYzUyMDEwY2RmOWFiYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5CMWVNczbg37OUH7kmPMoRvuNiNe4MK44IyWSdXI7TQ

// console.log("movie db");

let movieName = "batman"
let movieList = []


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
        .then(data => movieList = data.results)
        .catch(err => console.error(err));

    console.log(movieList)
}
movieNameFetcher(movieName, 1)