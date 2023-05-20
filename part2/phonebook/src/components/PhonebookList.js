import React from 'react';

const PhonebookList = ({list, deleteFunc}) => {
    return (
        <div>
            {list.map(person => 
                <>
                <p key={person.id}> {person.name} {person.number}</p>
                <button onClick={deleteFunc(person.id)}>delete</button>
                {console.log(person.id)}
                </>
            )}
        </div>
    );
};

export default PhonebookList;