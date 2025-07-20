import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpPage from './Pages/signUpPage';
import LoginPage from './Pages/loginPage';
import MainPage from './Pages/mainPage';
import ProtectedRoute from './Helper/ProtectedRoute';
import ChatPage from './Pages/chatPage';
function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/chatPage"
          element={
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;