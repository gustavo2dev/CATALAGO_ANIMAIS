export class Storage {
  constructor(storageKey = "naturelab") {
    this.storageKey = storageKey;
  }

  read() {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) {
      return { records: [], settings: this.defaultSettings() };
    }

    try {
      return JSON.parse(raw);
    } catch (error) {
      console.warn("Falha ao ler storage:", error);
      return { records: [], settings: this.defaultSettings() };
    }
  }

  write(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  defaultSettings() {
    return {
      theme: "light",
      language: "pt-BR",
      autoBackup: false,
      autoSave: true,
      lastBackupAt: null,
      imageStorage: "indexeddb",
    };
  }

  saveRecord(record) {
    const snapshot = this.read();
    snapshot.records = snapshot.records || [];
    const index = snapshot.records.findIndex((item) => item.id === record.id);
    if (index >= 0) {
      snapshot.records[index] = record;
    } else {
      snapshot.records.push(record);
    }
    this.write(snapshot);
  }

  deleteRecord(id) {
    const snapshot = this.read();
    snapshot.records = (snapshot.records || []).filter(
      (item) => item.id !== id,
    );
    this.write(snapshot);
  }

  listRecords() {
    return this.read().records || [];
  }

  updateSettings(settings) {
    const snapshot = this.read();
    snapshot.settings = { ...snapshot.settings, ...settings };
    this.write(snapshot);
  }

  clear() {
    localStorage.removeItem(this.storageKey);
  }
}
