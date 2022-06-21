import React from 'react';

const useURLGenerate = () => {
    const [url, setUrl] = React.useState(null);

    console.log('url', url);
    return [url, setUrl];
};

export default useURLGenerate;
