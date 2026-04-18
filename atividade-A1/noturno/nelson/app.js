import express from "express";
import 'colors';
import usuarioRoutes from "./src/routes/usuarioRoutes.js";

const app = express();

// 1. Middleware para leitura de JSON
app.use(express.json());

// 2. Middleware de logging personalizado
app.use((req, res, next) => {
    // O evento 'finish' garante que pegamos o status code real após o processamento
    res.on('finish', () => {
        const hora = new Date().toLocaleTimeString();
        const { method, url } = req;
        const status = res.statusCode;

        let logMensagem = `[${hora}] ${method} ${url} - Status: ${status}`;

        // Lógica de cores conforme o status code
        if (status >= 200 && status < 300) {
            console.log(logMensagem.green); // Sucesso em verde
        } else if (status >= 400) {
            console.log(logMensagem.red);   // Erro em vermelho
        } else {
            console.log(logMensagem.yellow); // Outros (ex: 304) em amarelo
        }
    });
    next();
});

// 3. Rota de boas-vindas
app.get("/", (req, res) => {
    res.send("<h1>API de Usuários - Nível 3 Ativo</h1>");
});

// Todas as rotas de usuários agora são gerenciadas pelo arquivo de rotas
app.use(usuarioRoutes);

// 5. Exportação do app para ser usado no server.js (boa prática)
export default app;