// Módulo reservado para capturas de câmera, webcam e integrações futuras.
export const camera = {
  async getCameraStream() {
    if (!navigator.mediaDevices?.getUserMedia) {
      throw new Error("Acesso à câmera não suportado neste navegador.");
    }

    return navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  },
};
