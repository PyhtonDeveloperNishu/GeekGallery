import { useEffect, useReducer, useState } from 'react';
import { initialState, imageReducer } from './reducers/imageReducer';
import Gallery from './components/Gallery';
import { fetchImagesFromAPI } from './utils/api';
import './App.css';

function App() {
  const [state, dispatch] = useReducer(imageReducer, initialState);
  const [query, setQuery] = useState("");

  const { images, page, loading, error } = state;

  const fetchImages = async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const results = await fetchImagesFromAPI(query, page);
      dispatch({ type: "FETCH_SUCCESS", payload: results });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({ type: "RESET" }); 
    fetchImages();
  };

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // When scrolled within 100px of bottom AND not loading
      if (scrollTop + windowHeight >= documentHeight - 100 && !loading) {
        dispatch({ type: "INCREMENT_PAGE" });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);  // re-attach when loading changes

  // Fetch images when page changes
  useEffect(() => {
    fetchImages();
  }, [page]);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>GeekGallery 📸</h1>

      <form onSubmit={handleSearch} style={{ textAlign: "center", marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder='Search Unsplash...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type='submit'>Search</button>
      </form>

      <Gallery images={images} />

      {loading && <h2 style={{ textAlign: "center" }}>Loading...</h2>}
      {error && <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>}
    </div>
  );
}

export default App;
