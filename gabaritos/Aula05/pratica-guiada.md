# Gabarito e Notas para o Professor: Prática Guiada (Aula 05)

## Objetivo da Prática

O objetivo principal desta prática guiada é demonstrar visualmente a evolução dos padrões de código assíncrono em Node.js. Os alunos devem ser capazes de identificar as diferenças de sintaxe e os benefícios de usar Promises e `async/await` em detrimento de callbacks.

## Pontos-chave para Enfatizar

### 1. Callback (`viacep-callback.js`)

- **Padrão de Erro Primeiro:** Reforce que o primeiro argumento do callback é, por convenção, o erro (`err`). Isso é crucial para o tratamento de falhas.
- **"Pyramid of Doom":** Mencione que, se precisássemos fazer outra chamada assíncrona com o resultado da primeira, começaríamos a aninhar callbacks, levando ao "Callback Hell". Você pode até esboçar um exemplo no quadro:
  ```javascript
  consultarCep("...", (err, res) => {
    if (err) {
      /* ... */
    }
    outraFuncaoAsync(res.localidade, (err2, res2) => {
      if (err2) {
        /* ... */
      }
      // E assim por diante...
    });
  });
  ```
- **Dependências:** Aponte que este exemplo usa o pacote `request`, que está obsoleto (`deprecated`). Isso serve como um gancho para explicar que a própria comunidade e as ferramentas evoluíram junto com a linguagem.

### 2. Promise (`viacep-promise.js`)

- **Retorno da Função:** A grande mudança é que a função agora _retorna_ um valor: um objeto `Promise`. Este objeto representa a conclusão (ou falha) futura da operação.
- **Encadeamento (`.then()`):** Mostre como o `.then()` permite um fluxo de código mais linear. O resultado de uma `Promise` é passado para o próximo `.then()`.
- **Tratamento de Erro Centralizado (`.catch()`):** Uma grande vantagem é que um único `.catch()` no final da cadeia pode capturar qualquer erro que ocorra em qualquer um dos `.then()` anteriores. Isso simplifica muito o tratamento de erros.
- **Dependências:** O `axios` é o padrão moderno para requisições HTTP e é baseado em Promises. É uma excelente recomendação para os projetos dos alunos.

### 3. Async/Await (`viacep-async-await.js`)

- **"Açúcar Sintático":** Deixe claro que `async/await` não é uma nova forma de fazer assincronia, mas sim uma maneira mais fácil de _escrever_ e _ler_ código baseado em Promises. Por baixo dos panos, o motor do JavaScript ainda está usando Promises.
- **Fluxo Síncrono:** O maior benefício é a legibilidade. O código se parece com um script síncrono, executando linha por linha. A palavra `await` "pausa" a função e espera a Promise ser resolvida.
- **Tratamento de Erro com `try...catch`:** Esta é uma das maiores vitórias para a legibilidade. Os desenvolvedores já estão familiarizados com `try...catch` de outras linguagens e contextos, tornando o tratamento de erros muito mais intuitivo.
- **Função `async`:** Lembre-os de que o `await` só pode ser usado dentro de uma função declarada com `async`.

## Atividade Bônus (Se houver tempo)

Peça aos alunos para modificarem o exemplo `async/await` para consultar dois CEPs em sequência e depois em paralelo, e discutir a diferença.

**Em sequência:**

```javascript
async function main() {
  try {
    console.log("Buscando CEP 1...");
    const endereco1 = await consultarCep("01001000");
    console.log(endereco1.logradouro);

    console.log("Buscando CEP 2...");
    const endereco2 = await consultarCep("30130010");
    console.log(endereco2.logradouro);
  } catch (err) {
    /* ... */
  }
}
```

**Em paralelo (usando `Promise.all`):**

```javascript
async function main() {
  try {
    console.log("Buscando CEPs em paralelo...");
    const promises = [consultarCep("01001000"), consultarCep("30130010")];

    const [endereco1, endereco2] = await Promise.all(promises);

    console.log("Endereços encontrados:");
    console.log(endereco1.logradouro);
    console.log(endereco2.logradouro);
  } catch (err) {
    /* ... */
  }
}
```

Isso introduz o `Promise.all`, uma ferramenta poderosa para otimizar operações assíncronas independentes.
