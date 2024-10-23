import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Daftar from './pages/Daftar';
import Beranda from './pages/Beranda';
import Account from './pages/Account'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/daftar" element={<Daftar />} />
        <Route path="/beranda" element={<Beranda />} />
        <Route path="/account" element={<Account />} /> 
      </Routes>
    </Router>
  );
}

export default App;