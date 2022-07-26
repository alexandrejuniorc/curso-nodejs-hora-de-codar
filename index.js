// config inicial
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// models
const Person = require('./models/Person');

// forma de ler JSON / middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rotas da API
const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes); // tudo que vier de /routes irá ser redirecionado para personRoutes

// rota inicial / endpoint
app.get('/', (req, res) => {
  // mostrar requisição
  res.json({ message: 'OI Express!' });
});

// entregar uma porta
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.kw6uz.mongodb.net/bancodaapi?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log('Conectamos ao MongoDB!');
    app.listen(3000);
  })
  .catch((error) => console.log(error));
