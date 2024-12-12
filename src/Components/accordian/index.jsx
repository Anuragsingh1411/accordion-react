import { useState } from "react";
import data from "./data";
import './styles.css';

export default function Accordion() {
    const [selected, setSelected] = useState(null);
    const [enableMulti, setEnableMulti] = useState(false);
    const [multiple, setMultiple] = useState([]);

    function handleSingleSelection(getCurrentId) {
        setSelected(selected === getCurrentId ? null : getCurrentId);
    }

    function handleMultiSelection(getCurrentId) {
        let cpyMultiple = [...multiple];
        const findIndexOf = cpyMultiple.indexOf(getCurrentId);
        
        if(findIndexOf === -1) {
            cpyMultiple.push(getCurrentId);
        } else {
            cpyMultiple.splice(findIndexOf, 1);
        }
        setMultiple(cpyMultiple);
    }

    return (
        <div className="wrapper">
            <button onClick={() => setEnableMulti(!enableMulti)}>
                {enableMulti ? "Disable" : "Enable"} Multi Selection
            </button>
            
            <div className="accordion">
                {data && data.length > 0 ? (
                    data.map((dataItem, index) => (
                        <div className="item" key={index}>
                            <div 
                                className="title"
                                onClick={() => 
                                    enableMulti 
                                        ? handleMultiSelection(index)
                                        : handleSingleSelection(index)
                                }
                            >
                                <h3>{dataItem.question}</h3>
                                <span>
                                    {enableMulti 
                                        ? multiple.indexOf(index) !== -1 ? '-' : '+'
                                        : selected === index ? '-' : '+'
                                    }
                                </span>
                            </div>
                            {enableMulti 
                                ? multiple.indexOf(index) !== -1 && (
                                    <div className="content">{dataItem.answer}</div>
                                )
                                : selected === index && (
                                    <div className="content">{dataItem.answer}</div>
                                )
                            }
                        </div>
                    ))
                ) : (
                    <div>No data</div>
                )}
            </div>
        </div>
    );
}