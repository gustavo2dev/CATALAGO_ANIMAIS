import { Registro } from "../classes/Registro.js";
import { saveRecord, loadRecords } from "./storage.js";
import { createId } from "./utils.js";

const form = document.querySelector("#animal-form");
const preview = document.querySelector("#image-preview");
const upload = document.querySelector("#image-upload");
let selectedImages = [];

const readFilesAsDataUrl = async (files) => {
  const promises = [...files].map(
    (file) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () =>
          resolve({ name: file.name, src: reader.result, type: file.type });
        reader.readAsDataURL(file);
      }),
  );

  return Promise.all(promises);
};

const renderPreview = () => {
  preview.innerHTML = selectedImages
    .map((img) => `<img src="${img.src}" alt="${img.name}" class="thumb" />`)
    .join("");
};

upload?.addEventListener("change", async (event) => {
  selectedImages = await readFilesAsDataUrl(event.target.files);
  renderPreview();
});

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  data.id = createId();
  data.imagens = selectedImages;
  data.createdAt = new Date().toISOString();

  const record = new Registro(data);
  saveRecord(record.toJSON());
  form.reset();
  selectedImages = [];
  renderPreview();
  alert("Registro salvo com sucesso!");
});

const seededRecords = loadRecords();
if (!seededRecords.length) {
  saveRecord(
    new Registro({
      id: createId(),
      nomePopular: "Pica-pau-do-cerrado",
      nomeCientifico: "Melanerpes candidus",
      cidade: "São Paulo",
      estado: "SP",
      habitat: "Floresta",
      clima: "Ensolarado",
      data: new Date().toISOString().slice(0, 10),
      hora: "08:30",
      createdAt: new Date().toISOString(),
    }).toJSON(),
  );
}
