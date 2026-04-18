## 🔑 GABARITO PROFESSOR (só você vê)

### **server-restful.js** (solução comentada):

```javascript
// GABARITO - API RESTful CORRETA
const express = express();
app.use(express.json());

// Middleware logging (bonus)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

let produtos = [ /* mesmos dados */ ];

// ✅ RESTful: plural, recurso, sem verbos
app.get('/produtos', (req, res) => {
  res.status(200).json(produtos);
});

// ✅ ID no final da URI
app.get('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === id);
  if (!produto) return res.status(404).json({erro: 'Produto não encontrado'});
  res.status(200).json(produto);
});

// ✅ POST plural + 201 created
app.post('/produtos', (req, res) => {
  const { nome, preco, estoque, categoria } = req.body;
  
  // ✅ Validação obrigatória
  if (!nome || preco <= 0 || estoque < 0) {
    return res.status(400).json({ 
      erro: 'Nome obrigatório, preço e estoque > 0' 
    });
  }
  
  const novo = {
    id: produtos.length + 1,
    nome, preco, estoque, categoria
  };
  produtos.push(novo);
  res.status(201).json(novo);  // ✅ 201 para criação!
});

// ✅ PUT para update completo
app.put('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({erro: 'Produto não existe'});
  
  produtos[index] = { ...produtos[index], ...req.body };
  res.status(200).json(produtos[index]);
});

// ✅ DELETE retorna 204 (sem corpo)
app.delete('/produtos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = produtos.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({erro: 'Produto não existe'});
  
  produtos.splice(index, 1);
  res.status(204).send();  // ✅ 204 No Content!
});

app.listen(3000);
```

**a atividade tem desafio de verdade!** Eles precisam **diagnosticar 10 erros**, **refatorar com cuidado** e **testar tudo**. Perfeito! 🚀