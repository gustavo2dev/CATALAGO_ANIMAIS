import { Storage } from "../classes/Storage.js";

export const storage = new Storage("naturelab");

export const loadRecords = () => storage.listRecords();

export const saveRecord = (record) => {
  storage.saveRecord(record);
};

export const importBackup = (jsonText) => {
  const parsed = JSON.parse(jsonText);
  const records = Array.isArray(parsed.records) ? parsed.records : [];
  const settings = parsed.settings || {};
  storage.write({ records, settings });
  return { records, settings };
};

export const exportBackup = () => {
  const snapshot = storage.read();
  return JSON.stringify(
    {
      version: "1.0.0",
      exportedAt: new Date().toISOString(),
      records: snapshot.records || [],
      settings: snapshot.settings || {},
      imagens: [],
    },
    null,
    2,
  );
};
