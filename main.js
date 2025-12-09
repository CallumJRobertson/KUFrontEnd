const apiKey = '5fbaba84eac155948d9b7fb221ad9e46'; // Replace with your TMDb API key

  function fetchMedia(type) {
    const endpoint = type === 'movies' ? 'movie' : 'tv';
    return fetch(`https://api.themoviedb.org/3/discover/${endpoint}?api_key=${apiKey}&sort_by=popularity.desc`)
      .then(response => response.json())
      .then(data => data.results);
  }

  function loadMovies() {
    fetchMedia('movies').then(movies => {
      const moviesContainer = document.getElementById('movies-container');
      moviesContainer.innerHTML = '';
      movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
          <h3>${movie.title}</h3>
        `;
        moviesContainer.appendChild(movieElement);
      });
    });
  }

  function loadTVShows() {
    fetchMedia('tv').then(tvShows => {
      const moviesContainer = document.getElementById('movies-container');
      moviesContainer.innerHTML = '';
      tvShows.forEach(show => {
        const showElement = document.createElement('div');
        showElement.classList.add('movie');
        showElement.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w200${show.poster_path}" alt="${show.name}">
          <h3>${show.name}</h3>
        `;
        moviesContainer.appendChild(showElement);
      });
    });
  }

  // Load popular movies by default
  loadMovies();

  function loadMovies() {
    fetchMedia('movies').then(movies => {
      const moviesContainer = document.getElementById('movies-container');
      moviesContainer.innerHTML = '';
      movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.setAttribute('id', `movie-${movie.id}`); // Add id attribute
        movieElement.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
          <h3>${movie.title}</h3>
        `;
        moviesContainer.appendChild(movieElement);
  
        // Add click event listener to redirect to details page
        movieElement.addEventListener('click', () => {
          window.location.href = `detail.html?id=${movie.id}&type=movie`;
        });
      });
    });
  }
  
  function loadTVShows() {
    fetchMedia('tv').then(tvShows => {
      const moviesContainer = document.getElementById('movies-container');
      moviesContainer.innerHTML = '';
      tvShows.forEach(show => {
        const showElement = document.createElement('div');
        showElement.classList.add('movie');
        showElement.setAttribute('id', `show-${show.id}`); // Add id attribute
        showElement.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w200${show.poster_path}" alt="${show.name}">
          <h3>${show.name}</h3>
        `;
        moviesContainer.appendChild(showElement);
  
        // Add click event listener to redirect to details page
        showElement.addEventListener('click', () => {
          window.location.href = `detail.html?id=${show.id}&type=tv`;
        });
      });
    });
  }
