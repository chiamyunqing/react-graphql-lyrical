import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client';
import { Link , useNavigate } from 'react-router-dom';
import query from '../queries/fetchSongs';

const CREATE_SONG_MUTATION = gql`
    mutation AddSong($title: String) {
        addSong(title: $title) {
            title
        }
    }
`;

function SongCreate() {
    const [title, setTitle] = useState('');
    const [createSong, {error}] = useMutation(CREATE_SONG_MUTATION);
    let navigate = useNavigate();

    const handleAddSong = (event) => {
        event.preventDefault();
       createSong({variables: {title: title},
           refetchQueries: [{query: query}]}); //force reload in songlist
        if (error) {
            console.log(error);
        }
        navigate('/');
    }

    return (
        <div>
            <Link to="/">Back</Link>
            <h3>Create a New Song</h3>
            <form onSubmit={handleAddSong}>
                <label>Song Title:</label>
                <input onChange={event => setTitle(event.target.value)} value={title} />
            </form>
        </div>
    );
}

export default SongCreate;
