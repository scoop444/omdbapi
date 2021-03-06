document.getElementById("get").addEventListener("click", function () {
    var search = document.getElementById("search")["value"];
    var year = document.getElementById("year")["value"];
    document.querySelectorAll('.movie-title').forEach(function (e) { return e.remove(); });
    if (search.length > 2) {
        fetch("https://api.themoviedb.org/3/search/movie?api_key=ae0ceb1eea00f5ae3235218c36add3b8&language=en-US&query=" + search + "&page=1&include_adult=false&year&primary_release_year=" + year)
            .then(function (response) {
            if (!response.ok) { }
            return response.json();
        })
            .then(function (res) {
            var results = document.getElementById("results");
            results.innerText = res.total_results + " Results";
            if (res.Error !== "Movie not found!") {
                res.results.forEach(function (element) {
                    var moviesContainer = document.getElementById("movies");
                    moviesContainer.classList.remove("hide-me");
                    var movieDiv = document.createElement("article");
                    movieDiv.classList.add("movie-title");
                    movieDiv.classList.add("col");
                    var movieTitle = document.createElement("h2");
                    var movieSummary = document.createElement("p");
                    var moviePoster = document.createElement("img");
                    movieTitle.innerHTML = "<a class=\"movielink\" href=\"https://www.themoviedb.org/movie/" + element.id + "\" target=_blank\">" + element.original_title + ", " + element.release_date.substring(0, 4) + "</a>";
                    if (element.overview == "") {
                        movieSummary.innerHTML = "<em>Movie Summary Not Found</em";
                    }
                    else {
                        movieSummary.innerText = "" + element.overview;
                    }
                    moviePoster.setAttribute("alt", element.original_title + " Movie Poster");
                    if (element.backdrop_path == null) {
                        moviePoster.src = "img/default_500.png";
                    }
                    else {
                        moviePoster.src = "https://image.tmdb.org/t/p/w500" + element.backdrop_path;
                    }
                    document.getElementById("results").append(movieDiv);
                    movieDiv.append(movieTitle);
                    movieDiv.append(moviePoster);
                    movieDiv.append(movieSummary);
                    moviePoster.classList.add("movie-poster");
                    moviePoster.classList.add("rounded");
                    moviePoster.classList.add("float-left");
                });
            }
            else {
                document.getElementById("movies").innerHTML = "<p class=\"alert\">No Movies Found</p>";
            }
        });
    }
    else {
        alert("Your search term must be more than 2 characters");
    }
});
