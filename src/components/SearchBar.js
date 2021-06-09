import React from 'react';
import {Link} from 'react-router-dom';


class SearchBar extends React.Component {

   


    /* Wir haben handleFormSubmit als Eventhandler selbst geschrieben, um zu verhindern, 
    dass die ganze Seite aktualisiert wird.*/
    handleFormSubmit = (event) => {

        event.preventDefault();
    }


    render(){
        return(
            <form onSubmit={this.handleFormSubmit}>
                <div className="form mb-5">
                    <div className="col-12">
                        <input type="text" 
                        onChange={this.props.searchMovieProp} 
                        className="form-control" 
                        placeholder="Search a movie"
                         
                        />  
                        
                    </div>
                    <div className="col-12 py-3">
                        <Link 
                            to="/add"
                            type="button" 
                            className="btn btn-md btn-danger" 
                            style={{float:'right'}}> Add Movie
                        </Link>
                    </div>
                </div>
            </form>

        );
    }
}
export default SearchBar;