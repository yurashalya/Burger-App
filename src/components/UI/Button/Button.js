import React from 'react';
import btns from './Button.module.css';

const button = (props) => (
    <button className={[btns.Button, btns[props.btnType]].join(' ')}  
    onClick={props.clicked}>{props.children}</button>
)


export default button;