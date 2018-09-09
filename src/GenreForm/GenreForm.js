import React from 'react';
import './genreform.css';
import ServiceUtil from '../utils/ServiceUtil';

class GenreForm extends React.Component {
    state = {
        genres: []
    }

    componentWillMount() {
        ServiceUtil.getGenres((genres)=>{
            this.setState({genres: genres});
        },(error)=>{
            console.log("Error! ",error);
        });
    }

    render() {
        return (
            <div>
                {
                    this.state.genres.map((genre)=>{
                        return <p key={genre.id}>{genre.name}</p>;
                    })
                }
            </div>
        )
    }
}

export default GenreForm;