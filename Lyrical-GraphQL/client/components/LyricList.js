import React from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/client';

const LIKE_LYRIC_MUTATION = gql `
mutation LikeLyric($id: ID) {
    likeLyric(id:$id){
      id
      likes
    }
  }
  `;


function LyricList({ lyrics }) {
    const [likeLyric, {error}] = useMutation(LIKE_LYRIC_MUTATION);


    //optimistic response: https://www.apollographql.com/docs/react/performance/optimistic-ui/
    const handleLikeLyric = (id, likes) => {
        likeLyric({variables: {id},
        optimisticResponse: {
            likeLyric: {
                id: id,
                __typename: 'LyricType',
                likes: likes + 1
            }
        }
        });
    }

    const renderLyrics = () => {
        return lyrics.map(({ id, content , likes}) => {
            return (
                <li key={id} className="collection-item">
                    {content}
                    <div className="vote-box">
                    <i className="material-icons"
                        onClick={() => handleLikeLyric(id, likes)}
                    >thumb_up</i>
                    {likes}
                    </div>
                </li>
            );
        })
    }

    return (
        <ul className="collection">
            {lyrics && renderLyrics()}
        </ul>
    )
}

export default LyricList;
