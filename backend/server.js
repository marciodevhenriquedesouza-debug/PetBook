require('dotenv').config()
const express = require('express')
const pool = require('./db/index')  // importa a conexão com o banco
// importa o middleware no topo do server.js
const autenticar = require('./middleware/auth')

const app = express()
app.use(express.json())
const authRoutes = require('./routes/auth')
app.use('/auth', authRoutes)

// ─── /ping ────────────────────────────────────────────────────────────────────
app.get('/ping', (req, res) => {
  res.json({ message: 'pong', status: 'servidor rodando' })
})

// ─── BUSCA TODOS OS USUÁRIOS (dados reais do banco) ──────────────────────────
// GET /users
app.get('/usuario', async (req, res) => {
  try {
    // pool.query() executa SQL e retorna os resultados em rows
    const result = await pool.query(
      ' select id, nome, email FROM usuario ORDER BY datacadastro DESC'
    )
    res.json(result.rows)  // result.rows é o array de usuários
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao buscar usuários' })
  }
})

// ─── BUSCA UM USUÁRIO PELO ID ─────────────────────────────────────────────────
// GET /users/1
app.get('/usuario/:id', async (req, res) => {
  try {
    const { id } = req.params

    // $1 é um placeholder — NUNCA concatene variáveis direto no SQL
    // O pg substitui $1 pelo valor do array [id] com segurança
    const result = await pool.query(
      'SELECT id, nome, email, idade, bio, pets , datacadastro FROM usuario WHERE id = $1',
      [id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: 'Usuário não encontrado' })
    }

    res.json(result.rows[0])  // [0] pega o primeiro (e único) resultado
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao buscar usuário' })
  }
})

app.get('/usuario/:id/pets', async (req, res) => {
  try {
    const { id } = req.params

    const result = await pool.query(
      'SELECT id, tipopet, foto, idade FROM pets WHERE id_usuario = $1',
      [id]
    )

    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao buscar pets' })
  }
})

app.post('/pets', async (req, res) => {
  try {
    const { id_usuario, tipopet, foto, idade } = req.body

    if (!id_usuario || !tipopet) {
      return res.status(400).json({ erro: 'id_usuario e tipopet são obrigatórios' })
    }

    const result = await pool.query(
      'INSERT INTO pets (id_usuario, tipopet, foto, idade) VALUES ($1, $2, $3, $4) RETURNING *',
      [id_usuario, tipopet, foto, idade]
    )

    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao cadastrar pet' })
  }
})

// ─── BUSCA POSTS COM NOME DO AUTOR (JOIN) ─────────────────────────────────────
// GET /posts  ou  GET /posts?page=2&limit=5
app.get('/postagens', async (req, res) => {
  try {
    const page  = Number(req.query.page)  || 1
    const limit = Number(req.query.limit) || 10
    const offset = (page - 1) * limit

    // JOIN liga posts → users para trazer o username junto
    const result = await pool.query(
      `SELECT
         postagens.id,
         postagens.descricao,
         postagens.datacriado,
         usuario.nome,
         usuario.id as id_usuario
       FROM postagens
       JOIN usuario ON postagens.id_usuario = usuario.id
       ORDER BY postagens.datacriado DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    )

    res.json({
      page,
      limit,
      total_retornado: result.rows.length,
      postagens: result.rows
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao buscar posts' })
  }
})




// ─── CRIA UM USUÁRIO ──────────────────────────────────────────────────────────
// POST /users   body: { username, email, password }
app.post('/usuario', async (req, res) => {
  try {
    const { nome, email, password } = req.body

    // Validação básica — nas próximas fases isso vai pro bcrypt
    if (!nome || !email || !password) {
      return res.status(400).json({ erro: 'nome , email e password são obrigatórios' })
    }

    const result = await pool.query(
      'INSERT INTO usuario (nome, email, password) VALUES ($1, $2, $3) RETURNING id, nome, email',
      [nome, email, password]
    )

    // RETURNING faz o PostgreSQL devolver o registro inserido
    res.status(201).json(result.rows[0])
  } catch (err) {
    if (err.code === '23505') {  // código do postgres para unique violation
      return res.status(400).json({ erro: 'nome ou email já existe' })
    }
    console.error(err)
    res.status(500).json({ erro: 'Erro ao criar usuário' })
  }
})

// ─── CRIA UM POST ─────────────────────────────────────────────────────────────
// POST /posts   body: { user_id, content }
app.post('/postagens', autenticar, async (req, res) => {
  try {
    
    const id_usuario = req.usuario.id
    const { descricao } = req.body

    if (!id_usuario || !descricao) {
      return res.status(400).json({ erro: 'id_usuario e descrição são obrigatórios' })
    }

    const result = await pool.query(
      'INSERT INTO postagens (id_usuario, descricao) VALUES ($1, $2) RETURNING *',
      [id_usuario, descricao]
    )

    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao criar post' })
  }
})

// ─── PORTA ───────────────────────────────────────────────────────────────────
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})