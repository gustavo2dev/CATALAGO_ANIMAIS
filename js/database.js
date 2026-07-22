// Camada auxiliar para futura evolução com IndexedDB e armazenamento de mídia.
export const database = {
  ready: false,
  async init() {
    if (!("indexedDB" in window)) {
      console.warn("IndexedDB não está disponível neste navegador.");
      return;
    }

    this.ready = true;
    return true;
  },

  async saveImage(image) {
    if (!this.ready) {
      await this.init();
    }

    return image;
  },
};
