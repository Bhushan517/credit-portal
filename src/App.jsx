import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import LoginPage from './components/LoginPage';
import Resume from './components/Resume';
import CreditScore from './components/CreditScore';
import Tests from './components/Tests';
import DashboardLayout from './components/DashboardLayout';
import CreateResume from './components/ResumeCreate';

function App() {
  const userId = "123"; // Replace with dynamic user ID later

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="resume" element={<Resume userId={userId} />} />
          <Route path="create-resume" element={<CreateResume userId={userId} />} />
          <Route path="creditscore" element={<CreditScore />} />
          <Route path="tests" element={<Tests />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
