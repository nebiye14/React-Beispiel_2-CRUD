import React from 'react';
import {Link} from 'react-router-dom';
const MovieList = (props) =>{

    /*function handleClick() {
        console.log(" Button aktiv");
    }*/

    const truncateOverview = (string, maxLength) => {
        if (!string) return null;
        if (string.length <= maxLength) return string;
        return `${string.substring(0, maxLength)} ...`;
    }
    

        return(
        <div className="row">
            {props.movies.map((movie, i) => (

                <div className="col-lg-4" key={i}>
                    <div className="card mb-4 shadow-sm" key={movie.id}>
                        <img src={movie.imageURL} className="card-img-top" alt="Sample Movie" />
                        <div className="card-body">
                            <h5 className="card-title">{movie.name}</h5>
                            <p className="card-text">{truncateOverview(movie.overview,100)}</p>
                            <div className="d-flex justify-content-between align-items-center">
                                <button type="button" onClick={(event) => props.deleteMovieProp(movie)} className="btn btn-md btn-outline-danger">Delete</button>

                                <Link 
                                type="button" 
                                className="btn btn-md btn-outline-primary"
                                to={`edit/${movie.id}`}>
                                Edit
                                </Link>
                            
                                <button 
                                type="button" 
                                className="btn btn-primary">{movie.rating}<span className="badge badge-light"></span>
                                </button>

                                
                            </div>
                        </div>
                    </div>
                </div>

            ))}

        </div>
        );
    
}
export default MovieList;


