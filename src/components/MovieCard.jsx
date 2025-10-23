import React from 'react';


export default function MovieCard({ movie }) {
  function onFavoriteClick() {
    alert('clicked');
  }
  return (
    <div> {/* movie-card */}
      <div> {/* // poster */}
        <img src={movie.img} alt={movie.title} />
        <div>
            <button onClick={onFavoriteClick}>❤️</button>
        </div>
      </div>
      {/* movie-info */}
      <div>
        <h3>{movie.title}</h3>
        <p>{movie.release_date}</p>
      </div>
    </div>
  );
}
