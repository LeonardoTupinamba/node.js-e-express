# Gabarito do Professor: Desafio Batalha Sync vs Async

## Objetivo deste gabarito

Este material traz:

1. Respostas esperadas das perguntas conceituais.
2. Rubrica de correcao rapida.
3. Exemplo de implementacao minima para cada tarefa.
4. Erros comuns para observar durante a avaliacao.

## Respostas esperadas (conceito)

### 1) O que e fluxo sincrono?

Resposta esperada:

- Executa passo a passo, em ordem.
- A proxima instrucao so roda depois da anterior terminar.
- No desafio, os rounds da versao sync aparecem praticamente de uma vez.

### 2) O que e fluxo assincrono?

Resposta esperada:

- Permite aguardar operacoes demoradas sem travar o modelo de programacao baseado em eventos do Node.
- Usa Promise/async/await para controlar quando continuar.
- No desafio, o await esperar(ms) cria pausas visiveis entre os rounds.

### 3) Onde o await pausa de verdade?

Resposta esperada:

- Somente quando await esta aguardando uma Promise que ainda nao resolveu.
- Exemplo valido no desafio: await esperar(1500).
- Exemplo que nao muda muito o comportamento: await em funcao async que retorna valor imediato.

## Rubrica de avaliacao (0 a 10)

1. Execucao dos scripts (2,0 pontos)

- 1,0: roda batalha_sync.js corretamente.
- 1,0: roda batalha_async.js corretamente.

2. Tarefa 1 - 5 rounds (2,0 pontos)

- 1,0: sync com 5 rounds.
- 1,0: async com 5 rounds.

3. Tarefa 2 - vencedor por soma (2,0 pontos)

- 1,0: acumula pontuacao total por personagem.
- 1,0: imprime vencedor ou empate corretamente.

4. Tarefa 3 - delay configuravel no async (2,0 pontos)

- 1,0: existe constante de configuracao (ex.: DELAY_MS).
- 1,0: testes com pelo menos 2 valores e analise coerente.

5. Tarefa 4 - log de tempo por rodada (1,0 ponto)

- 1,0: timestamp visivel por round e coerente com o delay.

6. Reflexao final (1,0 ponto)

- 1,0: resposta clara comparando sync x async com exemplo do proprio teste.

## Exemplo minimo de implementacao esperada

Observacao: este trecho serve como referencia. Nao e necessario ser identico.

```js
// Exemplo para o async
const DELAY_MS = 1000;
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function agora() {
  return new Date().toLocaleTimeString("pt-BR", { hour12: false });
}

async function iniciarBatalhaAsync(p1, p2) {
  let totalP1 = 0;
  let totalP2 = 0;

  for (let i = 1; i <= 5; i++) {
    console.log(`[${agora()}] Round ${i} iniciado`);
    await esperar(DELAY_MS);

    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;

    const ataque1 = d1 + p1.poder;
    const ataque2 = d2 + p2.poder;

    totalP1 += ataque1;
    totalP2 += ataque2;

    console.log(`${p1.nome} disparou: ${ataque1}`);
    console.log(`${p2.nome} disparou: ${ataque2}`);
  }

  if (totalP1 > totalP2) console.log(`${p1.nome} venceu`);
  else if (totalP2 > totalP1) console.log(`${p2.nome} venceu`);
  else console.log("Empate");
}
```

## Erros comuns dos alunos

1. Marcar funcao como async sem usar espera real.
2. Usar await em valor que nao e Promise sem perceber que nao ha pausa real.
3. Confundir "tempo de impressao no terminal" com assincronia real.
4. Esquecer de resetar/acumular corretamente a pontuacao.
5. Alterar apenas uma das versoes (sync ou async) e esquecer a outra.

## Checklist rapido de correcao

- [ ] Rodou os dois arquivos sem erro.
- [ ] Fez 5 rounds nas duas versoes.
- [ ] Implementou vencedor por soma.
- [ ] Tornou delay do async configuravel.
- [ ] Mostrou timestamp por round no async.
- [ ] Entregou comparacao final coerente.

## Feedback modelo para devolutiva

Exemplo curto:

"Voce implementou corretamente a diferenca pratica entre os modelos. A versao sync ficou instantanea e a async mostrou pausas controladas por await esperar(ms). Para evoluir, melhore a justificativa conceitual sobre quando o await realmente pausa e quando ele apenas aguarda uma Promise ja resolvida."
