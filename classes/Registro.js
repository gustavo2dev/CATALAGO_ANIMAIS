import { Animal } from "./Animal.js";

export class Registro extends Animal {
  constructor(payload = {}) {
    super(payload);
    this.codigo = payload.codigo || this.id;
    this.ultimaEdicao = payload.ultimaEdicao || new Date().toISOString();
  }

  toJSON() {
    return {
      ...this,
      __type: "Registro",
    };
  }
}
