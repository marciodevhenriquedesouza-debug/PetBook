import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Feed from './pages/Feed'
import RotaProtegida from './components/RotaProtegida'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/feed" element={
        <RotaProtegida>
          <Feed />
        </RotaProtegida>
      } />
    </Routes>
  )
}

export default App;
