import React from 'react';

const useFetch = (url) => {
    const [data, setData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        setLoading(true);

        fetch(url)
            .then((resp) => {
                if (resp.ok) return resp.json();
                return Promise.reject(resp);
            })
            .then((resp) => setData(resp))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    }, [url]);

    return [data, loading, error];
};

export default useFetch;
