import React from 'react'
import axios from './services/axios';
import { useEffect, useState } from 'react';
import './Banner.css';

const Banner = ({ fetchUrl }) => {
    let [movies, setMovies] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);

            let ran = Math.floor(Math.random() * request.data.results.length - 1)

            setMovies(request.data.results[ran])
            return request
        }
        fetchData();
    }, [fetchUrl])

    return (
        <header className='banner' style={{
            backgroundSize: "cover", backgroundImage: `url(https://image.tmdb.org/t/p/original/${movies.backdrop_path})`, backgroundPosition: "center center"
        }}>
            <div className='bannerContant'>
                < h1 className='bannerTitle'> {movies.title || movies.name || movies.original_name}</h1>
                <div className="twoButton"><button className="buttonStyle">Play</button><button className="buttonStyle">More Info</button></div>
                <p className='bannerDisc'>{movies.overview}</p>
            </div>
            <div className='bannerImg' />
        </header >
    )
}

export default Banner