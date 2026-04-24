const express = require('express');
const app = express();

app.use(express.json());

const rotasBiblioteca =  require('./src/routes/biblioteca');
const rotaJogos = require('./src/routes/jogos');
const rotaProdutoras = require('./src/routes/produtoras');
const rotaUsuarios = require('./src/routes/usuarios');

app.use('/biblioteca', rotasBiblioteca);
app.use('/jogos', rotaJogos);
app.use('/produtoras', rotaProdutoras);
app.use('/usuarios', rotaUsuarios);

const PORT = 3000;
app.listen(PORT, () => {
    console.log('Servidor rodando em http://localhost:${PORT}');
    console.log("BAnco de dados SQLite Pronto");
});