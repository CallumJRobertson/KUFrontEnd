// search.js - handles search on the home page

(function () {
  const resultsEl = $("#results");
  const resultsMetaEl = $("#resultsMeta");

  function displayResults(results, type) {
    resultsEl.empty();

    if (!results || results.length === 0) {
      resultsMetaEl.text("No results found.");
      return;
    }

    resultsMetaEl.text(`${results.length} result(s)`);

    results.forEach((item) => {
      const title = item.title || item.name || "Untitled";
      const overview = item.overview || "";
      const poster = item.poster_path
        ? `${TMDB_IMAGE_BASE}${item.poster_path}`
        : TMDB_POSTER_PLACEHOLDER;
      const year =
        (item.release_date || item.first_air_date || "").split("-")[0] || "—";
      const rating = item.vote_average
        ? item.vote_average.toFixed(1)
        : "N/A";
      const id = item.id;

      const card = $(`
        <article class="card">
          <div class="card-poster-wrapper">
            <img src="${poster}" alt="${title}" />
          </div>
          <div class="card-title">${title}</div>
          <div class="card-meta">
            ${year} · ⭐ ${rating}
          </div>
        </article>
      `);

      card.on("click", () => {
        const detailType = type || $("#searchType").val();
        window.location.href = `detail.html?id=${id}&type=${detailType}`;
      });

      resultsEl.append(card);
    });
  }

  function searchContent() {
    const query = $("#searchInput").val().trim();
    const type = $("#searchType").val();

    if (!query) {
      resultsMetaEl.text("Type something to search.");
      return;
    }

    const endpoint =
      type === "movie"
        ? `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
            query
          )}`
        : `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
            query
          )}`;

    resultsMetaEl.text("Searching…");

    $.getJSON(endpoint)
      .done((data) => {
        displayResults(data.results || [], type);
      })
      .fail((err) => {
        console.error("TMDb search error", err);
        resultsMetaEl.text("There was a problem talking to TMDb.");
      });
  }

  $("#searchBtn").on("click", searchContent);
  $("#searchInput").on("keypress", (event) => {
    if (event.which === 13) {
      searchContent();
    }
  });
})();
