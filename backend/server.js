const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = "./db.json";

// Função auxiliar para carregar e salvar
function loadDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}
function saveDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Rota para listar produtos
app.get("/products", (req, res) => {
  const db = loadDB();
  res.json(db.products);
});

// Adicionar produto
app.post("/products", (req, res) => {
  const db = loadDB();
  const newProduct = { id: Date.now(), ...req.body, comments: [] };
  db.products.push(newProduct);
  saveDB(db);
  res.json(newProduct);
});

// Adicionar comentário
app.post("/products/:id/comments", (req, res) => {
  const db = loadDB();
  const product = db.products.find(p => p.id == req.params.id);
  if (!product) return res.status(404).json({ error: "Produto não encontrado" });

  const newComment = { user: req.body.user, text: req.body.text };
  product.comments.push(newComment);
  saveDB(db);
  res.json(newComment);
});

// Inicia servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
