import { storage } from "./storage.js";
import { formatDateTime, groupBy } from "./utils.js";

const records = storage.listRecords();

const renderMetrics = () => {
  const metrics = document.querySelector("#dashboard-metrics");
  if (!metrics) return;

  const species = new Set(
    records.map((item) => item.nomeCientifico || item.nomePopular),
  ).size;
  const last = records
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.data) - new Date(a.createdAt || a.data),
    )[0];
  const byGroup = groupBy(records, "grupoBiologico");
  const speciesMostCommon = Object.entries(byGroup).sort(
    (a, b) => b[1] - a[1],
  )[0];

  metrics.innerHTML = `
    <article class="stat-card"><strong>${records.length}</strong><span>Registros</span></article>
    <article class="stat-card"><strong>${species}</strong><span>Espécies</span></article>
    <article class="stat-card"><strong>${speciesMostCommon ? speciesMostCommon[0] : "—"}</strong><span>Mais registrada</span></article>
    <article class="stat-card"><strong>${last ? formatDateTime(last) : "—"}</strong><span>Último registro</span></article>
  `;
};

const renderChart = (canvasId, dataKey, label) => {
  const canvas = document.querySelector(`#${canvasId}`);
  if (!canvas) return;
  const grouped = groupBy(records, dataKey);
  new Chart(canvas, {
    type: "bar",
    data: {
      labels: Object.keys(grouped),
      datasets: [
        { label, data: Object.values(grouped), backgroundColor: "#5b8def" },
      ],
    },
    options: { responsive: true, plugins: { legend: { display: false } } },
  });
};

const renderMonthlyChart = () => {
  const canvas = document.querySelector("#monthChart");
  if (!canvas) return;

  const grouped = records.reduce((acc, item) => {
    const month = new Date(item.data || item.createdAt).toLocaleString(
      "pt-BR",
      {
        month: "long",
      },
    );
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  new Chart(canvas, {
    type: "line",
    data: {
      labels: Object.keys(grouped),
      datasets: [
        {
          label: "Quantidade por mês",
          data: Object.values(grouped),
          borderColor: "#5b8def",
          backgroundColor: "rgba(91, 141, 239, 0.25)",
        },
      ],
    },
    options: { responsive: true },
  });
};

const renderLastRecord = () => {
  const target = document.querySelector("#last-record");
  if (!target) return;
  const last = records
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt || b.data) - new Date(a.createdAt || a.data),
    )[0];
  if (!last) {
    target.textContent = "Nenhum registro encontrado.";
    return;
  }

  target.innerHTML = `<p><strong>${last.nomePopular || last.nomeCientifico}</strong></p><p>${last.cidade} · ${last.estado}</p><p>${formatDateTime(last)}</p>`;
};

window.addEventListener("DOMContentLoaded", () => {
  renderMetrics();
  renderChart("groupChart", "grupoBiologico", "Quantidade por grupo");
  renderMonthlyChart();
  renderChart("climaChart", "clima", "Quantidade por clima");
  renderLastRecord();
});
