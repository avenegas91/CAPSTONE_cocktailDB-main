import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import Navbar from './Layout/Navbar';
import Home from './Pages/Home';
import SearchCocktail from './Pages/SearchCocktail';
import RandomCocktail from './Pages/RandomCocktail';
import MyFavorites from './Pages/MyFavorites';
import AboutUs from './Pages/AboutUs';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/search-cocktail" element={<ProtectedRoute><SearchCocktail /></ProtectedRoute>} />
            <Route path="/random-cocktail" element={<ProtectedRoute><RandomCocktail /></ProtectedRoute>} />
            <Route path="/my-favorites" element={<ProtectedRoute><MyFavorites /></ProtectedRoute>} />
            <Route path="/about-us" element={<ProtectedRoute><AboutUs /></ProtectedRoute>} />
          </Routes>
          <AuthContext.Consumer>
            {({ isAuthenticated }) => isAuthenticated && <Navbar />}
          </AuthContext.Consumer>
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}

export default App;
