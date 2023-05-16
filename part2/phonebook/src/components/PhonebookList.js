import React from 'react';

const PhonebookList = ({list}) => {
    return (
        <div>
            {list.map(person => <p key={person.id}> {person.name} {person.number}</p>)}
        </div>
    );
};

export default PhonebookList;