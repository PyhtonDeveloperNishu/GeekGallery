import React from 'react';

const Gallery = ({ images }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      padding: '1rem'
    }}>
      {images.map((img) => {
        if (!img || !img.urls) return null; // Skip bad objects
        return (
          <img
            key={img.id}
            src={img.urls.small}
            alt={img.alt_description || 'Image'} // fallback alt
            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
          />
        );
      })}
    </div>
  );
};

export default Gallery;
