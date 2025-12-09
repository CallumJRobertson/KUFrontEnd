$(document).ready(function() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const type = params.get("type");

    if (!id || !type) return;

    const apiKey = window.CONFIG.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`;

    $.getJSON(url).done(function(data) {
        const title = type === "movie" ? data.title : data.name;
        const date = type === "movie" ? data.release_date : data.first_air_date;
        const image = data.poster_path ? window.CONFIG.TMDB_IMAGE_BASE + data.poster_path : window.CONFIG.TMDB_POSTER_PLACEHOLDER;

        $("#title").text(title);
        $("#tagline").text(data.tagline || "");
        $("#overview").text(data.overview);
        $("#releaseDate").text(date ? date.split("-")[0] : "N/A");
        $("#rating").text(data.vote_average ? `⭐ ${data.vote_average.toFixed(1)}` : "");
        $("#poster").attr("src", image);

        // Call AI Backend
        fetchAI(title, type === "tv");
    });
});

function fetchAI(showName, isTV) {
    $("#aiStatus").show(); // Show the box
    
    $.ajax({
        url: window.CONFIG.API_BASE_URL + "/api/show-status",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ showName: showName, isTV: isTV }),
        success: function(res) {
            let html = `<strong>${res.status || "Unknown"}</strong><br>${res.summary}`;
            if (res.sources && res.sources.length) {
                html += `<div style="margin-top:10px; font-size:12px; color:#9ca3af;">Sources: `;
                res.sources.forEach((s, i) => html += `<a href="${s.url}" target="_blank" style="color:#6366f1; margin-right:5px;">[${i+1}]</a>`);
                html += `</div>`;
            }
            $("#aiOutputSection").html(html);
        },
        error: function() {
            $("#aiOutputSection").html(`<span style="color:#f87171;">Backend offline.</span>`);
        }
    });
}
