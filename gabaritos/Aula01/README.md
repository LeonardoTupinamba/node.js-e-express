# Gabarito - Aula 01

## Objetivo

O objetivo desta aula era garantir que todos os alunos tivessem o ambiente de desenvolvimento Node.js configurado e fossem capazes de executar um script simples.

## Checklist de Verificação

Use esta lista para confirmar se o aluno completou a atividade com sucesso:

- [ ] O aluno conseguiu instalar o Node.js (versão LTS)?
- [ ] O comando `node -v` retorna uma versão válida no terminal do aluno?
- [ ] O comando `npm -v` retorna uma versão válida?
- [ ] O aluno conseguiu navegar até a pasta `Aula01` pelo terminal?
- [ ] O aluno executou o comando `node src/primeiro-script.js` com sucesso?
- [ ] A mensagem "Olá, ITEAM!..." foi exibida no console?

## Solução do Laboratório

O código a ser executado é o que está em `Aula01/src/primeiro-script.js`.

```javascript
// Aula01/src/primeiro-script.js

const message = "Olá, ITEAM! Este é meu primeiro script rodando no Node.js!";

console.log(message);
```

## Pontos Comuns de Dificuldade

- **Erro `command not found`**: Geralmente acontece se a instalação do Node.js não adicionou o `node` ao PATH do sistema. Reiniciar o terminal ou o computador costuma resolver.
- **Caminho do arquivo errado**: O aluno pode tentar executar `node primeiro-script.js` de fora da pasta `Aula01`, resultando em um erro de "arquivo não encontrado". Reforce a necessidade de usar o caminho correto (`src/primeiro-script.js`).
