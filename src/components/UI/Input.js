import React from 'react';
import classes from './Input.module.css';

function Input({userClasses, label, userInput, input, id }, ref) {
 

  return (
    <div id={id} className={ `${classes.input} ${userClasses}`}>
      <label htmlFor={input.id}>{label}</label>
      <input {...input} ref={ref}/>
    </div>
  );
}

export default React.forwardRef(Input);