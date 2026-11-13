# Bolso Jovem

Site de educação e controle financeiro para jovens, em HTML, CSS e JavaScript puro. É uma página única: o menu troca o conteúdo sem recarregar. Os dados ficam salvos no navegador com `localStorage`.

## Como abrir

Abra o `index.html` no navegador (ou use o Live Server do VS Code).

## Estrutura

```
Bolsa-Jovem/
├── index.html            → estrutura da página
├── assets/
│   ├── css/style.css     → visual (tema escuro e claro, dourado)
│   └── js/script.js      → telas, CRUDs e configurações
└── versao-antiga/        → versão anterior (azul, várias páginas)
```

## CRUDs

| | Movimentações | Metas |
|---|---|---|
| Create | `newMove(t)`, botão "Nova movimentação" | `newGoal()`, botão "Nova meta" |
| Read | `V.movimentacoes()`, com filtros de período, tipo e categoria | `V.metas()` |
| Update | lápis em cada linha, que chama `newMove(t, m)` | lápis em cada meta, que chama `newGoal(g)`, e o botão "Guardar" |
| Delete | lixeira, que pede confirmação | lixeira, que pede confirmação |

Os cards e os relatórios contam só as movimentações do mês atual.
