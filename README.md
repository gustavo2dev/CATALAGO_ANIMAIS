# NatureLab

NatureLab é um sistema completo, offline-first, built with HTML5, CSS3, ES6 Modules e LocalStorage para catalogação, consulta e backup de registros de fauna em campo.

## Descrição

O projeto foi pensado para pesquisadores, fotógrafos e observadores da natureza que precisam registrar animais em campo sem depender de servidores, banco de dados ou conexão de internet. O sistema funciona inteiramente em cliente, persistindo dados localmente com LocalStorage, exportando backups em JSON e permitindo futura expansão.

## Instalação

1. Clone este repositório.
2. Abra o arquivo `index.html` em um navegador moderno.
3. Para publicar em GitHub Pages, use a opção de deploy estático do repositório.

## Estrutura

- `index.html` — entrada principal
- `pages/` — telas de dashboard, cadastro, espécies, backup, configurações e estatísticas
- `css/` — design system e responsividade
- `js/` — módulos de app, registro, storage, dashboard, estatísticas e backup
- `classes/` — classes de domínio para Animal, Registro, Storage e Backup

## Como usar

- Acesse a página inicial para ver resumo e registros recentes.
- Use `Novo Registro` para cadastrar um animal.
- Explore espécies, estatísticas e backup.
- Configure tema e preferências em Configurações.

## Backup

Use a tela de backup para exportar `backup.json` contendo registros, configurações e imagens em formato serializável.

## Importação

Na página de backup, escolha um arquivo `.json` gerado previamente para restaurar completamente o estado do sistema.

## Publicação no GitHub Pages

1. Crie um repositório no GitHub.
2. Faça push dos arquivos.
3. Ative o GitHub Pages no branch `main` ou `gh-pages`.
4. Use a raiz do repositório como pasta pública.

## Roadmap

- Detecção visual com IA
- Mapa interativo com Leaflet
- Captura de sensores portáteis
- PWA e instalação como app

## Licença

MIT
