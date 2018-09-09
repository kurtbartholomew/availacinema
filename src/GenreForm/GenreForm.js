import React from 'react';
import './genreform.css';
import ServiceUtil from '../utils/ServiceUtil';

class GenreForm extends React.Component {
    state = {
        genres: []
    }

    componentWillMount() {
        ServiceUtil.getGenres((genres)=>{
            console.log(genres);
        },(error)=>{
            console.log("Error! ",error);
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.genres.map((genre)=>{
                        return <p>genre</p>;
                    })
                }
            </div>
        )
    }
}

export default GenreForm;