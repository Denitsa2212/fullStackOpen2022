import React from 'react';

const PersonsForm = ({submitHandler, children}) => {
    return (
        <form onSubmit={submitHandler}>
            <div>
                {children}
            </div>
            <div>
                <button type="submit">Add</button>
            </div>
        </form>
    );
};

export default PersonsForm;