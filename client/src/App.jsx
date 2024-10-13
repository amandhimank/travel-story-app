import { useEffect } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./utils/AuthContext";

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if(!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  return children;
}

// Redirect authenticated user to home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }
  return children;
}


const App = () => {
  const { checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/login" element={
          <RedirectAuthenticatedUser>
            <Login />
          </RedirectAuthenticatedUser>
        } />
        <Route path="/signup" element={
          <RedirectAuthenticatedUser>
            <Signup />
          </RedirectAuthenticatedUser>
        } />
      </Routes>
    </>
  )
}

export default App;