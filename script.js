document.addEventListener("DOMContentLoaded", () => {
    // 1. Existing Theme Toggle Logic
    const toggleSwitch = document.querySelector("#darkModeToggle");
    const toggleLabel = document.querySelector(".toggle-label-text");
    const body = document.body;
  
    if (toggleSwitch) {
        function applyMode(isDark) {
            if (isDark) {
                body.classList.add("dark-mode");
                toggleLabel.textContent = "Light mode";
                localStorage.setItem("dark-mode", "true");
            } else {
                body.classList.remove("dark-mode");
                toggleLabel.textContent = "Dark mode";
                localStorage.setItem("dark-mode", "false");
            }
        }
    
        const isDarkMode = localStorage.getItem("dark-mode") === "true";
        toggleSwitch.checked = isDarkMode;
        applyMode(isDarkMode); // Apply on load
    
        toggleSwitch.addEventListener("change", () => {
            applyMode(toggleSwitch.checked);
        });
    }

    // 2. NEW: iOS Detection & Banner Push
    detectAndPushApp();
});

function detectAndPushApp() {
    // Check if user Agent contains iPhone/iPad/iPod
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    // Only show if on iOS and we haven't dismissed it (optional)
    if (isIOS) {
        const bannerHTML = `
            <div class="ios-promo-banner" id="iosBanner">
                <div class="ios-banner-content">
                    <div class="ios-app-icon">K</div>
                    <div class="ios-info">
                        <h4>KeepUp</h4>
                        <p>Track shows on the go</p>
                    </div>
                </div>
                <button class="ios-action-btn" onclick="openAppUrl()">GET</button>
            </div>
        `;
        
        // Inject into body
        document.body.insertAdjacentHTML('beforeend', bannerHTML);
        
        // Slide it up
        setTimeout(() => {
            const banner = document.getElementById("iosBanner");
            if(banner) banner.style.display = "flex";
        }, 1000);
    }
}

function openAppUrl() {
    // Since you are using AltStore, you don't have an App Store URL yet.
    // For now, we can redirect to a "How to Install" page, or just alert.
    alert("KeepUp is currently in Beta. Install via AltStore!");
    
    // Future: Once published, replace with:
    // window.location.href = "https://apps.apple.com/app/idYOUR_ID";
}
