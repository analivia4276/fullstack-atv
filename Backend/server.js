const express = require('express');
const cors = require('cors');
const floresRoutes = require('./src/routes/flores.routes');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(floresRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
