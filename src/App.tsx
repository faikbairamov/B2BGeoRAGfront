import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUpPage from './Pages/signUpPage';
import LoginPage from './Pages/loginPage';
import MainPage from './Pages/MainPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* Redirect root to login */}
        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </Router>
  );
}

export default App;