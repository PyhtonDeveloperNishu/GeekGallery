import { useEffect, useReducer, useState } from 'react';
import { initialState, imageReducer } from './reducers/imageReducer';
import Gallery from './components/Gallery';
import { fetchImagesFromAPI } from './utils/api';
import './App.css';

// App component
function App() {
  const [state, dispatch] = useReducer(imageReducer, initialState);
  const [query, setQuery] = useState("");

  const { images, page, loading, error } = state;

  useEffect(()=>{
    fetchImages();
  },[]);

  


  // Function to fetch images
  const fetchImages = async () => {
    dispatch({ type: "FETCH_START" });

    try {
      const results = await fetchImagesFromAPI(query, page);
      dispatch({ type: "FETCH_SUCCESS", payload: results });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  };

  // Handles form submission
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({ type: "RESET" }); // clear existing images
    fetchImages();
  };

  // Load more images (pagination)
  const loadMore = () => {
    dispatch({ type: "INCREMENT_PAGE" });
    fetchImages();
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>GeekGallery 📸</h1>

      {/* Search form */}
      <form onSubmit={handleSearch} style={{ textAlign: "center", marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder='Search Unsplash...'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type='submit'>Search</button>
      </form>

      {/* Gallery display */}
      <Gallery images={images} />

      {/* Loading and error states */}
      {loading && <h2 style={{ textAlign: "center" }}>Loading...</h2>}
      {error && <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>}

      {/* Load more button */}
      {images.length > 0 && !loading && (
        <div style={{ textAlign: 'center', margin: '1rem' }}>
          <button onClick={loadMore}>Load More</button>
        </div>
      )}
    </div>
  );
}

export default App;
