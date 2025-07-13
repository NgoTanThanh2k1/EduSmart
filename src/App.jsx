import "./App.css";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AIChatbot from "./components/AIChatbot";
import { CartProvider } from "./contexts/CartContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ViewHistoryProvider } from "./contexts/ViewHistoryContext";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Handle navigation
  useEffect(() => {
    const handleNavigation = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleNavigation);
    return () => window.removeEventListener("popstate", handleNavigation);
  }, []);

  // Expose navigation function globally
  useEffect(() => {
    window.navigateTo = (path) => {
      window.history.pushState({}, "", path);
      setCurrentPath(path);
    };
  }, []);

  const renderContent = () => {
    switch (currentPath) {
      case "/favorites":
        return <Favorites />;
      case "/search":
        return <Search />;
      default:
        return <Home />;
    }
  };

  return (
    <CartProvider>
      <FavoritesProvider>
        <ViewHistoryProvider>
          <Navbar />
          {renderContent()}
          <Footer />
          <AIChatbot />
        </ViewHistoryProvider>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;
