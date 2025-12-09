// popular.js - load popular movies / TV shows from TMDb

(function () {
  const gridEl = $("#popularGrid");
  const buttons = $(".filter-button");

  function fetchPopular(type) {
    const endpoint =
      type === "tv"
        ? `https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}`
        : `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}`;

    gridEl.empty();

    $.getJSON(endpoint)
      .done((data) => {
        const results = data.results || [];
        results.forEach((item) => {
          const title = type === "movie" ? item.title : item.name;
          const poster = item.poster_path
            ? `${TMDB_IMAGE_BASE}${item.poster_path}`
            : TMDB_POSTER_PLACEHOLDER;
          const year =
            (item.release_date || item.first_air_date || "").split("-")[0] ||
            "—";
          const rating = item.vote_average
            ? item.vote_average.toFixed(1)
            : "N/A";

          const card = $(`
            <article class="card">
              <div class="card-poster-wrapper">
                <img src="${poster}" alt="${title}" />
              </div>
              <div class="card-title">${title}</div>
              <div class="card-meta">${year} · ⭐ ${rating}</div>
            </article>
          `);

          card.on("click", () => {
            window.location.href = `detail.html?id=${item.id}&type=${type}`;
          });

          gridEl.append(card);
        });
      })
      .fail((err) => {
        console.error("TMDb popular error", err);
      });
  }

  buttons.on("click", function () {
    buttons.removeClass("active");
    $(this).addClass("active");
    const type = $(this).data("type");
    fetchPopular(type);
  });

  // default: movies
  fetchPopular("movie");
})();
