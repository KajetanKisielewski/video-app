import React from 'react';
import SearchBar from './SearchBar';
import '../styles/videoApp.css';

const VideoApp = () => {
    console.log('videoApp component');

    return (
        <div className="wrap">
            <header className="header">
                <h1 className="header__heading">VideoApp</h1>
            </header>
            <main className="main">
                <SearchBar />
            </main>
        </div>
    );
};

export default VideoApp;
