import React from 'react'
import modules from './Modal.module.css'
import Aux from '../../../hoc/Auxs'
import Backdrop from '../Backdrop/Backdrop'
const modal = (props) => (
    <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed} />
        <div className={modules.Modal} 
        style={{ transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'}}>
            {props.children}
        </div>
    </Aux>
);


export default modal;