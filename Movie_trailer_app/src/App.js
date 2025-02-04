import './App.css';
import { useState } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';

function App() {
    const [video, setVideo] = useState(""); 
    const [videoURL, setVideoURL] = useState("");  
    const [error, setError] = useState(null);  

    const API_KEY = "AIzaSyDCRYJ5vADVXyRxvQEyXOtzeqPF9ZXhpuM";  

    async function handleSearch() {
        if (!video.trim()) {
            setError("Please enter a movie name."); 
            setVideoURL(null);  
            return;
        }

        try {
            const res = await axios.get("https://www.googleapis.com/youtube/v3/search", {
                params: {
                    part: "snippet",
                    q: `${video} trailer`,  
                    key: API_KEY,
                    maxResults: 1, 
                }
            });

            
            if (res.data.items.length > 0) {
                const videoId = res.data.items[0].id.videoId;
                const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
                setVideoURL(videoUrl); 
                setError(null);  
            } else {
                setError("Trailer not found. Try another movie."); 
                setVideoURL(null);
            }

        } catch (err) {
            setError("Error fetching trailer. Please try again.");  
            setVideoURL(null);
        }
    }

    return (
        <>
            <div className="App">
                <h2 className='header'>Movie Trailer App</h2>

                <div className="search-box">
                    <label>Search Any Movies & Shows:</label>
                    <input
                        type="text"
                        value={video}  
                        onChange={(e) => setVideo(e.target.value)}  
                    />
                    <button onClick={handleSearch}>
                        Search
                    </button>
                </div>

                {/* Display error message if there's an issue */}
                {error && <div style={{ color: 'red' }}>{error}</div>}

                {/* Display video if URL is available */}
                {videoURL && <ReactPlayer url={videoURL} controls={true} />}
            </div>
        </>
    );
}

export default App;
