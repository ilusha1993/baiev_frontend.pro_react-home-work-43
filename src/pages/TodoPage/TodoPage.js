import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addTodo, toggleTodo, fetchTodos } from '../../store/reducer';

import styles from './todoPage.modules.css';

function TodoPage({ todos, addTodo, toggleTodo, fetchTodos}) {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() !== '') {
            addTodo({ title: inputValue, completed: false });
            setInputValue('');
        }
    };

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

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
                            {todo.title}
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
    fetchTodos
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoPage);