$(document).ready(function () {
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get("id");
    const type = params.get("type");

    if (!itemId || !type) return;

    // 1. Fetch TMDb Data
    const tmdbUrl = type === "movie" 
        ? `https://api.themoviedb.org/3/movie/${itemId}?api_key=${window.CONFIG.TMDB_API_KEY}`
        : `https://api.themoviedb.org/3/tv/${itemId}?api_key=${window.CONFIG.TMDB_API_KEY}`;

    $.getJSON(tmdbUrl).done(function(data) {
        const title = type === "movie" ? data.title : data.name;
        const date = type === "movie" ? data.release_date : data.first_air_date;
        const year = date ? date.split("-")[0] : "N/A";
        const image = data.poster_path ? window.CONFIG.TMDB_IMAGE_BASE + data.poster_path : window.CONFIG.TMDB_POSTER_PLACEHOLDER;
        const backdrop = data.backdrop_path ? window.CONFIG.TMDB_IMAGE_BASE + data.backdrop_path : image;

        $("#title").text(title);
        $("#overview").text(data.overview);
        $("#metaInfo").text(`${year} • ${type === 'movie' ? 'Movie' : 'TV Show'}`);
        $("#poster").attr("src", image);
        $("#heroImage").attr("src", backdrop);
        
        // 2. Fetch AI Status from Backend
        fetchAIStatus(title, type === "tv");
    });
});

function fetchAIStatus(showName, isTV) {
    $.ajax({
        url: window.CONFIG.API_BASE_URL + "/api/show-status",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ showName: showName, isTV: isTV }),
        success: function(response) {
            renderAI(response);
        },
        error: function() {
            $("#aiContent").html('<div style="color:var(--badge-red)">Backend is asleep or offline.</div>');
        }
    });
}

function renderAI(data) {
    // Render Badge
    const status = data.status || "Unknown";
    let badgeClass = "unknown";
    if (/renewed|confirmed|filming/.test(status.toLowerCase())) badgeClass = "confirmed";
    if (/cancelled|ended/.test(status.toLowerCase())) badgeClass = "cancelled";

    $("#badgeContainer").html(`<span class="status-badge ${badgeClass}">${status}</span>`);

    // Render Summary
    let html = `<div class="ai-text">${data.summary}</div>`;
    
    // Render Sources
    if (data.sources && data.sources.length) {
        html += `<div class="ai-sources">Sources: `;
        data.sources.forEach((s, i) => html += `<a href="${s.url}" target="_blank">[${i+1}]</a>`);
        html += `</div>`;
    }

    $("#aiContent").hide().html(html).fadeIn();
}