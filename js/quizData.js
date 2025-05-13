const question01 = [
    { name: "Alternativa 01", example: "(Exemplo 01)", score: 5 },
    { name: "Alternativa 02", example: "(Exemplo 02)", score: 4 },
    { name: "Alternativa 03", example: "(Exemplo 03)", score: 3 },
    { name: "Alternativa 04", example: "(Exemplo 04)", score: 2 },
    { name: "Alternativa 05", example: "(Exemplo 05)", score: 1 },
    { name: "Alternativa 06", example: "(Exemplo 06)", score: 0 }
];

const question02 = [
    { name: "Alternativa 01", example: "(Exemplo 01)", score: 5 },
    { name: "Alternativa 02", example: "(Exemplo 02)", score: 4 },
    { name: "Alternativa 03", example: "(Exemplo 03)", score: 3 },
    { name: "Alternativa 04", example: "(Exemplo 04)", score: 2 },
    { name: "Alternativa 05", example: "(Exemplo 05)", score: 1 },
    { name: "Alternativa 06", example: "(Exemplo 06)", score: 0 }
];

const questions = [
    { title: "Pergunta 1", id: "question01", options: question01, type: "multipla" },
    { title: "Pergunta 2", id: "question02", options: question02, type: "unica", dependsOn: "question01" },
];