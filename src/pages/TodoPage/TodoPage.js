import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, toggleTodo, fetchTodos } from '../../store/reducer';
import styles from './todoPage.modules.css';

function TodoPage() {
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const { todos, status, error } = useSelector(state => state.todos);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() !== '') {
            dispatch(addTodo({ title: inputValue, completed: false }));
            setInputValue('');
        }
    };

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

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
                    {status === 'loading' && <h2>Loading...</h2>}
                    {error && <h2>An error occurred: {error}</h2>}
                    {todos.map((todo, index) => (
                        <div
                            key={index}
                            className={`todo-item ${todo.completed ? 'completed' : ''}`}
                            onClick={() => dispatch(toggleTodo({ index }))}
                        >
                            {todo.title}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TodoPage;
