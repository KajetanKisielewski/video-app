import React from 'react';
import useFetch from '../hooks/useFetch';

const SearchResult = ({ url }) => {
    const [data, loading, error] = useFetch(url);

    console.log('e', error);

    console.log(data);
    return (
        <>
            <h2>Videos List</h2>
            {loading && <h3>Loading...</h3>}
            {error && <h3>Error</h3>}
        </>
    );
};

export default SearchResult;
