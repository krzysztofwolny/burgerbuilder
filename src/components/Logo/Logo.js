import React from 'react';
//import {Img} from 'react-image';

import classes from './Logo.module.css';
import burgerLogo from '../../assets/images/burgerlogo.png';

const logo = (props) => {
    
    console.log(burgerLogo)
    
    return (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger" />
    </div>
)};

export default logo;