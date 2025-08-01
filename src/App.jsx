import Footer from "./components/Footer";
import Nav from "./components/Nav";
import CollectionPage from "./pages/CollectionPage";
import CollectionsPage from "./pages/CollectionsPage";
import HomePage from "./pages/HomePage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import ItemPage from "./pages/ItemPage";
import UserPage from "./pages/UserPage";
import { AppContext } from "./context/AppContext";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [trendingNFTs, setTrendingNFTs] = useState([]);
  const [newCollections, setNewCollections] = useState([]);
  const [popularCollections, setPopularCollection] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchTrendingNFT() {
    setLoading(true);
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/trendingNFTs"
    );

    const NFT = data.data;

    setTrendingNFTs(NFT);
    setLoading(false);
  }

  async function fetchNewCollections() {
    setLoading(true);
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/newCollections"
    );

    const newCollectionsData = data.data;

    setNewCollections(newCollectionsData);
    setLoading(false);
  }

  async function fetchPopularCollections() {
    setLoading(true);
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/popularCollections"
    );
    const popularCollectionsData = data.data;

    setPopularCollection(popularCollectionsData);
    setLoading(false);
  }

  async function fetchCollections() {
    setLoading(true);
    const { data } = await axios.get(
      "https://remote-internship-api-production.up.railway.app/collections"
    );

    const collectionsData = data.data;

    setCollections(collectionsData);
    setLoading(false);
  }

  useEffect(() => {
    fetchTrendingNFT();
    fetchNewCollections();
    fetchPopularCollections();
    fetchCollections();
  }, []);

  return (
    <AppContext.Provider
      value={{ loading, trendingNFTs, newCollections, popularCollections, collections }}
    >
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collection" element={<CollectionPage />} />
          <Route path="/item" element={<ItemPage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
        <Footer />
      </Router>
    </AppContext.Provider>
  );
}

export default App;
