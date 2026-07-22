import { storage } from "./storage.js";
import { formatDateTime, groupBy, escapeHtml } from "./utils.js";

const applyTheme = () => {
  const settings = storage.read().settings || {};
  document.body.dataset.theme = settings.theme || "light";
};

const renderHomeSummary = () => {
  const records = storage.listRecords();
  const species = new Set(
    records.map((item) => item.nomeCientifico || item.nomePopular),
  ).size;
  const photos = records.reduce(
    (acc, item) => acc + (item.imagens?.length || 0),
    0,
  );
  const last = records
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.data) - new Date(a.createdAt || a.data),
    )[0];
  const summary = document.querySelector("#summary-stats");
  if (!summary) return;

  summary.innerHTML = `
    <article class="stat-card"><strong>${records.length}</strong><span>Registros</span></article>
    <article class="stat-card"><strong>${species}</strong><span>Espécies</span></article>
    <article class="stat-card"><strong>${photos}</strong><span>Fotos</span></article>
    <article class="stat-card"><strong>${last ? formatDateTime(last) : "—"}</strong><span>Última observação</span></article>
  `;
};

const renderRecentRecords = () => {
  const records = storage
    .listRecords()
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.data) - new Date(a.createdAt || a.data),
    )
    .slice(0, 6);
  const target = document.querySelector("#recent-records");
  if (!target) return;

  target.innerHTML = records
    .map(
      (record) => `
    <article class="record-row">
      <div>
        <strong>${escapeHtml(record.nomePopular || record.nomeCientifico || "Registro")}</strong>
        <small>${escapeHtml(record.cidade || "")} · ${escapeHtml(record.estado || "")}</small>
      </div>
      <span>${formatDateTime(record)}</span>
    </article>
  `,
    )
    .join("");
};

const init = () => {
  applyTheme();
  renderHomeSummary();
  renderRecentRecords();
};

window.addEventListener("DOMContentLoaded", init);
