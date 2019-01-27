import React from 'react';
import backDrop from  './Backdrop.module.css';

const backdrop = (props) => (
    props.show ? <div className={backDrop.dropBack} onClick={props.clicked}></div> : null
);


export default backdrop;