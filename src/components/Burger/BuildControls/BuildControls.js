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
            <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
           { controls.map(cntr => (
            <BuildControl 
                key= {cntr.label} 
                label= {cntr.label}
                added= {() => props.ingredientAdded(cntr.type)} 
                removed = {() => props.ingredientRemoved(cntr.type)}
                disabled = {props.disabled[cntr.type]}
                
                />
           ))}
            <button 
                className="OrderButton" 
                disabled = {!props.purchasable}
            >ORDER NOW</button>
    </div>
);



export default buildControls;