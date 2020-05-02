import React from 'react';
import classes from './Loader.module.css';

const Loader = props => (
  <div className={classes.Wrapper}>
    <div className={classes.Loader}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
  </div>
)

export default Loader;