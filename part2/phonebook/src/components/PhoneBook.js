import React from 'react';

const PhoneBook = ({person, deleteFunc}) => {
    return (
        <div>
            <>
                <li className="phoneBook"> {person.name} {person.number} <button onClick={deleteFunc}>delete</button></li>
                
                </>
        </div>
    );
};

export default PhoneBook;