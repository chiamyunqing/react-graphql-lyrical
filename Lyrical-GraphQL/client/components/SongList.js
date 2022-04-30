import React, {useEffect, useState} from 'react';
import gql from 'graphql-tag';
import {useQuery, useMutation} from '@apollo/client';
import { Link } from 'react-router-dom';
import query from '../queries/fetchSongs';

const DELETE_SONG_MUTATION = gql`
mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
  `;

function SongList() {
    const {error, loading, data} = useQuery(query);
    const [songs, setSongs] = useState([]);
    const [deleteSong, {err}] = useMutation(DELETE_SONG_MUTATION);

    useEffect(() => {
        if (data) {
            setSongs(data.songs)
        }
    }, [data]);


    const handleDeleteSong = (id) => {
      deleteSong({variables: {id}, refetchQueries: [{query: query}]});
    }


    return (
        <div>
              <ul className="collection">
            {
                songs.map(({id, title}) => {
                    return (
                        <li key={id} className="collection-item">
                            <Link to={`/song/${id}`}>
                            {title}
                            </Link>
                            <i className="material-icons"
                            onClick={() => handleDeleteSong(id)}
                            >delete</i>
                        </li>
                    );
                })
            }
        </ul>
        <Link to="/song/new" className="btn-floating btn-large red right">
            <i className="material-icons">add</i>
        </Link>
        </div>
      
    );
}

export default SongList;
