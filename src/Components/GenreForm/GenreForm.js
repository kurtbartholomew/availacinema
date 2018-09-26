import React from 'react';
import './genreform.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import classnames from 'classnames';
import { PANEL_STATE } from '../../Constants';

class GenreForm extends React.Component {

    componentWillMount() {
        this.props.loadGenres();
    }

    render() {

        const {
            isFetching,
            genreList,
            handleGenreToggle,
            handleAllGenresSelected,
            handleAllGenresDeselected,
            handlePanelStateChange
        } = this.props;

        const genres = genreList.map(( genre ) => {
            return <GenreCheckbox 
                        key={ genre.id }
                        id={ genre.id }
                        name={ genre.name }
                        selected={ genre.selected }
                        handleClick={ () => {
                            handleGenreToggle( genre.id );
                            let valid = false;
                            for(let genreChoice of genreList) {
                                let selected = genreChoice.selected;
                                if(genreChoice.id === genre.id) { selected = !selected; }
                                if( selected ) {
                                    valid = true;
                                    break;
                                }
                            }
                            handlePanelStateChange(valid ? PANEL_STATE.VALID : PANEL_STATE.INVALID);
                        }}
                    />
        });

        return (
            <div className="genreform">
                {isFetching ?
                    <div className="genreform__loading">
                        <FontAwesomeIcon 
                            className="genreform__loading-icon"
                            icon={ faSpinner }
                            spin={true}
                            size="6x"
                        />
                        <span>Loading Genres...</span>
                    </div>
                    :
                    <React.Fragment>
                        <div className="genreform__buttons">
                            <button 
                                className="genreform__select genreform__select--all"
                                onClick={ () => { handleAllGenresSelected() }}
                            >Select All</button>
                            <button 
                                className="genreform__select genreform__select--none"
                                onClick={ () => { handleAllGenresDeselected() }}
                            >Select None</button>
                        </div>
                        <form className="genreform__inputs">
                            {genres}
                        </form>
                    </React.Fragment>
                }
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