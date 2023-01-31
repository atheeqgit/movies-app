const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

async function getMovies() {
  const response = await fetch(APIURL);

  const respData = await response.json();

  console.log(respData.results);
  showMovies(respData.results);
}

getMovies();

const form = document.querySelector("form");
const input = document.querySelector(".search-box");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value != "") {
    getSearchMovies(input.value);
  }

  input.value = "";
});

async function getSearchMovies(input) {
  const response = await fetch(SEARCHAPI + input);

  const respData = await response.json();

  console.log(respData.results);
  showMovies(respData.results);
}
// src="${getImage(movie.backdrop_path)}"
function showMovies(movies) {
  const main = document.querySelector("main");
  main.innerHTML = "";

  movies.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.className = "movie";

    movieEl.innerHTML = `
    <img
           
            src="${
              movie.backdrop_path
                ? `${IMGPATH}` + `${movie.backdrop_path}`
                : `https://www.shepherdsearchgroup.com/wp-content/themes/shepherd/images/no-image-found-360x250.png`
            }"
           
            alt=""
            id="movie-img"
          />
          <div class="details">
            <h3 class="name " >${movie.original_title}</h3>
            <div class="rating " id="${getColor(movie.vote_average)}">${
      movie.vote_average
    }</div>
          </div>
          <div class="about-box">
            CONTEXT: <br />
            ${movie.overview} <br />
            <br /> 
            VOTES : ${movie.vote_count} <br />RELEASED : ${movie.release_date} 
          </div>
    `;

    main.appendChild(movieEl);
  });
}

//? third way of trying which did not worked
// function getImage(backdropPath) {
//   let img;

//   if (`${backdropPath}` == null) {
//     img = `https://www.shepherdsearchgroup.com/wp-content/themes/shepherd/images/no-image-found-360x250.png`;
//   } else {
//     img = `${IMGPATH}${backdropPath}`;
//   }

//   return img;
// }
function getColor(rating) {
  if (rating >= 7) {
    return "green";
  } else if (rating >= 4) {
    return "orange";
  } else {
    return "red";
  }
}
