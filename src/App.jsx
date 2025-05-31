import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import Resume from './components/Resume';
import CreditScore from './components/CreditScore';
import Tests from './components/Tests';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path='/resume' element={<Resume/>} />
        <Route path='/creditscore' element={<CreditScore/>} />
        <Route path='/tests' element={<Tests/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
