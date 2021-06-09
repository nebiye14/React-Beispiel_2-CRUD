/* eslint-disable no-template-curly-in-string */
import React from 'react';

import MovieList from './MovieList';
import SearchBar from './SearchBar';
import AddMovie from './AddMovie';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditMovie from './EditMovie';

class App extends React.Component {

    state = {
        movies : [],  
        searchQuery:"" 
    }

   /* async componentDidMount() {
        const baseURL ="http://localhost:3002/movies";
        const response = await fetch(baseURL);
        console.log(response);
        const data = await response.json();
        console.log(data);
        this.setState({movies:data})
    }*/

    componentDidMount() {
        this.getMovies();
    }

    async getMovies() {
        const response= await axios.get("http://localhost:3002/movies");
       // console.log(response);
        this.setState({movies:response.data})
    }

    /* this.setState({
            movies: newMovieList
        })
        wenn state am Anfang null ist, dann ist der obiger Weg logisch, 
        hier möchten wir als standart movies array nutzen, deswegen ist der Weg unten  logisch.*/

   /* deleteMovie = (movie) => {
        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id );
        
        this.setState( state => ({
            movies:newMovieList
        }))
    }*/

    //DELETE MIT FETCH
       /*  deleteMovie = async (movie) => {
        const baseURL='http://localhost:3002/movies/${movie.id}'
        await fetch(baseURL, {method:"DELETE"})

        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id 
        );

      
        this.setState( state => ({
            movies:newMovieList
        }))

    }*/

    // DELETE MIT AXIOS 

        deleteMovie = async (movie) => {

        axios.delete('http://localhost:3002/movies/${movie.id}')
        

        const newMovieList = this.state.movies.filter(
            m => m.id !== movie.id 
        );

      
        this.setState( state => ({
            movies:newMovieList
        }))

    }


    searchMovie = (event) => {
        /*console.log(event.target.value)*/
        this.setState({searchQuery: event.target.value})
    }
    

    addMovie = async (movie) => {
        await axios.post('http://localhost:3002/movies/', movie)
        this.setState( state => ({
                movies:state.movies.concat([movie])
            }))
            this.getMovies();
    }

    editMovie = async (id,updatedMovie) => {
        
        await axios.put(`http://localhost:3002/movies/${id}`, updatedMovie)  
        this.getMovies();

    }

    render (){

    let filteredMovies = this.state.movies.filter(

        (movie) => {
            return movie.name.toLowerCase().indexOf(this.state.searchQuery.toLowerCase()) !== -1
        }

    ).sort((a,b) => {
        return a.id < b.id ? 1 : a.id > b.id ? -1 : 0;  
    });

    return (
        <Router>

            <div className="container">
                <Switch>
                
                    <Route path="/" exact render={()=>(

                        <React.Fragment>

                            <div className="row">

                                <div className="col-lg-12">

                                    <SearchBar searchMovieProp={this.searchMovie}/>
                                
                                </div>
                            </div>

                            <MovieList movies={filteredMovies} deleteMovieProp={this.deleteMovie} 
                            
                            />
                    
                        </React.Fragment>

                    )}>

                    </Route>
                
                    <Route path="/add" render={({history})=>(

                        <AddMovie 
                        
                            onAddMovie = {(movie)=> {this.addMovie(movie)
                                    history.push("/")
                            }
                        }
                        />
                    
                    )}>

                    </Route>

                    <Route path="/edit/:id"  render={(props)=>(

                        <EditMovie 
                            {...props}
                            onEditMovie = {(id,movie)=> {this.editMovie(id,movie)
                                    
                            }
                        }
                        />

                    )}>

                    </Route>
                    
                    

                </Switch>
            </div>
        </Router>
    );

}}
export default App; 