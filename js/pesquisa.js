import { storage } from "./storage.js";
import { escapeHtml, formatDateTime } from "./utils.js";

const records = storage.listRecords();

const renderSpecies = (query = "") => {
  const list = document.querySelector("#species-list");
  if (!list) return;

  const filtered = records.filter((record) => {
    const haystack = [
      record.nomePopular,
      record.nomeCientifico,
      record.grupoBiologico,
      record.familia,
      record.cidade,
      record.estado,
      record.habitat,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(query.toLowerCase());
  });

  list.innerHTML = filtered
    .map(
      (record) => `
    <a href="detalhes.html?id=${record.id}" class="species-card card">
      <h3>${escapeHtml(record.nomePopular || "—")}</h3>
      <p>${escapeHtml(record.nomeCientifico || "—")}</p>
      <small>${escapeHtml(record.grupoBiologico || "Outro")}</small>
      <span>${formatDateTime(record)}</span>
    </a>
  `,
    )
    .join("");
};

const renderDetails = () => {
  const container = document.querySelector("#species-details");
  const params = new URLSearchParams(window.location.search);
  const selected = records.find((item) => item.id === params.get("id"));
  if (!container || !selected) return;

  container.innerHTML = `
    <h2>${escapeHtml(selected.nomePopular || selected.nomeCientifico)}</h2>
    <p>${escapeHtml(selected.nomeCientifico || "")}</p>
    <p><strong>Local:</strong> ${escapeHtml(selected.cidade || "")} / ${escapeHtml(selected.estado || "")}</p>
    <p><strong>Habitat:</strong> ${escapeHtml(selected.habitat || "")}</p>
    <p><strong>Comportamento:</strong> ${escapeHtml(selected.atividade || "")}</p>
    <p><strong>Data:</strong> ${formatDateTime(selected)}</p>
  `;
};

window.addEventListener("DOMContentLoaded", () => {
  renderSpecies();
  renderDetails();

  const searchInput = document.querySelector("#species-search");
  searchInput?.addEventListener("input", (event) =>
    renderSpecies(event.target.value),
  );
});
