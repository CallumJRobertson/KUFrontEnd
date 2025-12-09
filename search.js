// search.js
$(document).ready(function() {
    const resultsEl = $("#results");
    const resultsMetaEl = $("#resultsMeta");

    // Handle Button Click
    $("#searchBtn").on("click", searchContent);
    
    // Handle "Enter" Key
    $("#searchInput").on("keypress", function(e) {
        if (e.which === 13) searchContent();
    });

    function searchContent() {
        const query = $("#searchInput").val().trim();
        const type = $("#searchType").val();

        if (!query) {
            resultsMetaEl.text("Please type something to search.");
            return;
        }

        // ✅ FIX: Read from window.CONFIG
        const apiKey = window.CONFIG.TMDB_API_KEY;
        
        // Safety check
        if (!apiKey || apiKey.includes("YOUR_TMDB_API")) {
            alert("Error: TMDb API Key is missing in config.js");
            return;
        }

        const url = `https://api.themoviedb.org/3/search/${type}?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

        resultsMetaEl.text("Searching...");
        resultsEl.empty();

        $.getJSON(url)
            .done(function(data) {
                displayResults(data.results || [], type);
            })
            .fail(function(jqXHR) {
                console.error("Search Error:", jqXHR);
                resultsMetaEl.text("Error connecting to TMDb. Check console.");
            });
    }

    function displayResults(results, type) {
        if (!results || results.length === 0) {
            resultsMetaEl.text("No results found.");
            return;
        }

        resultsMetaEl.text(`${results.length} results found`);

        results.forEach(item => {
            const title = item.title || item.name || "Untitled";
            const date = item.release_date || item.first_air_date || "";
            const year = date.split("-")[0] || "N/A";
            
            // ✅ FIX: Read images from window.CONFIG
            const poster = item.poster_path 
                ? window.CONFIG.TMDB_IMAGE_BASE + item.poster_path 
                : window.CONFIG.TMDB_POSTER_PLACEHOLDER;

            // Using your original 'card' HTML structure
            const card = $(`
                <div class="card">
                    <div class="card-poster-wrapper">
                        <img src="${poster}" alt="${title}">
                    </div>
                    <div class="card-content">
                        <div class="card-title">${title}</div>
                        <div class="card-meta">${year}</div>
                    </div>
                </div>
            `);

            card.on("click", () => {
                window.location.href = `detail.html?id=${item.id}&type=${type}`;
            });

            resultsEl.append(card);
        });
    }
});
