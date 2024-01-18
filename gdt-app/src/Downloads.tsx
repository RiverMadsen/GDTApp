import React, { useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import styles from './Downloads.module.css';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { updateKeyValueInStore } from './DBFunctions';


function Downloads() {
    const fileUrl = 'https://drive.google.com/uc?export=download&id=1PeI6fLrwVDQ25YTYOpEmoHpvStD9WdnR';
    const [imageSrc, setImageSrc] = useState('');
    const [jsonString, setJsonString] = useState('JSON string here');
    const [allSections, setAllSections] = useState(false);
    const [allOptions, setAllOptions] = useState(false);
    const secARef = useRef(null);
    const secBRef = useRef(null);
    const secCRef = useRef(null);
    const secDRef = useRef(null);
    const secERef = useRef(null);
    const secFRef = useRef(null);
    const secGRef = useRef(null);
    let downloads: string[] = []
    const optAlts = useRef(null);
    const optTopo = useRef(null);
    const optEarth = useRef(null);
    const optGuide = useRef(null);
    const optSat = useRef(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        JSZip.loadAsync(file).then((zip) => {
            zip.file('test.png')?.async('blob').then((content) => {
                const url = URL.createObjectURL(content);
                setImageSrc(url);
            });
        });
    };

    const handleJsonFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        JSZip.loadAsync(file).then((zip) => {
            zip.file('test.json')?.async('string').then((content) => {
                //console.log(content);
                if (typeof content === 'string') {
                    const jsonObject = JSON.parse(content); // parse the file content to a JavaScript object
                    const jsonString = JSON.stringify(jsonObject, null, 2); // stringify the JavaScript object to a JSON string
                    setJsonString(jsonString); // set the state variable to the JSON string (this will cause the component to re-render

                }
                else {
                    console.log('content is not a string');
                }
            });
        });
    };

    function handleAllSectionsChange(e: React.ChangeEvent<HTMLInputElement>) {
        const isChecked = e.target.checked;
        console.log(isChecked)
        setAllSections(isChecked);
        let sections = [secARef, secBRef, secCRef, secDRef, secERef, secFRef, secGRef];
        for (let section of sections) {
            if (section.current !== null) {
                (section.current as HTMLInputElement).checked = isChecked;
            }
        }
    }

    function handleSectionsChange(e: React.ChangeEvent<HTMLInputElement>) {
        let sections = [secARef, secBRef, secCRef, secDRef, secERef, secFRef, secGRef];
        for (let section of sections) {
            if (section.current !== null) {
                if ((section.current as HTMLInputElement).checked === false) {
                    setAllSections(false);
                    return;
                }
            }
        }
        setAllSections(true);
    }

    function handleAllOptionsChange(e: React.ChangeEvent<HTMLInputElement>) {
        const isChecked = e.target.checked;
        console.log(isChecked)
        setAllOptions(isChecked);
        let options = [optGuide, optSat, optTopo, optEarth, optAlts];
        for (let opt of options) {
            if (opt.current !== null) {
                (opt.current as HTMLInputElement).checked = isChecked;
            }
        }
    }

    function calculateDownloadFiles() {
        downloads = [];
        let downloadHRTopo = false;
        let downloadHRSat = false;
        console.log('calculateDownloadFiles called');
        let sections = [secARef, secBRef, secCRef, secDRef, secERef, secFRef, secGRef];
        let options = [optGuide, optSat, optTopo, optEarth, optAlts];
        for (let section of sections) {
            if (section.current !== null) {
                let sectionName = (section.current as HTMLInputElement).name;
                if ((section.current as HTMLInputElement).checked === true) {
                    // Non-zip files that are immediately stored and persisted in indexedDB once opened for the first time 
                    // so that user can always see high resolution trail and LR maps for the sections 
                    // they purchased.
                    downloads.push(sectionName + "_Text");
                    downloads.push(sectionName + "_Trail");
                    downloads.push(sectionName + "_LRMaps");
                    for (let option of options) {
                        if (option.current !== null) {
                            // These are the on-demand files that are downloaded when the user clicks the download button
                            if ((option.current as HTMLInputElement).checked === true) {
                                let optionName = (option.current as HTMLInputElement)?.name;
                                let file = sectionName + "_" + optionName;
                                if (optionName !== 'alts'){
                                    downloads.push(file);
                                }
                                if (optionName === 'HRTopo') {
                                    downloadHRTopo = true;
                                }
                                if (optionName === 'HRSat') {
                                    downloadHRSat = true;
                                }
                                if (optionName === 'alts' && downloadHRTopo) {
                                    downloads.push(file + "_HRTopo");
                                }
                                if (optionName === 'alts' && downloadHRSat) {
                                    downloads.push(file + "_HRSat");
                                }
                            }
                        }
                    }
                }

            }

        }
        console.log(downloads);
    }

    function handleOptionChange(e: React.ChangeEvent<HTMLInputElement>) {
        let options = [optGuide, optSat, optTopo, optEarth, optAlts];
        for (let opt of options) {
            if (opt.current !== null) {
                if ((opt.current as HTMLInputElement).checked === false) {
                    setAllOptions(false);
                    return;
                }
            }
        }
        setAllOptions(true);
    }


    function displayJson(arg0: string): React.MouseEventHandler<HTMLButtonElement> | undefined {
        console.log('displayJson called');
        return undefined;
    }

    function updateDatabase() {
        updateKeyValueInStore("GDTSettings", "zipLocation", "asdf");
    }

    return (
        <div>
            <h2>DOWNLOADS</h2>
            <div className={styles.downloadsForm}>
                <div className={styles.section}>
                    <h3 className='gdt-subheader'>Sections to Download</h3>
                    <div className="downloadOption gdt-attention"><label><input type="checkbox" checked={allSections} onChange={handleAllSectionsChange} name="allSections" /> ALL SECTIONS</label></div>
                    <div className="downloadOption"><label><input type="checkbox" ref={secARef} onChange={handleSectionsChange} name="sectionA" /> Section A - Waterton to Coleman</label></div>
                    <div className="downloadOption"><label><input type="checkbox" ref={secBRef} onChange={handleSectionsChange} name="sectionB" /> Section B - Coleman to Kanaaskis</label></div>
                    <div className="downloadOption"><label><input type="checkbox" ref={secCRef} onChange={handleSectionsChange} name="sectionC" /> Section C - Kanaaskis to Field</label></div>
                    <div className="downloadOption"><label><input type="checkbox" ref={secDRef} onChange={handleSectionsChange} name="sectionD" /> Section D - Field to N. Sask. Crossing</label></div>
                    <div className="downloadOption"><label><input type="checkbox" ref={secERef} onChange={handleSectionsChange} name="sectionE" /> Section E - N. Sask. Crossing to Jasper</label></div>
                    <div className="downloadOption"><label><input type="checkbox" ref={secFRef} onChange={handleSectionsChange} name="sectionF" /> Section F - Jasper to Blueberry Lake</label></div>
                    <div className="downloadOption"><label><input type="checkbox" ref={secGRef} onChange={handleSectionsChange} name="sectionG" /> Section G - Blueberry Lake LAKE to Kakwa Lake</label></div>
                </div>
                <div className={styles.section}>
                    <h3 className='gdt-subheader'>Options</h3>
                    <div className="downloadOption gdt-attention"><label><input type="checkbox" checked={allOptions} onChange={handleAllOptionsChange} name="allOptions" /> ALL OPTIONS</label></div>
                    <div className="downloadOption"><label><input type="checkbox" ref={optAlts} onChange={handleOptionChange} name="alts" /> Include Maps for Alternate Routes</label></div>
                    <div className="downloadOption"><label><input type="checkbox" ref={optTopo} onChange={handleOptionChange} name="HRTopo" /> Highest Resolution Topographic Maps</label></div>
                    <div className="downloadOption"><label><input type="checkbox" ref={optSat} onChange={handleOptionChange} name="HRSat" /> Highest Resolution Satellite Imagery</label></div>
                    <div className="downloadOption"><label><input type="checkbox" ref={optGuide} onChange={handleOptionChange} name="Guide" /> Guidebook Image</label></div>
                    <div className="downloadOption"><label><input type="checkbox" ref={optEarth} onChange={handleOptionChange} name="Earth" /> Google Earth Imagery</label></div>
                </div>
                <p className='gdt-v10'>
                    <span className='gdt-key'>Total Download Size: </span><span className='gdt-value'>0.0 GB</span>
                </p>
                <button className='btn btn-success' onClick={calculateDownloadFiles} >Download</button>
            </div>
            <hr></hr>
            <a href={fileUrl} download="test.zip">
                <button className='btn btn-primary' >Download Test File</button>
            </a>

            <div>
                <span>Open Image: </span><input type="file" onChange={handleFileChange} />
                <div id="imageContent">
                    <img src={imageSrc} alt="test" />
                </div>
            </div>

            <div>
                <span>Open JSON: </span><input type="file" onChange={handleJsonFileChange} />
                <div id="jsonOutput">{jsonString}</div>
            </div>
            <button className='btn btn-primary' onClick={updateDatabase}>Update Database</button>
            <button className='btn btn-primary' onClick={() => displayJson('test.json')}>Show JSON</button>

        </div>
    );
}
export default Downloads;