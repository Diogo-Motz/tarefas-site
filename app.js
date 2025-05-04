const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Certifique-se de que esse arquivo esteja na raiz

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Banco de dados
require('./models/usuarioModel');
require('./models/tarefaModel');

// Rotas
const loginRoutes = require('./routes/login');
const tarefaRoutes = require('./routes/tarefas');

app.use('/login', loginRoutes);
app.use('/tarefas', tarefaRoutes);

// Rota de documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando: http://localhost:${PORT}`);
  console.log(`📚 Documentação Swagger: http://localhost:${PORT}/api-docs`);
});

