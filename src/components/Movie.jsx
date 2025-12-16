import React from "react";
import heartIcon from "../assets/heart.svg";

const Movie = ({ movie : { title, poster_path, release_date, vote_average, original_language }, onClick }) => {
    return (
        <div className="movie-card" onClick={onClick}>
            <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt='poster missing' />
            <div>
                <div className="movie-title">{title}</div>
                <div className="movie-info">
                    <img src={heartIcon} />
                    <span className="rating">{vote_average ? vote_average.toFixed(1) : 'N/A'}</span>
                    <span>•</span>
                    <span>{original_language ? original_language : 'N/A'}</span>
                    <span>•</span>
                    <span>{release_date ? release_date.split('-')[0] : 'N/A'}</span>
                </div>

            </div>
            
        </div>
    )
}

export default Movie