// Simulação do banco de dados
let usuarios = [
    { id: 1, nombre: "ana" },
    { id: 2, nombre: "Juan" },
];

export const listarUsuarios = (req, res) => {
    res.json(usuarios);
};

export const buscarUsuarioPorId = (req, res) => {
    const usuarioId = parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === usuarioId);

    if (!usuario) {
        // Atendendo ao requisito de tratamento de erro e filtro por ID
        return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json(usuario);
};

export const criarUsuario = (req, res) => {
    const { nombre } = req.body;
    // Se usuario não coloca nome, retorna erro
    if (!nombre) {
        return res.status(400).json({ message: "O campo nombre é obrigatório" });
    }

    const novousuario = {
        id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
        nombre
    };

    usuarios.push(novousuario);
    res.status(201).json(novousuario);
};

export const atualizarUsuario = (req, res) => {
    const usuarioId = parseInt(req.params.id);
    const usuarioIndex = usuarios.findIndex(u => u.id === usuarioId);

    if (usuarioIndex === -1) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    usuarios[usuarioIndex] = {
        ...usuarios[usuarioIndex],
        ...req.body
    };

    res.json(usuarios[usuarioIndex]);
};

export const deletarUsuario = (req, res) => {
    const usuarioId = parseInt(req.params.id);
    const usuarioIndex = usuarios.findIndex(u => u.id === usuarioId);

    if (usuarioIndex === -1) {
        return res.status(404).json({ message: "Usuário não encontrado" });
    }

    usuarios.splice(usuarioIndex, 1);
    // 204 No Content exige que não envie corpo, por isso usamos .send()
    res.status(204).send();
};