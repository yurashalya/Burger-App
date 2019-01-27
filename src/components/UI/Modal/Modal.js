import React from 'react'
import modules from './Modal.module.css'

const modal = (props) => (
    <div className={modules.Modal}>
        {props.children}
    </div>
);


export default modal;