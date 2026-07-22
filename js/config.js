import { storage } from "./storage.js";

const themeSelect = document.querySelector("#theme-select");
const languageSelect = document.querySelector("#language-select");
const autoBackup = document.querySelector("#auto-backup");
const autoSave = document.querySelector("#auto-save");
const clearDataButton = document.querySelector("#btn-clear-data");

const applySettings = () => {
  const snapshot = storage.read();
  const settings = snapshot.settings || {};
  themeSelect.value = settings.theme || "light";
  languageSelect.value = settings.language || "pt-BR";
  autoBackup.checked = !!settings.autoBackup;
  autoSave.checked = settings.autoSave !== false;
};

const saveSettings = () => {
  storage.updateSettings({
    theme: themeSelect.value,
    language: languageSelect.value,
    autoBackup: autoBackup.checked,
    autoSave: autoSave.checked,
  });
  document.body.dataset.theme = themeSelect.value;
};

themeSelect?.addEventListener("change", saveSettings);
languageSelect?.addEventListener("change", saveSettings);
autoBackup?.addEventListener("change", saveSettings);
autoSave?.addEventListener("change", saveSettings);
clearDataButton?.addEventListener("click", () => {
  storage.clear();
  location.reload();
});

window.addEventListener("DOMContentLoaded", applySettings);
