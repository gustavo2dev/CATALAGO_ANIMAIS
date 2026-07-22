export class Animal {
  constructor(payload = {}) {
    this.id =
      payload.id ||
      crypto.randomUUID?.() ||
      `animal-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
    this.nomePopular = payload.nomePopular || "";
    this.nomeCientifico = payload.nomeCientifico || "";
    this.reino = payload.reino || "";
    this.filo = payload.filo || "";
    this.classe = payload.classe || "";
    this.ordem = payload.ordem || "";
    this.familia = payload.familia || "";
    this.genero = payload.genero || "";
    this.especie = payload.especie || "";
    this.subespecie = payload.subespecie || "";
    this.grupoBiologico = payload.grupoBiologico || "Outro";
    this.quantidadeObservada = Number(payload.quantidadeObservada || 1);
    this.sexo = payload.sexo || "";
    this.idade = payload.idade || "";
    this.estadoDesenvolvimento = payload.estadoDesenvolvimento || "";
    this.corPredominante = payload.corPredominante || "";
    this.comprimento = payload.comprimento || "";
    this.pesoEstimado = payload.pesoEstimado || "";
    this.envergadura = payload.envergadura || "";
    this.comportamentoObservado = payload.comportamentoObservado || "";
    this.atividade = payload.atividade || "Outro";
    this.habitat = payload.habitat || "Outro";
    this.microHabitat = payload.microHabitat || "Outro";
    this.temperatura = payload.temperatura || "";
    this.umidade = payload.umidade || "";
    this.clima = payload.clima || "";
    this.pressaoAtmosferica = payload.pressaoAtmosferica || "";
    this.velocidadeVento = payload.velocidadeVento || "";
    this.condicaoCeu = payload.condicaoCeu || "";
    this.altitude = payload.altitude || "";
    this.latitude = payload.latitude || "";
    this.longitude = payload.longitude || "";
    this.cidade = payload.cidade || "";
    this.estado = payload.estado || "";
    this.pais = payload.pais || "";
    this.descricaoDetalhada = payload.descricaoDetalhada || "";
    this.observacoes = payload.observacoes || "";
    this.tags = Array.isArray(payload.tags)
      ? payload.tags
      : this.extractTags(payload);
    this.imagens = Array.isArray(payload.imagens) ? payload.imagens : [];
    this.data = payload.data || new Date().toISOString().slice(0, 10);
    this.hora = payload.hora || new Date().toTimeString().slice(0, 5);
    this.createdAt = payload.createdAt || new Date().toISOString();
  }

  extractTags(payload) {
    return [
      payload.nomePopular,
      payload.nomeCientifico,
      payload.grupoBiologico,
      payload.habitat,
      payload.cidade,
      payload.estado,
      payload.clima,
      payload.comportamentoObservado,
    ]
      .filter(Boolean)
      .map((value) => String(value).trim());
  }
}
