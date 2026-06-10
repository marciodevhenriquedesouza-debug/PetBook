const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../db/index')

const router = express.Router()

// ─── REGISTER ────────────────────────────────────────────────────────────────
// POST /auth/register
// body: { username, email, password }
router.post('/register', async (req, res) => {
  try {
    const { nome, email, password } = req.body

    // 1. Valida se vieram todos os campos
    if (!nome || !email || !password) {
      return res.status(400).json({ erro: 'nome, email e password são obrigatórios' })
    }

    // 2. Gera o hash da senha
    // O número 10 é o "custo" — quanto maior, mais seguro e mais lento
    // 10 é o padrão recomendado para a maioria dos projetos
    const hash = await bcrypt.hash(password, 10)

    // 3. Salva no banco com o hash, nunca com a senha original
    const result = await pool.query(
      'INSERT INTO usuario (nome, email, password) VALUES ($1, $2, $3) RETURNING id, nome, email',
      [nome, email, hash]  // hash no lugar de password
    )

    res.status(201).json({
      mensagem: 'Usuário criado com sucesso',
      usuario: result.rows[0]
    })

  } catch (err) {
    // Código 23505 = unique violation (username ou email já existe)
    if (err.code === '23505') {
      return res.status(400).json({ erro: 'nome ou email já cadastrado' })
    }
    console.error(err)
    res.status(500).json({ erro: 'Erro ao criar usuário' })
  }
})

// ─── LOGIN ────────────────────────────────────────────────────────────────────
// POST /auth/login
// body: { email, password }
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // 1. Valida campos
    if (!email || !password) {
      return res.status(400).json({ erro: 'email e password são obrigatórios' })
    }

    // 2. Busca o usuário pelo email
    const result = await pool.query(
      'SELECT * FROM usuario WHERE email = $1',
      [email]
    )

    // 3. Se não achou o email, nega o acesso
    // Mensagem genérica de propósito — não revela se o email existe ou não
    if (result.rows.length === 0) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' })
    }

    const usuario = result.rows[0]

    // 4. Compara a senha digitada com o hash salvo no banco
    // bcrypt.compare() retorna true ou false
    const senhaCorreta = await bcrypt.compare(password, usuario.password)

    if (!senhaCorreta) {
      return res.status(401).json({ erro: 'Email ou senha inválidos' })
    }

    // 5. Gera o token JWT
    // jwt.sign(payload, segredo, opções)
    // payload = dados que ficam dentro do token (não coloque a senha aqui)
    // segredo = string secreta para assinar o token (fica no .env)
    // expiresIn = quanto tempo o token dura
    const token = jwt.sign(
      { id: usuario.id, nome: usuario.nome },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }  // token válido por 7 dias
    )

    res.json({
      mensagem: 'Login realizado com sucesso',
      token,  // o front vai guardar esse token
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      }
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ erro: 'Erro ao fazer login' })
  }
})

module.exports = router
