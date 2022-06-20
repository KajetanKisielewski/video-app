import React from 'react';

const useFetch = () => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const fetchData = (url) => {
        setLoading(true);

        fetch(url)
            .then((resp) => {
                if (resp.ok) return resp.json();
                return Promise.reject(resp);
            })
            .then((resp) => setData(resp))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    };

    return [data, loading, error, fetchData];
};

export default useFetch;
