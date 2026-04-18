# Gabarito - Aula 02

## Objetivo

O objetivo era que o aluno aprendesse a inicializar um projeto com NPM, criar e usar módulos locais (CommonJS) e instalar e usar uma dependência externa.

## Checklist de Verificação

- [ ] O aluno criou a pasta `Aula02` e a subpasta `src`?
- [ ] O comando `npm init -y` foi executado com sucesso, criando o `package.json`?
- [ ] O módulo `operacoes.js` foi criado com as funções `somar` e `subtrair` e as exportou usando `module.exports`?
- [ ] O arquivo `index.js` importou (`require`) e usou o módulo `operacoes.js` corretamente?
- [ ] O pacote `date-fns` foi instalado via `npm install`?
- [ ] O `package.json` do aluno lista `date-fns` como uma dependência?
- [ ] O arquivo `index.js` foi atualizado para importar e usar a função `format` do `date-fns`?
- [ ] A execução final de `node src/index.js` exibiu os resultados das operações e a data formatada?

## Solução do Laboratório

A estrutura final de pastas e arquivos dentro de `Aula02` deve ser:

```
Aula02/
├── node_modules/
├── src/
│   ├── index.js
│   └── operacoes.js
├── package-lock.json
└── package.json
```

### `package.json` (Exemplo)

```json
{
  "name": "aula02",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "date-fns": "^3.6.0"
  }
}
```

### `src/operacoes.js`

```javascript
function somar(a, b) {
  return a + b;
}

function subtrair(a, b) {
  return a - b;
}

module.exports = {
  somar,
  subtrair,
};
```

### `src/index.js`

```javascript
const operacoes = require("./operacoes.js");
const { format } = require("date-fns");

const resultadoSoma = operacoes.somar(10, 5);
const resultadoSubtracao = operacoes.subtrair(10, 5);

console.log("Resultado da soma:", resultadoSoma);
console.log("Resultado da subtração:", resultadoSubtracao);

const dataAtualFormatada = format(new Date(), "dd/MM/yyyy HH:mm:ss");
console.log("Data atual:", dataAtualFormatada);
```

## Pontos Comuns de Dificuldade

- **Caminhos de `require`**: Erros ao importar módulos locais (ex: `require('operacoes.js')` em vez de `require('./operacoes.js')`). Reforce que `./` é necessário para caminhos relativos.
- **`module.exports` vs `exports`**: O aluno pode se confundir. Explique que `module.exports` é a forma mais segura e direta de exportar.
- **Esquecer de instalar pacotes**: Tentar usar `require('date-fns')` sem antes rodar `npm install date-fns` resultará em um erro `Cannot find module`.
