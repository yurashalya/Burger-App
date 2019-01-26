import React from 'react';
import './BuildControls.css';
import BuildControl from './BuildContlor/BuildControl';

const controls = [
    {label: 'Salat', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]


const buildControls = (props) => (
    <div className='BuildControls'>
           { controls.map(cntr => (
            <BuildControl 
                key= {cntr.label} 
                label= {cntr.label}
                added= {() => props.ingredientAdded(cntr.type)} 
                
                />
           ))}
    </div>
);



export default buildControls;