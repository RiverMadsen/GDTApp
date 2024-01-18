import React from 'react';
import logo from './logo.svg';
import './App.css';
import styles from  './HomePage.module.css';
import { useNavigate } from 'react-router-dom';
import { updateKeyValueInStore } from './DBFunctions';
import { getValueFromStore } from './DBFunctions';


function isPointInPolygon(point: {lng:number,lat:number} , polygon: {lng:number,lat:number} []) {
    let x = point.lng, y = point.lat;
    let inside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        let xi = polygon[i].lng, yi = polygon[i].lat;
        let xj = polygon[j].lng, yj = polygon[j].lat;
        
        let intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        
        if (intersect) inside = !inside;
    }
    return inside;
}

function Mapping() {
    const navigate = useNavigate();

    function updateSettings(event: React.ChangeEvent<HTMLInputElement>) {
        let testPoint = {lng: parseFloat(event.target.value.split(',')[0]), lat: parseFloat(event.target.value.split(',')[1])};
        // Read the extents property from IndexedDB's GDTSettings store
        getValueFromStore('GDTSettings', 'extents')
        .then(value => {
            let extentsObj = value[0];
            let sections = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
            for (let section of sections) {
                let googleEarthCoords = extentsObj[section];
                let points = [];
                for (let i = 0; i < googleEarthCoords.length; i = i + 2) {
                    let point = {lng: googleEarthCoords[i], lat: googleEarthCoords[i + 1]};
                    points.push(point);
                }
                if (isPointInPolygon(testPoint, points)) {
                    console.log('Point is in ' + section + ' section');
                }
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
    }
    return (
        <div className={styles.homePage}>
            
            <h2>MAPPING</h2>
            <button className='btn btn-primary' >Draw line</button>
            <div className="mapSetting"><label>XY: <input type="text" onChange={updateSettings} name="xy" /> </label></div>
            <div className="mapSetting"><label>Level: <input type="text" onChange={updateSettings} name="zoomLevel" /> </label></div>
            <p className='output'>OUTPUT</p>
        </div>

    );
}

export default Mapping;
