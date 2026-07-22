import { storage } from "./storage.js";
import { groupBy } from "./utils.js";

const records = storage.listRecords();

const buildChart = (canvasId, key, label, type = "bar") => {
  const canvas = document.querySelector(`#${canvasId}`);
  if (!canvas) return;

  const grouped = groupBy(records, key);
  new Chart(canvas, {
    type,
    data: {
      labels: Object.keys(grouped),
      datasets: [
        { label, data: Object.values(grouped), backgroundColor: "#55b891" },
      ],
    },
    options: { responsive: true },
  });
};

window.addEventListener("DOMContentLoaded", () => {
  buildChart("chart-grupo", "grupoBiologico", "Grupo");
  buildChart("chart-familia", "familia", "Família");
  buildChart("chart-classe", "classe", "Classe");
  buildChart("chart-habitat", "habitat", "Habitat");
  buildChart("chart-estado", "estado", "Estado");
  buildChart("chart-clima", "clima", "Clima");
});
