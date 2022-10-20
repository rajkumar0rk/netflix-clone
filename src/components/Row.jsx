import React from 'react'
import axios from './services/axios';
import { useEffect, useState } from 'react';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const baseUrl = "https://image.tmdb.org/t/p/original/"
const Row = ({ title, fetchUrl, size }) => {
    let [movies, setMovies] = useState([]);
    let [video, setVideo] = useState({
        status: false,
        item: ''
    })
    let [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);

            setMovies(request.data.results)
            return request
        }
        fetchData();
    }, [fetchUrl])
    const inVideo = (movie) => {
        setVideo(() => ({
            status: true,
            item: movie.id
        }))

        movieTrailer(movie.title || movie.name || movie.original_name)
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
            })
            .catch((error) => console.log(error))


    }
    const outVideo = (movie) => {
        setVideo(() => ({
            status: false,
            item: movie.id
        }))
        setTrailerUrl("")
    }
    const opts = {
        height: "auto",
        width: "auto",
        playerVars: {
            autoplay: 1,
        }
    }
    return (
        <div className='row'>
            <h1>
                {title}

            </h1>
            <div className='imgContainer'  >
                {movies.map((movie) => {
                    return (
                        (video.status && video.item === movie.id) ? (<div key={movie.id} onMouseOut={() => outVideo(movie)}>
                            {trailerUrl ? (<YouTube videoId={trailerUrl} opts={opts} className={` extImg ${size ? "post extImgPost" : "back extImgback"}`} />) : <div className={` no  ${size ? "post extImgPost" : "back extImgback"}`}> </div>}
                        </div>) : (movie.backdrop_path ?
                            (<img key={movie.id} src={`${baseUrl}${size ? movie.poster_path : movie.backdrop_path}`} alt={movie?.title} className={`image ${size ? "post" : "back"} `} onMouseOver={() => inVideo(movie)} />) : (""))

                    )
                })}
            </div>
        </div >
    )
}

export default Row

