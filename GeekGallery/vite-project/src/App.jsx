import { useReducer, useState } from 'react'
import { initialState,imageReducer } from "./reducers/imageReducer";
import Gallery from './components/Gallery';
import './App.css'

const accessKey = "CJFnFdF4tiklL4Ae5SxB8cNM4tdBLP9MZwN0K9jOUHE";
function App() {
  
  const [state,dispatch] = useReducer(imageReducer,initialState);
  const [query,setQuery] = useState("");
  const {images , page, loading, error} = state;

  const fetchImages = async () =>{
     dispatch({type:"FETCH_START"});
  }
  return (
    <>
     <div>
      <h1 style={{textAlign:'center'}}>GeekGallery 📸</h1>
      <form onSubmit={handleSearch} style={{textAlign:"center" ,marginBottom:'1rem'}}>
        <input type="text" placeholder='Search Unplash...' value={query} onChange={(e)=>setQuery(e.target.value)}/>
        <button type='submit'>Search</button>
      </form>
     </div>
    </>
  )
}

export default App
