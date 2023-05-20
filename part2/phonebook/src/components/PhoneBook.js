import React from 'react';

const PhoneBook = ({person, deleteFunc}) => {
    return (
        <div>
            <>
                <p> {person.name} {person.number} <button onClick={deleteFunc}>delete</button></p>
                
                </>
        </div>
    );
};

export default PhoneBook;