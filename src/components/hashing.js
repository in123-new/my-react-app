import React, { useState } from 'react';
import { sha1, sha256, sha384, sha512 } from 'crypto-hash';
import './hashing.css';

export default function HashingForm() {
    const algorithms = ['sha1', 'sha256', 'sha384', 'sha512']
    const [text_input, setTextInput] = useState('');
    const [file_input, setFileInput] = useState('');
    const [algorithm, setAlgorithm] = useState('sha1');
    const [output, setOutput] = useState('');
    
    const handleTextInput = async (e) => {
        
        const value = e.target.value;
        let result = '';
        
        // eslint-disable-next-line eqeqeq
        if (algorithm == 'sha1') {
            result = await sha1(value);
        // eslint-disable-next-line eqeqeq
        } else if (algorithm == 'sha256') {
            result = await sha256(value);
        // eslint-disable-next-line eqeqeq
        } else if (algorithm == 'sha384') {
            result = await sha384(value);
        // eslint-disable-next-line eqeqeq
        } else if (algorithm == 'sha512') {
            result = await sha512(value);
        }
        setOutput(result);
        setTextInput(value);
    }
    const handleFileInput = (e) => {
        const fr = new FileReader();
        fr.onload = async () => {
            let result = '';
               
            // eslint-disable-next-line eqeqeq
            if (algorithm == 'sha1') {
                result = await sha1(fr.result);
            // eslint-disable-next-line eqeqeq
            } else if (algorithm == 'sha256') {
                result = await sha256(fr.result);
            // eslint-disable-next-line eqeqeq
            } else if (algorithm == 'sha384') {
                result = await sha384(fr.result);
            // eslint-disable-next-line eqeqeq
            } else if (algorithm == 'sha512') {
                result = await sha512(fr.result);
            }
            setOutput(result);
            setFileInput(fr.result);
        }
        fr.readAsText(e.target.files[0]);
    }
    const handleAlgorithmChange = async (e) => {
        let value = e.target.value;
        let result = '';
        if (text_input) {
            // eslint-disable-next-line eqeqeq
            if (value == 'sha1') {
                result = await sha1(text_input);
            // eslint-disable-next-line eqeqeq
            } else if (value == 'sha256') {
                result = await sha256(text_input);
            }
            // eslint-disable-next-line eqeqeq
            else if (value == 'sha384') {
                result = await sha384(text_input);
            }
            // eslint-disable-next-line eqeqeq
            else if (value == 'sha512') {
                result = await sha512(text_input);
            }
        }
        
        if (file_input) {
            // eslint-disable-next-line eqeqeq
            if (value == 'sha1') {
                result = await sha1(file_input);
            // eslint-disable-next-line eqeqeq
            } else if (value == 'sha256') {
                result = await sha256(file_input);
            // eslint-disable-next-line eqeqeq
            } else if (value == 'sha384') {
                result = await sha384(file_input);
            // eslint-disable-next-line eqeqeq
            } else if (value == 'sha512') {
                result = await sha512(file_input);
            }
        }
        setAlgorithm(value);
        setOutput(result);
    }
    return (
        <div className='hashing-container'>
            <div className='hashing-content'>
                <div className="hashing-form">
                    <h4 className="hashing-form-heading">Input</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="text-input">Text</label>
                            <input type="text" className="form-control" id="text-input" placeholder='Write some text' value={text_input} onChange={handleTextInput} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="file-input">File Input</label>
                            <input type="file" className="form-control" id="file-input" onChange={handleFileInput} />
                        </div>
                    </form>
                </div>
                <div className="hashing-algorithms">
                    <h4 className="hashing-algorithms-heading">Algorithms</h4>
                    <div className="hashing-algorithms-list">
                        {
                            algorithms.map(algo => {
                                return (
                                    <div className="form-check" key={algo}>
                                        <input className="form-check-input" type="radio" name="algorithm" id={algo} value={algo} checked={algorithm === algo} onChange={handleAlgorithmChange} />
                                        <label className="form-check-label" htmlFor={algo}>
                                            {algo}
                                        </label>
                                    </div>
                                )
                            }
                            )}
                    </div>
                </div>
                <div className="hashed-output">
                    <h4 className="hashed-algorithm-heading">Output</h4>
                    <div className="hashed-algorithm-container">
                        <p className="hashed-algorithm-text">
                            {output}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
