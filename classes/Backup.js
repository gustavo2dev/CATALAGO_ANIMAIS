export class Backup {
  constructor(records = [], settings = {}, imagens = []) {
    this.version = "1.0.0";
    this.exportedAt = new Date().toISOString();
    this.records = records;
    this.settings = settings;
    this.imagens = imagens;
  }

  toJSON() {
    return {
      version: this.version,
      exportedAt: this.exportedAt,
      records: this.records,
      settings: this.settings,
      imagens: this.imagens,
    };
  }
}
