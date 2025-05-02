// Utility function to construct Unsplash API endpoint
// const accessKey = "CJFnFdF4tiklL4Ae5SxB8cNM4tdBLP9MZwN0K9jOUHE";

// export const fetchImagesFromAPI = async (query, page) => {
//   const endpoint = query
//     ? `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${accessKey}`
//     : `https://api.unsplash.com/photos?page=${page}&client_id=${accessKey}`;

//   const res = await fetch(endpoint);
//   const data = await res.json();
//   return query ? data.results : data;
 
// };


import axios from 'axios';

const accessKey = "CJFnFdF4tiklL4Ae5SxB8cNM4tdBLP9MZwN0K9jOUHE";

export const fetchImagesFromAPI = async (query, page) => {
  const endpoint = query
    ? `https://api.unsplash.com/search/photos`
    : `https://api.unsplash.com/photos`;

  const params = query
    ? { page, query, client_id: accessKey }
    : { page, client_id: accessKey };

  const res = await axios.get(endpoint, { params });

  // Axios automatically parses JSON → data is already an object
  return query ? res.data.results : res.data;
};
