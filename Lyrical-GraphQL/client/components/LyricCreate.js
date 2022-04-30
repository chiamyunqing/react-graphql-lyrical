import React, {useState} from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client';

const CREATE_LYRIC_MUTATION = gql`
mutation AddLyricToSong($content: String, $songId: ID){
    addLyricToSong(content: $content, songId: $songId) {
      id,
      lyrics {
        content
      }
    }
  }
  `;

function LyricCreate({songId}) {
    const [lyrics, setLyrics] = useState("");
    const [createLyric, {error}] = useMutation(CREATE_LYRIC_MUTATION);

    const handleAddLyrics = (event) => {
        event.preventDefault();
        createLyric({variables: {content: lyrics, songId}});
        if (error) {
            console.log(error);
        } else {
            setLyrics("");
        }

    }

    return (
        <form onSubmit={handleAddLyrics}>
            <label>Add Lyrics</label>
            <input 
                value={lyrics}
                onChange={event => setLyrics(event.target.value)}
            />
        </form>
    )
}

export default LyricCreate;
