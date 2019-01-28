import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import logos from './Logo.module.css'

const logo = (props) => (
    <div className={logos.Logo}>
        <img src={burgerLogo} alt="MyBurger" />
    </div>
);


export default logo;