import React from 'react'
import { useParams } from 'react-router-dom';
// useParams
const ViewHousePage = () => {
    const { id } = useParams();
    return (
        <div>ViewHousePage {id}</div>
    )
}

export default ViewHousePage