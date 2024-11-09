import React, { useState, useEffect } from 'react';
import axios from "../../utils/axios";
import requests from '../../utils/requests';
import './Banner.css'
function Banner() {
    const [movie, setMovie] = useState({});
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const request = await axios.get(requests.fetchNetflixOriginals);
                console.log(request);
                setMovie(
                    request.data.results[
                        Math.floor(Math.random() * request.data.results.length)
                    ]
                );
            } catch (error) {
                console.error("Failed to fetch movie data:", error);
            }
        };
        fetchData();
    }, []);

    const truncate = (str, n) => {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    };

    return (
        <div className='banner' style={{
            backgroundSize: "cover",
            backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path || '/default-image.jpg'}')`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
        }}>
        
            <div className='banner_contents'>
                <h3 className='banner_title'>
                    {movie?.title || movie?.name || movie?.original_name}
                </h3>
                <div className='banner_bottom'>
                    <button className='banner_button play'>Play</button>
                    <button className='banner_button'>My List</button>
                </div>
                <h3 className='banner_description'>
                    {truncate(movie?.overview || "Description unavailable", 150)}
                </h3>
            </div>
            <div className='banner_fadeBottom'></div>
        </div>
    );
}

export default Banner;
