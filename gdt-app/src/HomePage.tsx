import React from 'react';
import logo from './logo.svg';
import './App.css';

function HomePage() {
    return (
        <div>
            
            <h2>HOME PAGE</h2>
            <div className="gdt-red">gdt-red <span className="gdt-text">Used for primary trail and errors</span></div>
            <div className="gdt-orange">gdt-orange <span className="gdt-text">Used as alternates and headers</span></div>
            <div className="gdt-yellow">gdt-yellow <span className="gdt-text">Used as warning text and values in key/value pairs</span></div>
            <div className="gdt-green">gdt-green <span className="gdt-text">Used for side route or to indicate success or an "on" state</span></div>
            <div className="gdt-blue">gdt-blue <span className="gdt-text">Used for sub-headers or for keys in a key/value pair</span></div>
            <div className="gdt-violet">gdt-violet <span className="gdt-text">Used for captions</span></div>
            <div className="gdt-text">gdt-text <span className="gdt-text">Used for text</span></div>
            <div className="gdt-info">gdt-info <span className="gdt-text">Used for informational text that is less important</span></div>
            <div className="gdt-dim">gdt-dim <span className="gdt-text">Used for diabled buttons or diminished text</span></div>
            <button type="button" className='btn btn-primary'>Primary</button>
            <button type="button" className='btn btn-success'>Success</button>
            <button type="button" className='btn btn-secondary'>Secondary</button>
            <button type="button" className='btn btn-danger'>Danger</button>
            <button type="button" className='btn btn-warning'>Warning</button>
            <button type="button" className='btn btn-info'>Info</button>
        </div>

    );
}

export default HomePage;
