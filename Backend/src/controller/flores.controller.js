const connection = require('../data/connection');

exports.listar = (req, res) => {
  const sql = 'SELECT * FROM produtos';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro no servidor' });
    }
    res.json(results);
  });
};

exports.cadastrar = (req, res) => {
  const { nome, imagem, preco, categoria, marca } = req.body;
  const sql = 'INSERT INTO produtos (nome, imagem, preco, categoria, marca) VALUES (?, ?, ?, ?, ?)';
  connection.query(sql, [nome, imagem, preco, categoria, marca], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao cadastrar' });
    }
    res.status(201).json({ id: result.insertId, nome, imagem, preco, categoria, marca });
  });
};

exports.atualizar = (req, res) => {
  const { id } = req.params;
  const { nome, imagem, preco, categoria, marca } = req.body;
  const sql = 'UPDATE produtos SET nome = ?, imagem = ?, preco = ?, categoria = ?, marca = ? WHERE id = ?';
  connection.query(sql, [nome, imagem, preco, categoria, marca, id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao atualizar' });
    }
    res.json({ id, nome, imagem, preco, categoria, marca });
  });
};

exports.excluir = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM produtos WHERE id = ?';
  connection.query(sql, [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao excluir' });
    }
    res.json({ mensagem: `Produto ${id} excluído com sucesso` });
  });
};
