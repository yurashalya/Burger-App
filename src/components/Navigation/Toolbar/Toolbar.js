import React from 'react';
import tools from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';


const toolbar = (props) => (
     <header className={tools.Toolbar}>
        <div>MENU</div>
        <div className={tools.Logo}>
             <Logo />
        </div>
        <nav className={tools.DesktopOnly}>
            <NavigationItems />
        </nav>
         
     </header>
);

export default toolbar;