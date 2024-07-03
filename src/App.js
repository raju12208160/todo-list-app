

import React, { useState } from 'react';
import './App.css';

function TodoList({ tasks, toggleTaskCompletion, deleteTask }) {
  return (
    <ul className="todo-list">
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

function TodoItem({ task, toggleTaskCompletion, deleteTask }) {
  return (
    <li className="todo-item">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleTaskCompletion(task.id)}
      />
      <span className={task.completed ? 'completed' : ''}>{task.task}</span>
      <button className="delete-btn" onClick={() => deleteTask(task.id)}>
        Delete
      </button>
    </li>
  );
}

function AddTodoForm({ addTask }) {
  const [newTask, setNewTask] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!newTask.trim()) return; // Prevents empty task submission
    addTask(newTask);
    setNewTask('');
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <input
        type="text"
        value={newTask}
        onChange={e => setNewTask(e.target.value)}
        placeholder="Add new task"
        className="task-input"
      />
      <button type="submit" className="add-btn">
        Add Task
      </button>
    </form>
  );
}

function TodoApp() {
  const [tasks, setTasks] = useState([]);

  const addTask = taskText => {
    const newTask = {
      id: tasks.length + 1,
      task: taskText,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompletion = taskId => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = taskId => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div className="todo-app">
      <h1 className="app-title">Todo List</h1>
      <AddTodoForm addTask={addTask} />
      <TodoList
        tasks={tasks}
        toggleTaskCompletion={toggleTaskCompletion}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default TodoApp;
