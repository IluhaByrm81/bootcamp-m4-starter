export async function getMovies(search) {
  const response = await fetch(
    `http://www.omdbapi.com/?s=${search}&apikey=fe926918`
  );
  const data = await response.json();
  return data.Search;
}

export async function getMoviesID(searchID) {
  const response = await fetch(
    `http://www.omdbapi.com/?i=${searchID}&apikey=fe926918`
  );
  const data = await response.json();
  return data;
}

export async function postMoviesID(title, movies) {
  const newMovisList = {
    title: title,
    movies: movies.map((elem) => elem.imdbID),
  };

  const response = await fetch(
    "https://acb-api.algoritmika.org/api/movies/list",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newMovisList),
    }
  );
  const data = await response.json();
  return data;
}

export async function getNewIdMovies(id) {
  const response = await fetch(
    `https://acb-api.algoritmika.org/api/movies/list/${id}`
  );
  const data = await response.json();
  const moviesPromises = data.movies.map((movieId) => {
    return getMoviesID(movieId);
  });
  const movies = await Promise.all(moviesPromises);
  return {
    id: data.id,
    title: data.title,
    movies: movies,
  };
}
