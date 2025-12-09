<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Details</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
</head>
<body class="dark-mode">
    <div class="app-shell">
        <header class="navbar">
            <div class="nav-left">
                <a href="index.html" class="logo-pill">
                    <span class="logo-dot"></span>
                    <div>
                        <div class="logo-text-main">KeepUp</div>
                        <div class="logo-text-sub">Tracker</div>
                    </div>
                </a>
                <nav class="nav-links">
                    <a href="index.html">Search</a>
                    <a href="popular.html">Popular</a>
                </nav>
            </div>
        </header>

        <main>
            <section class="detail-layout">
                <div class="detail-poster">
                    <img id="poster" src="" alt="Poster">
                </div>

                <article class="detail-info">
                    <span id="tagline" class="tagline"></span>
                    <h1 id="title">Loading...</h1>
                    
                    <div style="margin-bottom:20px; color:var(--text-muted); font-size:14px;">
                        <span id="releaseDate"></span> • <span id="rating"></span>
                    </div>

                    <p id="overview" class="overview-text"></p>

                    <div id="aiStatus" class="ai-output" style="display: none;">
                        <h3>Show Status (AI)</h3>
                        <div id="aiOutputSection" class="ai-output-content">
                            Loading intelligence...
                        </div>
                    </div>
                </article>
            </section>
        </main>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="config.js"></script>
    <script src="script.js"></script>
    <script src="detail.js"></script>
</body>
</html>
