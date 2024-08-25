import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [user, setUser] = useState([]);
  const [songs, setSongs] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:3000/artist")
      .then((response) => setUser(response.data))
      .catch((error) => {
        console.error('Error al obtener los artistas:', error);
      });
  };

  const fetchSongs = () => {
    axios
      .get("http://localhost:3000/songs")
      .then((response) => setSongs(response.data))
      .catch((error) => {
        console.error('Error al obtener las canciones:', error);
      });
  };

  const getArtistName = (artistId) => {
    const artist = user.find((artist) => artist.id === artistId);
    return artist ? artist.name : "Artista desconocido";
  };

  useEffect(() => {
    fetchData();  // Obtener artistas
    fetchSongs(); // Obtener canciones
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <h1>Music App</h1>
      </header>

      <section className="artists-section">
        <h2>Artistas</h2>
        <div className="artists-container">
          {user && user.length > 0 && user.map((userObj) => (
            <div className="artist-card" key={userObj.id}>
              <img src={userObj.photoUrl} alt={userObj.name} />
              <h3>{userObj.name}</h3>
              <p>{userObj.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="songs-section">
        <h2>Canciones</h2>
        <div className="songs-container">
          {songs && songs.length > 0 && songs.map((song) => (
            <div className="song-card" key={song.id}>
              <img src={song.coverUrl} alt={song.title} />
              <h3>{song.title}</h3>
              <p>Artista: {getArtistName(song.artistId)}</p>
              <p>Lanzamiento: {song.releaseYear}</p>
              <p>Duración: {song.duration}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
