# Gabarito e Notas para o Professor: Desafio Batalha Sync vs. Async

## Objetivo deste Gabarito

Este material serve como um guia para o professor avaliar o desafio, contendo:

1.  Respostas esperadas para as perguntas conceituais, ajudando a guiar a discussão.
2.  Uma rubrica de correção rápida para avaliação objetiva.
3.  Um exemplo de implementação mínima para cada tarefa solicitada.
4.  Uma lista de erros comuns que os alunos podem cometer, para facilitar a identificação de dificuldades.

---

## Respostas Esperadas (Discussão Conceitual)

### 1. O que é fluxo síncrono?

- **Resposta Esperada:** É um modelo de execução onde as tarefas são realizadas uma após a outra, em uma sequência estrita. A instrução seguinte só começa depois que a anterior foi completamente finalizada. No desafio, isso é visível quando todos os rounds da batalha são impressos no console quase que instantaneamente, sem pausas.

### 2. O que é fluxo assíncrono?

- **Resposta Esperada:** É um modelo que permite que operações demoradas (como esperar um tempo, consultar uma API, ler um arquivo) sejam iniciadas, e o programa pode continuar a executar outras tarefas enquanto espera o resultado. No Node.js, isso é gerenciado pelo _Event Loop_. No desafio, o `await esperar(ms)` demonstra isso ao pausar a função da batalha sem travar todo o programa, criando um ritmo visível entre os rounds.

### 3. Onde o `await` realmente pausa a execução?

- **Resposta Esperada:** O `await` só pausa a execução de sua função `async` quando está aguardando uma **Promise que ainda não foi resolvida**. Se o `await` for usado em um valor que não é uma Promise, ou em uma Promise que já foi resolvida, a execução continua quase que imediatamente. O exemplo chave no desafio é `await esperar(1500)`, que aguarda a Promise retornada pelo `setTimeout` ser resolvida.

---

## Rubrica de Avaliação Sugerida (0 a 10 pontos)

- **Execução Correta (2,0 pts):**
  - `star_wars_battle_sync.js` roda sem erros (1,0 pt).
  - `star_wars_battle_async.js` roda sem erros (1,0 pt).
- **Tarefa 1 - 5 Rounds (2,0 pts):**
  - Versão `sync` alterada para 5 rounds (1,0 pt).
  - Versão `async` alterada para 5 rounds (1,0 pt).
- **Tarefa 2 - Vencedor (2,0 pts):**
  - Acumula corretamente a pontuação para cada personagem (1,0 pt).
  - Imprime a mensagem correta de vencedor ou empate ao final (1,0 pt).
- **Tarefa 3 - Delay Configurável (2,0 pts):**
  - Existe uma constante no topo do arquivo `async` para o delay (1,0 pt).
  - O aluno descreve o impacto da mudança do delay na experiência (1,0 pt).
- **Tarefa 4 - Log de Tempo (1,0 pt):**
  - O timestamp é exibido no início de cada round na versão `async` e é coerente com o delay.
- **Reflexão Final (1,0 pt):**
  - O aluno entrega uma resposta clara e coerente comparando os dois modelos, usando o próprio desafio como exemplo.

---

## Exemplo Mínimo de Implementação (Referência)

Este trecho pode ser usado como referência para a correção da versão assíncrona. A versão síncrona segue uma lógica similar, mas sem as pausas e o `async/await`.

```javascript
// star_wars_battle_async.js

const DELAY_MS = 1000; // Tarefa 3
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Função para formatar a hora atual - útil para a Tarefa 4
function agora() {
  return new Date().toLocaleTimeString("pt-BR", { hour12: false });
}

async function iniciarBatalhaAsync(p1, p2) {
  console.log("Batalha Assíncrona Iniciada!");

  // Variáveis para a Tarefa 2
  let totalP1 = 0;
  let totalP2 = 0;

  // Loop para a Tarefa 1
  for (let i = 1; i <= 5; i++) {
    console.log(`\n[${agora()}] Round ${i} iniciado`); // Tarefa 4
    console.log("localizando alvos e preparando para o próximo round...");
    await esperar(DELAY_MS);

    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;

    const ataque1 = d1 + p1.poder;
    const ataque2 = d2 + p2.poder;

    // Acumulando pontos para a Tarefa 2
    totalP1 += ataque1;
    totalP2 += ataque2;

    console.log(`${p1.nome} disparou com poder de ${ataque1}`);
    console.log(`${p2.nome} disparou com poder de ${ataque2}`);
  }

  // Lógica da Tarefa 2
  console.log("\n--- FIM DA BATALHA ---");
  console.log(
    `Pontuação Final: ${p1.nome} (${totalP1}) vs ${p2.nome} (${totalP2})`,
  );
  if (totalP1 > totalP2) {
    console.log(`O vencedor é ${p1.nome}!`);
  } else if (totalP2 > totalP1) {
    console.log(`O vencedor é ${p2.nome}!`);
  } else {
    console.log("A batalha terminou em EMPATE!");
  }
}

const heroi = { nome: "Luke Skywalker", poder: 10 };
const viloa = { nome: "Darth Vader", poder: 12 };

iniciarBatalhaAsync(heroi, viloa);
```

---

## Erros Comuns a Observar

1.  **Confusão de Conceito:** O aluno marca uma função como `async` mas não usa nenhum `await` em uma Promise real, achando que isso a torna "assíncrona".
2.  **Escopo de Variáveis:** Esquecer de declarar as variáveis de pontuação (`totalP1`, `totalP2`) fora do loop, fazendo com que elas sejam resetadas a cada iteração.
3.  **Modificação Parcial:** Alterar o número de rounds ou a lógica do vencedor em apenas um dos arquivos (`sync` ou `async`) e esquecer do outro.
4.  **Timestamp Incorreto:** Chamar a função de timestamp dentro do `setTimeout`, em vez de no início do round.

## Feedback Modelo para Devolutiva

**Positivo:**
"Excelente trabalho! Você implementou corretamente as melhorias em ambos os scripts e sua reflexão final mostra que você compreendeu a diferença prática entre os modelos síncrono e assíncrono. A implementação do placar e do delay configurável ficou ótima."

**Construtivo:**
"Você está no caminho certo! A implementação da batalha funcionou, mas notei que a lógica do vencedor foi adicionada apenas na versão assíncrona. Lembre-se de aplicar as melhorias em ambos os cenários para comparar os resultados de forma justa. Revise também sua reflexão para conectar mais diretamente com o conceito de operações de I/O (entrada/saída), que é onde a assincronia realmente brilha."
