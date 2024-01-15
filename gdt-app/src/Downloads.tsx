import React from 'react';
import logo from './logo.svg';
import './App.css';
import styles from './Downloads.module.css';

function Downloads() {
    const fileUrl = 'https://drive.google.com/uc?export=download&id=1PeI6fLrwVDQ25YTYOpEmoHpvStD9WdnR';
    return (
        <div>
            <h1>Downloads Page</h1>
            <a href={fileUrl} download="file.zip">
                <button className='btn btn-primary'>Download File</button>
            </a>
        </div>
    );
}
export default Downloads;