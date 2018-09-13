import React from 'react';
import './genreform.css';
import ServiceUtil from '../utils/ServiceUtil';
import { Object } from 'core-js';
import classnames from 'classnames';
import { PANEL_STATE } from '../../Constants';

class GenreForm extends React.Component {
    state = {
        genres: []
    }

    handleClick(id) {
        const genreId = this.state.genres.findIndex((genre)=>{
            return genre.id === id;
        });
        const oldGenre = this.state.genres[genreId];
        const genreToggled = Object.assign({}, oldGenre, {selected: !oldGenre.selected});
        const newGenres = [...this.state.genres.slice(0,genreId),
                           genreToggled,
                           ...this.state.genres.slice(genreId+1)
                          ]
        this.setState({genres:newGenres});
        this.handlePanelUpdate(newGenres);
    }

    handleSelectButtonClick(addAll) {
        const newGenres = this.state.genres.map((genre)=> {
            const newGenre = Object.assign({},genre,{selected: addAll});
            return newGenre;
        });
        this.setState({genres:newGenres});
        this.handlePanelUpdate(newGenres);
    }

    handlePanelUpdate(newGenres) {
        for(let genre of newGenres) {
            if(genre.selected) {
                console.log(PANEL_STATE);
                this.props.handlePanelStateChange(PANEL_STATE.VALID);
                return;
            }
        }
        this.props.handlePanelStateChange(PANEL_STATE.INVALID);
    }

    componentWillMount() {
        ServiceUtil.getGenres((genres)=>{
            this.setState({genres: genres.map((genre)=>{
                return Object.assign({}, genre, {selected: false});
            })});
        },(error)=>{
            console.log("Error! ",error);
        });
    }

    render() {

        const genres = this.state.genres.map((genre)=>{
            return <GenreCheckbox 
                        key={genre.id}
                        id={genre.id}
                        name={genre.name}
                        selected={genre.selected}
                        handleClick={() => this.handleClick(genre.id)}
                    />
        });

        return (
            <div className="genreform">
                <div className="genreform__buttons">
                    <button 
                        className="genreform__select genreform__select--all"
                        onClick={()=>{this.handleSelectButtonClick(true)}}
                    >Select All</button>
                    <button 
                        className="genreform__select genreform__select--none"
                        onClick={()=>{this.handleSelectButtonClick(false)}}
                    >Select None</button>
                </div>
                <form className="genreform__inputs">
                    {genres}
                </form>
            </div>
        )
    }
}

class GenreCheckbox extends React.Component {

    render() {
        
        const { name, selected} = this.props;

        const classes = classnames({
            'genreform__surroundbox': true,
            'genreform__surroundbox--selected': selected
        });

        return (
            <div onClick={this.props.handleClick} className="genreform__container" >
                <div className={classes}>
                    {name}
                </div>
            </div>
        );
    }
}

export default GenreForm;