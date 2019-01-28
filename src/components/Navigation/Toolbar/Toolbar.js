import React from 'react';
import tools from './Toolbar.module.css';
import Logo from '../../Logo/Logo';


const toolbar = (props) => (
     <header className={tools.Toolbar}>
         <div>MENU</div>
         <Logo />
         <nav>
             <ul>
                ...
             </ul>
         </nav>
     </header>
);

export default toolbar;