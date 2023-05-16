import React from 'react';

const Input = ({changeHandler, value, label}) => {
    return (
        <div>
            <p>{label}</p>
            <input 
            onChange={changeHandler}
            value={value}
          />
        </div>
    );
};

export default Input;