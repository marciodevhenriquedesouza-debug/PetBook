const BASE_URL = 'http://localhost:3000'

async function request(url, options = {}, redirecionarSe401 = true) {
  const token = localStorage.getItem('token')

  const res = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    }
  })

  if (res.status === 401 && redirecionarSe401) {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    window.location.href = '/'
    return
  }

  return res.json()
}
export async function login(email, password) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  }, false)
}

export async function register(nome, email, idade, password) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ nome, email, idade, password })
  }, false)
}

export async function getPostagens(page = 1) {
  return request(`/postagens?page=${page}`)
}