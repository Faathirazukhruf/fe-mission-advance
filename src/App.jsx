import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Login';
import Daftar from './pages/Daftar';
import Beranda from './pages/Beranda';
import Account from './pages/Account';

function App() {
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState('');

    useEffect(() => {
        if (token) {
            axios.get('http://localhost:3001/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then((res) => setUsers(res.data))
                .catch((err) => console.log(err));
        }
    }, [token]);

    const handleLogin = (token) => {
        setToken(token);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login onLogin={handleLogin} />} />
                <Route path="/daftar" element={<Daftar />} />
                <Route path="/beranda" element={<Beranda />} />
                <Route path="/account" element={<Account />} />
            </Routes>
        </Router>
    );
}

export default App;
