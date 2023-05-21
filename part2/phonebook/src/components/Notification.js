import React from 'react';

const Notification = ({message, status}) => {
    let className = ''
    if(status === true){
        className = "success"
    }else if( status === null){
        className = "hidden"
    }else className = "error"
    return (
        <div className={className}>
            {message}
        </div>
    );
};

export default Notification;