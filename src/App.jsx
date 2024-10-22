import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Daftar from './pages/Daftar';
import Beranda from './pages/Beranda';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/daftar" element={<Daftar />} />
        <Route path="/beranda" element={<Beranda />} />
      </Routes>
    </Router>
  );
}

export default App;
