import React, {useEffect, useState} from 'react';
import { useParams , Link} from 'react-router-dom';
import {useQuery} from '@apollo/client';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

function SongDetail() {
    const {id} = useParams();
    const {error, loading, data} = useQuery(fetchSong, {variables: {id: id}});
    const [song, setSong] = useState({});

    useEffect(() => {
        if (data) {
            setSong(data.song);
        } else {
            setSong({});
        }
    }, [data]);


    return <div>
        <Link to="/">Back</Link>
        <h3>{song.title ? song.title : ""}</h3>
        <LyricList lyrics={song.lyrics}/>
        <LyricCreate songId={id}/>
    </div>
}

export default SongDetail;
