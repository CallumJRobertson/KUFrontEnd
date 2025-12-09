// script.js - theme toggle + small shared utilities

document.addEventListener("DOMContentLoaded", () => {
    const toggleSwitch = document.querySelector("#darkModeToggle");
    const toggleLabel = document.querySelector('label[for="darkModeToggleLabel"]');
    const body = document.body;
  
    if (!toggleSwitch || !toggleLabel) {
      return;
    }
  
    function applyMode(isDark) {
      if (isDark) {
        body.classList.add("dark-mode");
        body.classList.remove("light-mode");
        toggleLabel.textContent = "Light mode";
        localStorage.setItem("dark-mode", "true");
      } else {
        body.classList.add("light-mode");
        body.classList.remove("dark-mode");
        toggleLabel.textContent = "Dark mode";
        localStorage.setItem("dark-mode", "false");
      }
    }
  
    const isDarkMode = localStorage.getItem("dark-mode") === "true";
    toggleSwitch.checked = isDarkMode;
    applyMode(isDarkMode);
  
    toggleSwitch.addEventListener("change", () => {
      applyMode(toggleSwitch.checked);
    });
  });
  
  // Simple helper for query params
  function getQueryParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }
  
  // Simple localStorage wrapper for tracked items
  const TRACKED_KEY = "keepup-tracked-items";
  
  function getTrackedItems() {
    try {
      const raw = localStorage.getItem(TRACKED_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Error reading tracked items", e);
      return [];
    }
  }
  
  function saveTrackedItems(items) {
    localStorage.setItem(TRACKED_KEY, JSON.stringify(items));
  }
  
  function isTracked(id, type) {
    return getTrackedItems().some(
      (item) => item.id === id && item.type === type
    );
  }
  
  function toggleTracked(item) {
    const items = getTrackedItems();
    const index = items.findIndex(
      (i) => i.id === item.id && i.type === item.type
    );
    if (index >= 0) {
      items.splice(index, 1);
    } else {
      items.push(item);
    }
    saveTrackedItems(items);
    return items;
  }
  