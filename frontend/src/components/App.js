import React, { useContext } from 'react'; // Import useContext
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchCocktail from './Pages/SearchCocktail';
import RandomCocktail from './Pages/RandomCocktail';
import MyFavorites from './Pages/MyFavorites';
import Home from './Pages/Home';
import WelcomePage from './Pages/WelcomePage';
import Navbar from './Layout/Navbar';
import { AuthProvider, AuthContext } from '../context/AuthContext'; // Import AuthContext

function App() {
  return (
    <Router>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </Router>
  );
}

function MainApp() {
  const { isAuthenticated } = useContext(AuthContext); // Use useContext and AuthContext

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search-cocktail" element={<SearchCocktail />} />
        <Route path="/random-cocktail" element={<RandomCocktail />} />
        <Route path="/my-favorites" element={<MyFavorites />} />
      </Routes>
    </>
  );
}

export default App;
