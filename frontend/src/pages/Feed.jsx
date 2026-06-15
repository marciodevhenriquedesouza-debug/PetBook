export default function Feed() {
  const usuario = JSON.parse(localStorage.getItem('usuario'))

  return (
    <div style={{ color: '#fff', padding: '2rem' }}>
      <h1>Bem-vindo, {usuario?.nome}</h1>
    </div>
  )
}