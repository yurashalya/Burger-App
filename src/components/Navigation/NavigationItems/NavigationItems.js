import React from 'react';
import navs from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = () => (
    <ul className={navs.NavigationItems}>
        <NavigationItem link="/" exact >Burger Builder</NavigationItem>
        <NavigationItem link="/orders" >Orders</NavigationItem>
    </ul>
);

export default navigationItems;