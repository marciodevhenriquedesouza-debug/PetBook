const { Pool } = require('pg')
require('dotenv').config()

// Pool = conjunto de conexões reutilizáveis com o banco
// É mais eficiente que abrir e fechar uma conexão a cada requisição
const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
})

// Testa se a conexão funcionou ao iniciar o servidor
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Erro ao conectar no banco:', err.message)
  } else {
    console.log('✅ Conectado ao PostgreSQL!')
    release() // devolve a conexão pro pool
  }
})

// Exporta o pool para usar em qualquer rota
module.exports = pool