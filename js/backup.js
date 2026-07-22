import { exportBackup, importBackup } from "./storage.js";
import { downloadFile } from "./utils.js";

const exportButton = document.querySelector("#export-backup");
const importInput = document.querySelector("#import-backup");
const status = document.querySelector("#backup-status");

exportButton?.addEventListener("click", () => {
  const payload = exportBackup();
  downloadFile("backup.json", payload, "application/json");
  if (status) {
    status.textContent = "Backup exportado com sucesso.";
  }
});

importInput?.addEventListener("change", async (event) => {
  const [file] = event.target.files;
  if (!file) return;
  const text = await file.text();
  const result = importBackup(text);
  if (status) {
    status.textContent = `Importação concluída com ${result.records.length} registros.`;
  }
});
