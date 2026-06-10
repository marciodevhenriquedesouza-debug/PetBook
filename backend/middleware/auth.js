const jwt = require('jsonwebtoken')

function autenticar(req, res, next) {
  // 1. Pega o header Authorization da requisição
  const authHeader = req.headers['authorization']

  // 2. Se não veio nenhum header, bloqueia
  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido' })
  }

  // 3. O header vem assim: "Bearer eyJhbGci..."
  // O split(' ') divide em ['Bearer', 'eyJhbGci...']
  // O [1] pega só o token
  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ erro: 'Token malformado' })
  }

  // 4. Verifica se o token é válido e não expirou
  // jwt.verify() lança um erro se for inválido — por isso está no try/catch
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // 5. Coloca os dados do usuário dentro do req
    // Assim qualquer rota protegida sabe quem está fazendo a requisição
    // sem precisar consultar o banco de novo
    req.usuario = decoded  // { id: 1, nome: 'joao' }

    next() // token válido — pode continuar para a rota
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido ou expirado' })
  }
}

module.exports = autenticar