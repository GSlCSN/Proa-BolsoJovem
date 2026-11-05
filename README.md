# Bolso Jovem

Site de educação e controle financeiro para jovens, feito em HTML, CSS e JavaScript puro (Vanilla JS). Os dados ficam salvos no navegador com `localStorage`.

## Como abrir

Abra o `index.html` no navegador (ou use o Live Server do VS Code). Ele leva para a tela de login.

## Estrutura de pastas

```
Bolsa-Jovem/
├── index.html                 → porta de entrada (redireciona para o login)
├── pages/                     → as telas do site
│   ├── login.html
│   ├── inicio.html
│   ├── metas.html
│   ├── relatorios.html
│   ├── movimentacoes.html     → CRUD de movimentações
│   ├── investimentos.html
│   ├── educacao.html
│   └── configuracoes.html
└── assets/
    ├── css/
    │   └── style.css          → estilos de todas as telas
    └── js/
        ├── config.js          → tema, tamanho do texto e nome do usuário (todas as páginas)
        ├── dados.js           → funções compartilhadas: localStorage, moeda, resumo
        └── pages/             → um script para cada tela
            ├── login.js
            ├── inicio.js
            ├── relatorios.js
            ├── movimentacoes.js
            └── configuracoes.js
```

## CRUD de Movimentações

| Operação | Onde está em `movimentacoes.js` |
|---|---|
| Create (criar) | envio do formulário, quando `idEmEdicao === null` |
| Read (listar)  | função `renderizar()` |
| Update (editar) | botão de lápis + envio do formulário com `idEmEdicao` |
| Delete (excluir) | botão de lixeira, com `filter` |
