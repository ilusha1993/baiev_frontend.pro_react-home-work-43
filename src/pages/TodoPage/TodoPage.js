import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo, toggleTodo } from '../../store/reducer';

import styles from './todoPage.modules.css';

function TodoPage({ todos, addTodo, toggleTodo}) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() !== '') {
            addTodo({ text: inputValue, completed: false });
            setInputValue('');
        }
    };

    return (
        <div>
            <div className="wrapper">
                <h1 className={"title"}>Мій Todo List</h1>
                <div>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Додати завдання"
                        className={"inputTodos"}
                    />
                    <button onClick={handleAddTodo} className={"buttonTodos"}>+</button>
                </div>
                <div className="container">
                    {todos.map((todo, index) => (
                        <div
                            key={index}
                            className={`todo-item ${todo.completed ? 'completed' : ''}`}
                            onClick={() => toggleTodo({ index })}
                        >
                            {todo.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    todos: state.todos.todos,
});

const mapDispatchToProps = {
    addTodo,
    toggleTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);