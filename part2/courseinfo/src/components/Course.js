import React from 'react';

const Header = ({ course }) => {
    return (
        <div>
            <h1>{course.name}</h1>
        </div>
    );
};
const Part = ({ part }) => {
    return (
        <div>
            <p>
                <i>{part.name} </i>
                {part.exercises}
            </p>
        </div>
    );
};
const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => <Part part={part} key={part.id} />)}
        </div>
    );
};

const Total = ({ parts }) => {
    let total = 0;
    parts.map(part => total += part.exercises)
    return (
        <div>
            <p> <b><i>Total number of exercises: </i></b>{total}</p>
        </div>
    );
};

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

export default Course;