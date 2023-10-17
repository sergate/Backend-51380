import './App.css';
import Login from './assets/components/loginview/login';
import Navbars from './assets/components/navbar/navbar';
import Home from './assets/components/home/homebody';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbars />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
